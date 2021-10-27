
class TimeLineCollusionRanger{

    static triggerPoint = {
        height:50,
        top:200
    }

    collusionsMapper = {
        hasCollusion:false,
        current:<TimelineItem|null>null,
        prev:<TimelineItem|null>null
    }

    protected drawRanger(){
        if(document.querySelector('.timeline-ranger-helper'))return;
        const $div = document.createElement('div');
        const points = TimeLineCollusionRanger.triggerPoint
        $div.innerHTML = `<div style="opacity: 0.8;position: fixed;top: ${points.top}px;height: ${points.height}px;width: 100%;background: #919191" class="timeline-ranger-helper"></div>`
        document.body.appendChild($div);
    }

    constructor(t:Timeline) {
        this.drawRanger();
    }

    itemIsInsideRange(item:TimelineItem,currentPostY:number){

        const range         = TimeLineCollusionRanger;

        const { top,height } = (<HTMLElement>item.getParentElement()).getBoundingClientRect();

        const isInsideTop    = top > range.triggerPoint.top  && top < range.triggerPoint.top +  range.triggerPoint.height;
        const isInsideBottom = (top +height ) > range.triggerPoint.top  && top +height < range.triggerPoint.top +  range.triggerPoint.height;

        if(isInsideTop || isInsideBottom){
          return true
        }

    }
}

class TimelineItem{

    isActivated = true

    state = false;

    constructor(private $item:HTMLElement) {
        this.$item.ontransitionend = (ev) => {
            this.isActivated = $item.classList.contains('active');
            if(!this.state && this.isActivated){
                $item.classList.remove('active')
            }
        }
    }

    getParentElement(){
        return this.$item.parentElement
    }

    setState(state:boolean){
        this.state = state
        if( state ){
            if(!this.$item.classList.contains('active'))
            this.$item.classList.add('active');
        }else {
           if(this.isActivated){
             this.$item.classList.remove('active');
           }
        }
    }

}

class Timeline {

    static itemSelector  = '.bubble';

    protected lineRanger = new TimeLineCollusionRanger(this)

    constructor(protected $containerElement: any /*HTMLElement*/) {
        this.inti()
    }

    protected inti(){

        //Todo: wait till dom is ready

        if( typeof (<any>this.$containerElement )=== 'string'){
            this.$containerElement = document.querySelector(<any>this.$containerElement)
        }

        if(! this.$containerElement ) throw new Error('DomElementNotFound: Container not found');


        this.$containerElement.items = [...
            this.$containerElement.querySelectorAll(
                Timeline.itemSelector
            )
        ].map(v => new TimelineItem(v))

        this.initListeners()

    }

    /**
     * Adding Dom Listeners
     * */
    protected initListeners(){
        document.addEventListener(
            'scroll',ev => this.handleScroll(ev)
        )
    }

    /**
     * Handle Scroll event
     * */
    protected handleScroll(ev:Event){
       const scrollPositionY = document.documentElement.scrollTop;

       this.lineRanger.collusionsMapper.hasCollusion = false
       for(let i = 0; i<this.$containerElement.items.length;i++){
           let item = this.$containerElement.items[i];
           if(this.lineRanger.itemIsInsideRange(item ,scrollPositionY)){
               this.lineRanger.collusionsMapper.hasCollusion = true
               this.lineRanger.collusionsMapper.prev    = this.lineRanger.collusionsMapper.current
               this.lineRanger.collusionsMapper.current = item
               break;
           }
       }

       if(!this.lineRanger.collusionsMapper.hasCollusion){
           this.lineRanger.collusionsMapper.prev = this.lineRanger.collusionsMapper.current;
           this.lineRanger.collusionsMapper.current = null
       }

       this.setItemClasses()
    }

    setItemClasses(){
       const { prev , current } = this.lineRanger.collusionsMapper;
        prev    ? prev.setState(false)      :null;
        current ? current.setState(true)    :null;
    }

}