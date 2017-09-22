var Text = require('./text');

class NamedNodeMap{
    constructor(node){
        this.length = 0;
        this.ownerElment = node;
    }

    removeNamedItem(name){
         var index = -1;
         for(var i in this){
            if(this.hasOwnProperty(i)){
                var item = this[i];

                if(item.name == name){
                    index = Number(i);
                    break;
                }
            }
        }

        if(! isNaN(index) && index > -1){
            delete this[index];
            this.length --;

            for(var i = index; i < this.length; i ++){
                this[i] = this[i + 1];
            }

            delete this[name];
        }
    }

    setNamedItem(name, value){
        var attr = this.getNamedItem(name);
        var _this = this;

        if(attr){
            attr.name = name;
            attr.nodeValue = value;
            attr.value = value;

            attr.firstChild.value = value;
            attr.firstChild.nodeValue = value;
        }else{

            this[this.length ++] = {
                name: name,
                value: value,
                ownerElment: this.ownerElment,
                nodeType: this.ownerElment.ATTRIBUTE_NODE,
                nodeValue: value,
                childNodes: function(){
                    var node = _this.ownerElment.ownerDocument.createTextNode();
                    return [node];
                }(),

                get lastChild(){
                    return this.childNodes[this.childNodes.length - 1];
                },

                get firstChild(){
                    return this.childNodes[0];
                }
            };

            this[name] = this[this.length - 1];
        }
    }

    getNamedItem(name){
        for(var i in this){
            if(this.hasOwnProperty(i)){
                var item = this[i];

                if(item.name == name){
                    return item;
                }
            }
        }
    }
}

module.exports = NamedNodeMap;
