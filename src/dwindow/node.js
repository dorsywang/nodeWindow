var EventTarget = require('./eventtarget');

class Node extends EventTarget{
    constructor(){
         super();

         this.ELEMENT_NODE = 1;
         this.ATTRIBUTE_NODE = 2;
         this.TEXT_NODE = 3;
         this.CDATA_SECTION_NODE = 4;
         this.ENTITY_REFERENCE_NODE = 5; // historical
         this.ENTITY_NODE = 6; // historical
         this.PROCESSING_INSTRUCTION_NODE = 7;
         this.COMMENT_NODE = 8;
         this.DOCUMENT_NODE = 9;
         this.DOCUMENT_TYPE_NODE = 10;
         this.DOCUMENT_FRAGMENT_NODE = 11;
         this.NOTATION_NODE = 12; // historical


         this.childNodes = [];
         this.nodeValue = '';
         this.ownerDocument = null;
         this.parentNode = null;
         this.textContent = '';
    }

    get parentNodeElement(){
        if(this.parentNode.nodeType === this.ELEMENT_NODE){
            return this.parentNode;
        }else{
            return null;
        }
    }
    get previousSibling(){
    }

    get firstChild(){
        return this.childNodes[0];
    }

    get lastChild(){
        return this.childNodes[this.childNodes.length - 1];
    }

    get nextSibling(){
    }

    get nodeName(){
         return this.tagName;
    }


    appendChild(node){
        return this.insertBefore(node);
    }

    // @todo 这个参数有问题
    cloneNode(deep){
        if(this.nodeType === this.TEXT_NODE){
            var node = this.ownerDocument.createTextNode(this.nodeValue);
            return node;
        }

        if(this.nodeType === this.COMMENT_NODE){
            var node = this.ownerDocument.createComment(this.nodeValue);
            return node;
        }


        var node = this.ownerDocument.createDocumentFragment();

        var tagName = this.tagName && this.tagName.toLowerCase();

        if(deep){
            node.innerHTML = "<" + tagName + " " + this._getAttributeString() + ">" + this.innerHTML + "</" + tagName + ">";
        }else{
            node.innerHTML = "<" + tagName + " " + this._getAttributeString() + "></" + tagName + ">";
        }

        return node.childNodes[0];
     }

     getRootNode(){
        var getParentNode = function(node){
            if(node.parentNode){
                return getParentNode(node.parentNode);
            }else{
                return node;
            }
        }

        return getParentNode(this);
     }
     
     contains(node){
        if(node === this){
            return true;
        }

        var flag = false;


        for(var i = 0; i < this.childNodes.length; i ++){
            var child = this.childNodes[i];

            if(child.contains(node)){
                flag = true;
                break;
            }
        }

        return flag;
      }

      compareDocumentPosition(node){
            function comparePosition(a, b){ 
                ( a != b && a.contains(b) && 16 ) + 
                ( a != b && b.contains(a) && 8 ) + 
                ( a.sourceIndex >= 0 && b.sourceIndex >= 0 ? 
                (a.sourceIndex < b.sourceIndex && 4 ) + 
                (a.sourceIndex > b.sourceIndex && 2 ) : 
                1 );
            } 
                
       }

       hasChildNodes(){
            return this.childNodes.length;
       }

       removeChild(node){

          for(var i = 0; i < this.childNodes.length; i ++){
                if(this.childNodes[i] === node){
                    this.childNodes.splice(i, 1);
                    break;
                }
            }
        }


       
        insertBefore(newNode, oldNode){
            for(var i = 0; i < this.childNodes.length; i ++){
                if(this.childNodes[i] === oldNode){
                    break;
                }
            }

            var checkInDocument = function(n){
                var flag = 0;
                var checkNode = function(node){
                    if(node === window.DOMTREE._tree[0]){
                        flag = 1;

                        return;
                    }

                    if(node.parentNode){
                        checkNode(node.parentNode);
                    }
                }

                checkNode(n);

                return flag;
            };

         //   var isInDocument = checkInDocument(this);

            // 如果是frament 则将子元素添加进去
            if((newNode.tagName || '').toLowerCase() === "fragment"){
                Array.prototype.splice.apply(this.childNodes, [i, 0].concat(newNode.childNodes));

                for(var i = 0; i < newNode.childNodes.length; i ++){
                    newNode.childNodes[i].parentNode = this;

                    // 这里有待完善
                    /*
                    if(isInDocument){
                        newNode.childNodes[i].getIdMap(window.DOMTREE._idMap);
                    }
                    */
                }

                // 置空子元素
                newNode.childNodes = [];
            }else{
                // 从原来的父元素中删除掉
                if(newNode.parentNode){
                    newNode.parentNode.removeChild(newNode);
                }

                newNode.parentNode = this;

                this.childNodes.splice(i, 0, newNode);

                // 这里有待完善
                /*
                if(isInDocument){
                    newNode.getIdMap(window.DOMTREE._idMap);
                }
                */
            }

            /*
            if(newNode.tagName === "script"){
                if(newNode.src){
                    var content = window.drequire(newNode.src, function(){
                        newNode.onload && newNode.onload.call(newNode);

                        // 注意这里 把新加的脚本执行后就删除了
                        newNode.parentNode.removeChild(newNode);
                    });
                    for(var i in content){
                        global[i] = content[i];
                    }
                }
            }
            */

            return newNode;

        }
}

module.exports = Node;
