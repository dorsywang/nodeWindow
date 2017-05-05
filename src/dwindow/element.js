var Node = require('./node');

class Element extends Node{
    constructor(tagName){
        super();

        this.tagName = tagName;

        this.nodeType = this.ELEMENT_NODE;
    }
}

module.exports = Element;
