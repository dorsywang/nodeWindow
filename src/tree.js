class Tree{
    constructor(){
        this._tree = {
            name: "ROOT",
            childNodes: []
        };

        this._idMap = {};
        this._allNode = [];

        this._currParentNode = this._tree;
    }

    goNext(){
        var parentNode = this._currParentNode;


        var lastChild =parentNode.childNodes[parentNode.childNodes.length - 1];

        if(lastChild){
            this._currParentNode = lastChild;
        }else{
            throw new Error('tree goNext has no child');
        }
        
    }

    push(node){
        node.parentNode = this._currParentNode;

        this._currParentNode.childNodes.push(node);
    }

    // 回溯
    backUp(){
        this._currParentNode = this._currParentNode.parentNode;
    }

    getNodeById(id){
        return this._idMap[id] || null;
    }

    getAllNodes(){
        return this._allNode || [];
    }
}

module.exports = Tree;
