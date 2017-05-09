var Element = require('./element');
var CSSStyleDeclaration = require('./cssstyledeclaration');

class HTMLElement extends Element{
    constructor(tagName){
        super(tagName);

        this.style = new CSSStyleDeclaration();
    }

    blur(){
    }

    click(){
    }

    focus(){
    }

    forceSpellCheck(){
    }
}

module.exports = HTMLElement;
