class DOMTokenList{
    constructor(ownElement){
        this.ownElement = ownElement;
    }

    get __class(){
        var className = this.ownElement.className || '';
        
        if(className.trim()){
            var nameArr = (this.ownElement.className || '').trim().split(/ +/); 
            return nameArr;
        }else{
            return [];
        }

    }


    get length(){
        return this.__class.length;
    }

    get value(){
        return this.__class.join(' ');
    }

    item(index){
        return this.__class[index];
    }

    contains(className){
        return this.__class.indexOf(className) > -1;
    }

    add(className){
        if(this.contains(className)){
        }else{
            var classList = this.__class;

            classList.push(className);
            this.ownElement.className = classList.join(' ');
        }

    }

    remove(className){
        var classList = this.__class;
        var index = classList.indexOf(className);

        if(index > -1){
            classList.splice(index, 1);

            this.ownElement.className = classList.join(' ');
        }
    }

    toggle(className){
        this.contains(className) ? this.remove(className) : this.add(className);
    }

    keys(){
        return this.__class.keys();
    }

    values(){
        return this.__class[Symbol.iterator]();
    }

    toString(){
        return this.value;
    }


}

module.exports = DOMTokenList;
