var EventEmitter = require('events');

class EventTarget{
    constructor(){
        this.listeners = {};

        this._emitter = new EventEmitter();
    }

    addEventListener(type, handler, isCapture){
        this._emitter.addListener(type, handler.handleEvent || handler, isCapture);
    }

    removeEventListener(type, callback) {
     
    }

    dispatchEvent(event){
        var e = {
            preventDefault: function(){
            },

            stopPropagation: function(){
            },

            target: this,

            srcElement: this
        };

        if(this._emitter){
            this._emitter.emit(event.type, e);
        }
    }
    
}

module.exports = EventTarget;
