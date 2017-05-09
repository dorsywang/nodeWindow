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

class CSSStyleDeclaration{
    constructor(){
    }

     set cssText(val){
         parseCssText(this, val);
     }
}

module.exports = CSSStyleDeclaration;
