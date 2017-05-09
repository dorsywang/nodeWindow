//var Event = require('./event');
//var CanvasEl = require('./canvsel');

var HTMLElement = require('./htmlelement');
var Node = require('./node');
var Text = require('./text');

var ElementClassDeclaredMap = {
    canvas: 'HTMLCanvasElement'
};

class Document extends Node{
    constructor(defaultView){
        super();
        this.__defaultView = defaultView;
    }

    createElement(tagName){
        /*
        if(tagName === "canvas"){
            return new CanvasEl();
        }

        var node = new domEle.Element();
        node.tagName = tagName;
        */

        var node;

        tagName = tagName || '';
        if(ElementClassDeclaredMap[tagName]){
            var elementClass = require('./' + ElementClassDeclaredMap[tagName].toLowerCase());
            node = new elementClass(tagName);
        }else{
            node = new HTMLElement(tagName);
        }

        node.ownerDocument = this;
        

        return node;
    }

    createTextNode(text){
        return new Text(text);
    }

    get defaultView(){
        return this.__defaultView;
    }
}

module.exports = Document;
