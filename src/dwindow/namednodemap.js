
class NamedNodeMap{
    constructor(node){
        this.length = 0;
        this.ownerElment = node;
    }

    setNamedItem(name, value){
        var attr = this.getNamedItem(name);

        if(attr){
            attr.name = name;
            attr.nodeValue = value || '';
            attr.value = value || '';

            attr.firstChild.value = value || '';
            attr.firstChild.nodeValue = value || '';
        }else{

            this[this.length ++] = {
                name: name,
                value: value || '',
                ownerElment: this.ownerElment,
                nodeType: Element.prototype.ATTRIBUTE_NODE,
                nodeValue: value || '',
                childNodes: function(){
                    var node = new Element();
                    node.nodeType = node.TEXT_NODE;
                    node.value = value || '';
                    node.nodeValue = value || '';

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
