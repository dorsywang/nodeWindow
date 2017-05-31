var Element = require('./element');
var CSSStyleDeclaration = require('./cssstyledeclaration');

class HTMLElement extends Element{
    constructor(tagName){
        super(tagName);

        this.style = new CSSStyleDeclaration();
    }

    blur(){
        console.warn('blur is not realised');
    }

    unblur(){
    }

    click(){
    }

    focus(){
    }

    forceSpellCheck(){
    }
}

module.exports = HTMLElement;
