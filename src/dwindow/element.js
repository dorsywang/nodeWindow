var Node = require('./node');
var NamedNodeMap = require('./namednodemap');
var DOMTokenList = require('./domtokenlist');

var parseCssText = function(style, val){
     // 解析css
     if(val){
        val = val.split(";");

        val.map(function(item, index){
            if(item){
                var exp = item.split(":");
                var name = exp[0];
                var v = exp[1] || '';

                style[name] = v;
            }
        });
     }

};


var getEnscapeValue = function(value){
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var donotEnscapeTagReg = /script|pre|code/;

class Element extends Node{
    constructor(tagName){
        super();

        this.tagName = tagName;

        this.nodeType = this.ELEMENT_NODE;

        this.attributes = new NamedNodeMap(this);

        this.classList = new DOMTokenList(this);
    }


    get className(){
         return this.getAttribute('className');
    }

    set className(val){
         this.setAttribute('className', val);
    }

    // @ready only
    get clientWidth(){
    }

    get clientHeight(){
    }

    get clientLeft(){
    }

    get clientTop(){
    }

    get computedName(){

    }

    get computedRole(){
    }

    get id(){
        return this.getAttribute('id');
    }

    set id(val){
       this.setAttribute(id);
    }

    get innerHTML(){

        var tagName = (this.tagName || '').toLowerCase();
        var html = "";

        if(this.childNodes && this.childNodes.length){
            for(var i = 0; i < this.childNodes.length; i ++){
                var child = this.childNodes[i];

                if(child.nodeType === this.TEXT_NODE){
                    if(donotEnscapeTagReg.test(tagName)){
                        html += child.nodeValue;
                    }else{
                        html += getEnscapeValue(child.nodeValue);
                    }
                }else{
                    html += child.outerHTML;
                }
            }
        }else{
        }

        return html;
    }

    set innerHTML(val){
            var ParseDom = require("./../parseDom");

            var document = this.ownerDocument;
            var window = document.defaultView || {};

            var result = new ParseDom().parseHTMLFragment(val, window);
            var docTree = result.docTree;

            this.childNodes = docTree._tree.childNodes;
            for(var i = 0; i < this.childNodes.length; i ++){
                this.childNodes[i].parentNode = this;
            }
    }

    get localName(){
        return this.tagName || '';
    }

    _getAttributeString(){
            var attrArr = [];

            for(var i = 0; i < this.attributes.length; i ++){
                if(this.attributes[i].nodeType && this.attributes[i].nodeType === this.ATTRIBUTE_NODE){
                    var attrName = this.attributes[i].name;
                    if(attrName === "className"){
                        attrName = 'class';
                    }

                    if(attrName === "style"){
                        continue;
                    }

                    attrArr.push(attrName + "=\"" + (this.attributes[i].value || '') + "\"");
                }
                
            }

            //console.log('style');
            var styleCode = []; 
            for(var i in this.style){
                if(this.style[i]){
                    styleCode.push(i + ":" + this.style[i]);
                }
            }

            if(styleCode.length){
                attrArr.push("style=\"" + styleCode.join(";") + "\"");
            }

            var attrStr = attrArr.join(" ");
            if(attrStr){
                attrStr = " " + attrStr;
            }
            
            return attrStr;
    }

    set outerHTML(val){
        var document = this.ownerDocument;
        var div =  document.createElement('div');

        div.innerHTML = val;

        if (this.parentNode) {
            while (div.childNodes[0]) {
                this.parentNode.insertBefore(div.childNodes[0], this);
            }

            this.parentNode.removeChild(this);
        }

    }

    get outerHTML(){
        var tagName = (this.tagName || '').toLowerCase();
        var selfCloseTagReg = /br|hr|img|link|meta/;

        var isSelfEnd = selfCloseTagReg.test(tagName);

        if(this.nodeType === this.TEXT_NODE || ! tagName){
            return this.nodeValue || "";
        }

        var attrStr = this._getAttributeString();


        var html;
        if(isSelfEnd){
            html = "<" + tagName + attrStr + " />";
        }else{
            html = "<" + tagName + attrStr + ">";
            if(this.childNodes){
                for(var i = 0; i < this.childNodes.length; i ++){
                    var child = this.childNodes[i];

                    if(child.nodeType === this.TEXT_NODE){
                        if(donotEnscapeTagReg.test(tagName)){
                            html += child.nodeValue;
                        }else{
                            html += getEnscapeValue(child.nodeValue);
                        }
                    }else{
                        html += child.outerHTML;
                    }
                }
            }

            html += "</" + tagName + ">";
        }

        return html;
    }

    get scrollTop(){
        return this.__scrollTop || 0;
    }

    set scrollTop(val){
        this.__scrollTop = val;
    }


    /*=====================method=======================*/
    getAttribute(attr){
        var item = this.attributes.getNamedItem(attr);
        
        if(item){
            return item.value || null;
        }else{
            return null;
        }
    }

    setAttribute(attr, val){
        var _this = this;

        if(attr === "style"){
             parseCssText(this.style, val);
        }

        
        this.attributes.setNamedItem(attr, val);
    }

    removeAttribute(attr){
        this.attributes.removeNamedItem(attr);
    }

    getElementsByClassName(className){
        var result = [];
        if(this.childNodes.length){
            for(var i = 0; i < this.childNodes.length; i ++){
                var _node = this.childNodes[i];


                if(_node.nodeType === _node.ELEMENT_NODE){
                    if(_node.classList && _node.classList.contains(className)){
                        result.push(_node);
                    }

                    result = result.concat(_node.getElementsByClassName(className));
                }
            }
        }

        return result;
    }

    getElementsByTagName(tagName){
        if(typeof tagName !== 'string'){
            throw new Error('getElementsByTagName first argument to be string!');
        }


        var result = [];

        tagName = tagName.toLowerCase();

        if(this.childNodes.length){
            for(var i = 0; i < this.childNodes.length; i ++){
                var _node = this.childNodes[i];

                if(_node.nodeType === _node.ELEMENT_NODE){
                    var nodeTagName = (_node.tagName || '').toLowerCase();
                    if(nodeTagName === tagName || tagName === "*"){
                        result.push(_node);
                    }

                    result = result.concat(_node.getElementsByTagName(tagName));
                }
            }
        }

        return result;
     }


}

module.exports = Element;
