Simple timeLine in JS / HTML

demo:
https://onebyte.github.io/barbara-keller.ch-timeline/


HTML:
```
<div data-timeline="true" id="timeline-1" >
    <!-- left -->
    <div class="timeline-flex">
        <div class="timeline-sidebar">
            <div class="contentLeft">
                <div class="contentContainer">
                    <div class="timeline-item">
                        <div class="timeline-item-heading">
                            <h2>Demo</h2>
                            <svg version="1.1" class="svgArrowCont 1 timeline-item-heading--arrow-end" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 14 36" xml:space="preserve"><polygon class="svgArrow" points="0,36 14,18 0,0 " style="fill: rgb(15, 99, 171);"></polygon></svg>
                            <div class="arrow" style="background-color: rgb(15, 99, 171);"></div>
                        </div>
                        <div class="timeline-item-content">
                           <p></p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div  class="timeline-middle start-right">
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>

            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>

            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2021</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="timeline-sidebar"></div>
    </div>
    <!-- right -->
    <div class="timeline-flex">
        <div class="timeline-sidebar"></div>
        <div class="timeline-middle start-left" >
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>

            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>

            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <div class="bubble-inner">
                        <span>2018</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="timeline-sidebar">
            <div class="contentRight">
                <div class="contentContainer">
                    <div class="timeline-item">
                        <div class="timeline-item-heading">
                            <h2>Demo</h2>
                            <svg version="1.1" class="svgArrowCont 1 timeline-item-heading--arrow-end" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 14 36" xml:space="preserve"><polygon class="svgArrow" points="0,36 14,18 0,0 " style="fill: rgb(15, 99, 171);"></polygon></svg>
                            <div class="arrow" style="background-color: rgb(15, 99, 171);"></div>
                        </div>
                        <div class="timeline-item-content">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

JS Integration:
```
 new Timeline(
       '#timeline-1', options = {}
    )

```

HTML Integration:
```
data-timeline="true"
```

 

options:
