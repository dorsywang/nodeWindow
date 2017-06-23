var Node = require('./node');
class Text extends Node{
    constructor(text){
        super();

        this.nodeType = this.TEXT_NODE;
        this.nodeValue = text || '';
    }

    _getEnscapeValue(value){
        return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // non-standard method
    get outerHTML(){
        return this._getEnscapeValue(this.nodeValue || '');
    }

    // non-standard method
    get innerHTML(){
        return this._getEnscapeValue(this.nodeValue || '');
    }
}

module.exports = Text;
