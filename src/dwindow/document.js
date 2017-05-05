//var Event = require('./event');
//var CanvasEl = require('./canvsel');

var HTMLElement = require('./htmlelement');
var Node = require('./node');

var ElementClassDeclaredMap = {
    canvas: 'HTMLCanvasElement'
};

class Document extends Node{
    createElement(tagName){
        /*
        if(tagName === "canvas"){
            return new CanvasEl();
        }

        var node = new domEle.Element();
        node.tagName = tagName;
        */

        var node;
        if(ElementClassDeclaredMap[tagName]){
            var elementClass = require('./' + ElementClassDeclaredMap[tagName].toLowerCase());
            node = new elementClass(tagName);
        }else{
            node = new HTMLElement(tagName);
        }

        node.ownerDocument = this;
        

        return node;
    }

    createTextNode(){
    }
}

module.exports = Document;
