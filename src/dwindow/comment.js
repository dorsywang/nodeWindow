var Node = require('./node');
class Comment extends Node{
    constructor(text){
        super();

        this.nodeType = this.COMMENT_NODE;
        this.nodeValue = text || '';
        this.tagName = '#comment';
    }

    // non-standard method
    get outerHTML(){
        return "<!--" + (this.nodeValue || '') + "-->";
    }

    // non-standard method
    get innerHTML(){
        return this.nodeValue || '';
    }
}

module.exports = Comment;
