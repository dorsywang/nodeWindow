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
}

module.exports = Text;
