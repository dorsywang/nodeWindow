var Node = require('./node');
class Text extends Node{
    constructor(text){
        super();

        this.nodeType = this.TEXT_NODE;
        this.nodeValue = text || '';
    }

    // non-standard method
    get outerHTML(){
        return this.nodeValue || '';
    }

    // non-standard method
    get innerHTML(){
        return this.nodeValue || '';
    }
}

module.exports = Text;
