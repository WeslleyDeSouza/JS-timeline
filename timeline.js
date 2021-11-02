"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var TimeLineCollusionRanger = /** @class */ (function () {
    function TimeLineCollusionRanger(t) {
        this.collusionsMapper = {
            hasCollusion: false,
            current: null,
            prev: null
        };
        this.drawRanger();
    }
    TimeLineCollusionRanger.prototype.drawRanger = function () {
        if (document.querySelector('.timeline-ranger-helper'))
            return;
        var $div = document.createElement('div');
        var points = TimeLineCollusionRanger.triggerPoint;
        $div.innerHTML = "<div style=\"opacity: 0.1;position: fixed;top: " + points.top + "px;height: " + points.height + "px;width: 100%;background: #919191\" class=\"timeline-ranger-helper\"></div>";
        document.body.appendChild($div);
    };
    /**
     * Verify is item is inside range
     * @item <TimelineItem>
     * */
    TimeLineCollusionRanger.prototype.itemIsInsideRange = function (item) {
        var range = TimeLineCollusionRanger;
        var _a = item.getParentElement().getBoundingClientRect(), top = _a.top, height = _a.height;
        var isInsideTop = top > range.triggerPoint.top && top < range.triggerPoint.top + range.triggerPoint.height;
        var isInsideBottom = (top + height) > range.triggerPoint.top && top + height < range.triggerPoint.top + range.triggerPoint.height;
        if (isInsideTop || isInsideBottom) {
            return true;
        }
    };
    /**
     * Verify is item is inside browser viewport
     * @item <TimelineItem>
     * @setValue saves the value to the pased item
     * */
    TimeLineCollusionRanger.prototype.itemIsInView = function (item, setValue) {
        if (setValue === void 0) { setValue = true; }
        var _a = item.getParentElement().getBoundingClientRect(), top = _a.top, height = _a.height;
        if (setValue) {
            item.isInView = (top) < (window.innerHeight) && (top + height) >= 0;
            return item.isInView;
        }
        else {
            return top < (window.innerHeight) && (top + height) >= 0;
        }
    };
    TimeLineCollusionRanger.triggerPoint = {
        height: 90,
        top: 200
    };
    return TimeLineCollusionRanger;
}());
var TimelineItem = /** @class */ (function () {
    function TimelineItem($item) {
        var _a;
        this.$item = $item;
        /* Is the first child element from the container  */
        this.isFirst = false;
        /* Is betweeen window height and 0 */
        this.isInView = false;
        this.isActivated = true;
        this.state = false;
        this.initListeners();
        this.isFirst = !((_a = $item.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling);
    }
    Object.defineProperty(TimelineItem.prototype, "element", {
        get: function () {
            return this.$item;
        },
        enumerable: false,
        configurable: true
    });
    TimelineItem.prototype.initListeners = function () {
        var _this = this;
        this.$item.ontransitionend = function (ev) {
            _this.isActivated = _this.$item.classList.contains('active');
            if (!_this.state && _this.isActivated) {
                _this.$item.classList.remove('active');
            }
        };
    };
    TimelineItem.prototype.getParentElement = function () {
        return this.$item.parentElement;
    };
    TimelineItem.prototype.setState = function (state) {
        this.state = state;
        if (state) {
            if (!this.$item.classList.contains('active'))
                this.$item.classList.add('active');
        }
        else {
            if (this.isActivated) {
                this.$item.classList.remove('active');
            }
        }
    };
    return TimelineItem;
}());
var Timeline = /** @class */ (function () {
    function Timeline($containerElement /*HTMLElement*/) {
        this.$containerElement = $containerElement;
        this.lineRanger = new TimeLineCollusionRanger(this);
        this.inti();
    }
    Timeline.prototype.inti = function () {
        //Todo: wait till dom is ready
        this.initContainer();
        this.initItems();
        this.initListeners();
    };
    Timeline.prototype.initContainer = function () {
        if (typeof this.$containerElement === 'string') {
            this.$containerElement = document.querySelector(this.$containerElement);
        }
        if (!this.$containerElement)
            throw new Error('DomElementNotFound: Container not found');
    };
    /**
     * Initialise all Items with the class<TimelineItem>
     * */
    Timeline.prototype.initItems = function () {
        this.$containerElement.items = __spreadArray([], this.$containerElement.querySelectorAll(Timeline.itemSelector)).map(function (v) { return new TimelineItem(v); });
        this.setItemColor();
    };
    /**
     * Adding Dom Listeners
     * */
    Timeline.prototype.initListeners = function () {
        var _this = this;
        document.addEventListener('scroll', function (ev) { return _this.handleScroll(ev); });
    };
    /**
     * Handle Scroll event
     * */
    Timeline.prototype.handleScroll = function (ev) {
        var scrollPositionY = document.documentElement.scrollTop;
        this.lineRanger.collusionsMapper.hasCollusion = false;
        var found = null;
        for (var i = 0; i < this.$containerElement.items.length; i++) {
            var item = this.$containerElement.items[i];
            /*
            * canTriggerSlideContent
            * */
            if (this.canTriggerSlideContent(item))
                this.triggerSlideContent(item);
            if (found) {
                found--;
                if (found === 0)
                    break;
            }
            else if (this.lineRanger.itemIsInsideRange(item)) {
                this.lineRanger.collusionsMapper.hasCollusion = true;
                this.lineRanger.collusionsMapper.prev = this.lineRanger.collusionsMapper.current;
                this.lineRanger.collusionsMapper.current = item;
                found = 20;
            }
        }
        if (!this.lineRanger.collusionsMapper.hasCollusion) {
            this.lineRanger.collusionsMapper.prev = this.lineRanger.collusionsMapper.current;
            this.lineRanger.collusionsMapper.current = null;
        }
        this.setItemClasses();
    };
    Timeline.prototype.canTriggerSlideContent = function (item) {
        return (item.isFirst && !item.isInView && this.lineRanger.itemIsInView(item, true));
    };
    Timeline.prototype.triggerSlideContent = function (item) {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = item.getParentElement()) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('.contentContainer')) === null || _d === void 0 ? void 0 : _d.classList.add('visible');
    };
    Timeline.prototype.setItemClasses = function () {
        var _a = this.lineRanger.collusionsMapper, prev = _a.prev, current = _a.current;
        prev ? prev.setState(false) : null;
        current ? current.setState(true) : null;
    };
    Timeline.prototype.setItemColor = function () {
        var red = 1;
        var green = 107;
        var blue = 183;
        var circleCounter = 0;
        var rowCounter = 0;
        this.$containerElement.items.map(function (item) {
            if (circleCounter % 9 == 0)
                rowCounter++;
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
            var redRounded = parseInt(red);
            var greenRounded = parseInt(green);
            var blueRounded = parseInt(blue);
            item.element.style.backgroundColor = ("rgb(" + redRounded + "," + greenRounded + "," + blueRounded + ")");
        });
    };
    Timeline.itemSelector = '.bubble';
    return Timeline;
}());
function handleCircleColor() {
    if (window.matchMedia("(min-width: 768px)").matches) {
    }
}
