
class TimeLineCollusionRanger{

    static triggerPoint = {
        height:90,
        top:200
    }

    collusionsMapper = {
        hasCollusion:false,
        current:<TimelineItem|null>null,
        prev:<TimelineItem|null>null
    }

    constructor(t:Timeline) {
        this.drawRanger()
    }

    protected drawRanger(){
        if(document.querySelector('.timeline-ranger-helper'))return;
        const $div = document.createElement('div');
        const points = TimeLineCollusionRanger.triggerPoint
        $div.innerHTML = `<div style="opacity: 0.1;position: fixed;top: ${points.top}px;height: ${points.height}px;width: 100%;background: #919191" class="timeline-ranger-helper"></div>`
        document.body.appendChild($div);
    }

    /**
     * Verify is item is inside range
     * @item <TimelineItem>
     * */
    itemIsInsideRange(item:TimelineItem){

        const range         = TimeLineCollusionRanger;

        const { top,height } = (<HTMLElement>item.getParentElement()).getBoundingClientRect();

        const isInsideTop    = top > range.triggerPoint.top  && top < range.triggerPoint.top +  range.triggerPoint.height;
        const isInsideBottom = (top +height ) > range.triggerPoint.top  && top +height < range.triggerPoint.top +  range.triggerPoint.height;

        if(isInsideTop || isInsideBottom){
          return true
        }

    }

    /**
     * Verify is item is inside browser viewport
     * @item <TimelineItem>
     * @setValue saves the value to the pased item
     * */
    itemIsInView(item:TimelineItem, setValue = true){
        const { top,height } = (<HTMLElement>item.getParentElement()).getBoundingClientRect();


        if ( setValue ){
            item.isInView =  ( top ) < (window.innerHeight ) &&  ( top +height ) >= 0;
            return item.isInView;
        }else {
            return top < ( window.innerHeight ) &&  ( top + height ) >= 0;
        }
    }
}

class TimelineItem{

    /* Is the first child element from the container  */
    isFirst = false;

    /* Is betweeen window height and 0 */
    isInView = false;

    isActivated = true

    state = false;

    constructor(private $item:HTMLElement) {
        this.initListeners();
        this.isFirst = !$item.parentElement?.previousElementSibling;
    }

    get element():HTMLElement{
        return this.$item
    }

    initListeners(){
        this.$item.ontransitionend = (ev) => {
            this.isActivated = this.$item.classList.contains('active');
            if(!this.state && this.isActivated){
                this.$item.classList.remove('active')
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
        this.initContainer();

        this.initItems();

        this.initListeners();
    }

    private initContainer(){
        if( typeof (<any>this.$containerElement )=== 'string'){
            this.$containerElement = document.querySelector(<any>this.$containerElement)
        }

        if(! this.$containerElement ) throw new Error('DomElementNotFound: Container not found');
    }

    /**
     * Initialise all Items with the class<TimelineItem>
     * */
    private initItems(){
        this.$containerElement.items = [...
            this.$containerElement.querySelectorAll(
                Timeline.itemSelector
            )
        ].map(v => new TimelineItem(v));

        this.setItemColor()
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

       this.lineRanger.collusionsMapper.hasCollusion = false;
        let found = null;
       for(let i = 0; i<this.$containerElement.items.length;i++){
           let item = this.$containerElement.items[i];

           /*
           * canTriggerSlideContent
           * */
           if( this.canTriggerSlideContent( item  ) ) this.triggerSlideContent(item)


           if( found ){
               found--;
               if(  found === 0)break;
           }
           else if( this.lineRanger.itemIsInsideRange( item )){
               this.lineRanger.collusionsMapper.hasCollusion = true
               this.lineRanger.collusionsMapper.prev    = this.lineRanger.collusionsMapper.current
               this.lineRanger.collusionsMapper.current = item
               found = 20;
           }

       }

       if(!this.lineRanger.collusionsMapper.hasCollusion){
           this.lineRanger.collusionsMapper.prev = this.lineRanger.collusionsMapper.current;
           this.lineRanger.collusionsMapper.current = null
       }

       this.setItemClasses()
    }

    protected canTriggerSlideContent(item:TimelineItem):boolean {
        return (item.isFirst && !item.isInView && this.lineRanger.itemIsInView(item,true));
    }

    protected triggerSlideContent(item:TimelineItem):any {
        return item.getParentElement()?.parentElement?.parentElement?.querySelector('.contentContainer')?.classList.add('visible')
    }


    setItemClasses(){
       const { prev , current } = this.lineRanger.collusionsMapper;
        prev    ? prev.setState(false)    : null;
        current ? current.setState(true)  : null;
    }

    setItemColor(){
        var red = 1;
        var green = 107;
        var blue = 183;
        var circleCounter = 0;
        var rowCounter = 0;

        this.$containerElement.items.map((item:TimelineItem) => {

            if (circleCounter % 9 == 0) rowCounter++;

            circleCounter++;

            switch (rowCounter) {
                case 9:
                    rowCounter = 1;
                    break;
                case 1:
                    red += 14.33;
                    green -= 7.55;
                    blue -= 11.44;
                    break;
                case 2:
                    red += 10.44;
                    green += 3.77;
                    blue -= 6.77;
                    break;
                case 3:
                    red += 2.88;
                    green += 13.11;
                    blue -= 2.11;
                    break;
                case 4:
                    red -= 10.11;
                    green += 0.33;
                    blue += 0.33;
                    break;
                case 5:
                    red -= 17.55;
                    green -= 7.22;
                    blue -= 0.33;
                    break;
                case 6:
                    red += 5.11;
                    green -= 3.77;
                    blue += 5.22;
                    break;
                case 7:
                    red += 4.77;
                    green += 13.55;
                    blue += 25.44;
                    break;
                case 8:
                    red -= 8.22;
                    green -= 13;
                    blue -= 9.33;
                    break;
                default:
            }

            let redRounded = parseInt(<any>red);
            let greenRounded = parseInt(<any>green);
            let blueRounded = parseInt(<any>blue);



            item.element.style.backgroundColor = ("rgb(" + redRounded + "," + greenRounded + "," + blueRounded + ")");

        })


    }
}

function handleCircleColor() {
    if (window.matchMedia("(min-width: 768px)").matches) {

    }
}