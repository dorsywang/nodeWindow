//var Event = require('./event');
//var CanvasEl = require('./canvsel');

var HTMLElement = require('./htmlelement');
var Node = require('./node');
var Text = require('./text');
var Comment = require('./comment');

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

        tagName = (tagName || '').toUpperCase();
        if(ElementClassDeclaredMap[tagName]){
            var elementClass = require('./' + ElementClassDeclaredMap[tagName].toLowerCase());
            node = new elementClass(tagName);
        }else{
            node = new HTMLElement(tagName);
        }

        node.ownerDocument = this;
        

        return node;
    }

    createDocumentFragment(){
        var node = this.createElement('fragment');

        return node;
    }

    createTextNode(text){
        return new Text(text);
    }

    createComment(text){
        return new Comment(text);
    }

    get defaultView(){
        return this.__defaultView;
    }

    getElementById(id){
        var result;
        var findChild = function(node){
            if(result){
                return;
            }

            for(var i = 0;i < node.childNodes.length; i ++){
                var _node = node.childNodes[i];
                var _id = _node.id;

                if(_id == id){
                    result = node.childNodes[i];
                    break;
                }

                if(_node.childNodes && _node.childNodes.length){
                    findChild(_node);
                }
            }


        };

        findChild(this);

        return result;
    }


    getElementsByClassName(className){
        return this.documentElement.getElementsByClassName(className);
    }

    getElementsByTagName(tagName){
        return this.documentElement.getElementsByTagName(tagName);
    }
}

module.exports = Document;
