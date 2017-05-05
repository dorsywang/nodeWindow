class Tree{
    constructor(){
        this._tree = [];
        this._idMap = {};
        this._allNode = [];

        this._currNodesArr = null;

        this._currNodesArr = this._tree;

        this._currNode;
    }

     goNext(){
        if(! this._currNode.childNodes){
            this._currNode.childNodes = [];
        }

        this._currNodesArr = this._currNode.childNodes;

        this._currNodeParent = this._currNode;

    }

    push(node){
        this._currNodesArr.push(node);
        this._currNode = node;

        if(this._currNodeParent){
            node.parentNode = this._currNodeParent;
        }else{
            node.parentNode = {
                name: "ROOT",
                childNodes: this._tree
            };
        }
    }

    // 回溯
    backUp(){
        this._currNode = this._currNode.parentNode;
        this._currNodeParent = this._currNode.parentNode;

        //console.log(this._currNode.parentNode, 'parentNode');
        try{
            if(! this._currNode.parentNode.childNodes){
                this._currNode.parentNode.childNodes = [];
            }

            this._currNodesArr = this._currNode.parentNode.childNodes;
        }catch(e){
            //console.log(this._currNode, 'parentNode');
        }
    }

    getNodeById(id){
        return this._idMap[id] || null;
    }

    getAllNodes(){
        return this._allNode || [];
    }
}

module.exports = Tree;
