class Event{
    constructor(eventType) {
        this._eventType = eventType;
        this._type = null;
        this._bubbles = null;
        this._cancelable = null;
        this._target = null;
        this._currentTarget = null;
        this._eventPhase = 0;
        this._timeStamp = null;
        this._preventDefault = false;
        this._stopPropagation = false;



        this.NONE = 0;
        this.CAPTURING_PHASE = 1;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 3;
    }

    initEvent(type, bubbles, cancelable) {
        this._type = type;
        this._bubbles = bubbles;
        this._cancelable = cancelable;
    }

    preventDefault() {
        if (this._cancelable) {
            this._preventDefault = true;
        }
    }

    stopPropagation() {
         this._stopPropagation = true;
    }

    get eventType() { return this._eventType; }
    get type() { return this._type; }
    get bubbles() { return this._bubbles; }
    get cancelable() { return this._cancelable; }
    get target() { return this._target; }
    get currentTarget() { return this._currentTarget; }
    get eventPhase() { return this._eventPhase; }
    get timeStamp() { return this._timeStamp; }
}

module.exports = Event;
