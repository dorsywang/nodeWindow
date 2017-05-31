var Tree = require('./tree');
var compileCode = require('./compileCode');

var preParsedMap = {};

class ParseDom{
    parse(html, window){
        return this.parseHTML(html, window);
    }

    parseHTMLFragment(htmlStr, window){
        var document = window.document;

        var docTree = new Tree();

        var currNode;
        var preParedQueue;
        if(preParsedMap[htmlStr]){
        }else{
            preParsedMap[htmlStr] = this.preParse(htmlStr);
        }

        preParedQueue = preParsedMap[htmlStr];

        var headNode, bodyNode, htmlNode;


        for(var i = 0; i < preParedQueue.length; i ++){
            var item = preParedQueue[i];

            var tagType = item.tagType;

            var tagName = item.tagName;

            if(tagType === "startTag"){
                var node = document.createElement(tagName);
                
                if(tagName === "head"){
                   headNode = node;
                }

                if(tagName === "body"){
                    bodyNode = node;
                }

                if(tagName === "html"){
                   htmlNode = node;
                }

                currNode = node;


                docTree.push(node);
                //_allNode.push(node);
            }else if(tagType === "attrs"){

                var match = item.match;
                if(match === ">"){
                    if(currNode.getAttribute('type') && (currNode.getAttribute("type") + '').toLowerCase() !== "text/javascript"){
                    }else{
                        if(currNode.getAttribute("src")  && currNode.tagName === 'script'){
                            var attrValue = currNode.getAttribute("src");
                            var content = windowSpace.drequire(attrValue);

                        }
                    }

                    if(item.goNext){
                        docTree.goNext();
                    }
                }else if(match === "/>"){
                }else {
                    var attrName = item.attrName;
                    var attrValue = item.attrValue;

                    if(attrName === "id"){
                       // _idMap[attrValue] = currNode;
                    }

                    currNode.setAttribute(attrName, attrValue);
                }
            }else if(tagType === "textTag"){
                var text = item.nodeValue;
                var node = document.createTextNode(text);
                docTree.push(node);

                currNode = node;

                
                if(item.checkParentScript){
                      if(node.parentNode.tagName === "script"){
                          if(node.parentNode.getAttribute('type') && (node.parentNode.getAttribute("type") + '').toLowerCase() !== "text/javascript"){
                            }else{
                                try{
                                    compileCode.runCode(text, window);
                                }catch(e){
                                }
                            }
                        }

                }

                if(item.backUp){
                    docTree.backUp();
                }
            }else if(tagType === "commentTag"){
                var text = item.nodeValue;
                var node = document.createComment(text);

                docTree.push(node);

                currNode = node;

                if(item.backUp){
                    docTree.backUp();
                }
            }else if(tagType === "endTag"){
                    // 如果是一个endTag 将一个空结点做为tag的子结点
                    var node = document.createElement();
                    docTree.push(node);

                    currNode = node;

                    if(item.backUp){
                        docTree.backUp();
                    }

            }
        }


        return {
            headNode: headNode,
            bodyNode: bodyNode,
            htmlNode: htmlNode,
            docTree: docTree
        };
    }

    parseHTMLDocument(htmlStr, window){
        var document = window.document;

        var result = this.parseHTMLFragment(htmlStr, window);

        var docTree = result.docTree;

        var headNode = result.headNode || document.createElement('head');

        var bodyNode, htmlNode;

        if(result.bodyNode){
            bodyNode = result.bodyNode;
        }else{
            var bodyNode = document.createElement('body');
            bodyNode.childNodes = docTree._tree.childNodes;

            bodyNode.childNodes.map(function(item){
                item.parentNode = bodyNode;
            });
        }

        if(! result.htmlNode){
            htmlNode= document.createElement('html');

            htmlNode.childNodes.push(headNode);
            htmlNode.childNodes.push(bodyNode);
        }else{
            htmlNode = result.htmlNode;
        }

        var tree = new Tree();
        tree.push(document);
        tree.goNext();

        tree.push(htmlNode);

        document.documentElement = htmlNode;
        document.head = headNode;
        document.body = bodyNode;

        // check docTree

        return document;

        //console.log(docTree);

    }
    
    preParse(htmlStr){
        // 预处理
        // 去掉注释
        // @todo 自封口
       // var commentsReg = /<!--[\s\S]*?-->/g;


        //htmlStr = htmlStr.replace(commentsReg, "");

        // 对转义字符的处理
        var escapeCharReg = /\\(.)/g;

        var escapeCount = 0;
        var escapeCharTable = {
        };


        var codeProcessQueue = [];

        var codeProcessed;

        // 预处理
        /*
        str = str.replace(escapeCharReg, function(result, $1){
            if(escapeCharTable[$1]){
            }else{
                escapeCount ++;

                escapeCharTable[$1] = escapeCount;
            }

            var index = escapeCharTable[$1];

            var escapeChar = "__fire__" + index;

            return escapeChar;
        });
        */

        //var docTree = new Tree();

        //scopeSpace.DOMTREE = docTree;

        //var _idMap = docTree._idMap; 
        //var _allNode = docTree._allNode;

        //var tagReg = /\s*<(\/?)([^>\s]+)([^>]*)>/g;

         var tagReg = /<\!\-\-|<([^\s\/>]+)|<(\/)([^\s>]+)>|([^<]+)/g;

        var attrReg = />|\/>|([^\s=]+)=(?:"([^"]*)"|'([^']*)'|([^\s"']+))/g;

        var selfCloseTagReg = /br|hr|img|link|meta/;

        // 可能里面允许出现</div这样的东西的tag
        var mixableTagReg = /script|code|pre/;

        var getCloseTagReg = function(tagName){
            var reg = new RegExp("</(" + tagName + ")>", "g");
            reg.type = "mixableTagCloseReg";

            return reg;
        };

        /**
         * 分析元素树
         */
        var result, attrResult, attrsObj;
        var lastIndex = 0, lastTagName = "";
        var text, textNode;

        var currReg = tagReg;

        // 先检查是不是只有纯文本
        /*
        if(! currTagReg.test(htmlStr)){
            if(textReg.test(htmlStr)){
               text = htmlStr;

                if(text){
                    textNode = new domEle.Element();
                    textNode.nodeType = textNode.TEXT_NODE;
                    textNode.nodeValue = text;

                    docTree.push(textNode);
                }
            }
        }
        */

        currReg.lastIndex = 0;

        var currNode, attrsObj = {};

        var setCurrTag = function(tag){
            lastIndex = currReg.lastIndex;

            currReg = tag;
            currReg.lastIndex = lastIndex;

        };

        while(result = currReg.exec(htmlStr)){
            var tagType;

            var tagName = result[1] || result[3];
            var node;

            // 如果是tag 判断type
            if(currReg === tagReg){
                if(result[0] === '<!--'){
                    tagType = "commentTag";
                }else if(result[1]){
                    tagType = "startTag";
                }else if(result[2] === "/"){
                    tagType = "endTag";
                }else{
                    tagType = "textTag";
                }
            }else if(currReg === attrReg){
                tagType = "attrs";
            }else if(currReg.type === "mixableTagCloseReg"){
                tagType = "mixableTagCloseReg";
            }else if(currReg.type === "commentEndTag"){
                tagType = "commentEndTag";
            }

            if(tagType === "startTag"){
                codeProcessed = {
                    tagType: "startTag",
                    tagName: tagName
                };

                
                currNode = codeProcessed;
                attrsObj = {};

                codeProcessQueue.push(codeProcessed);



                // 开始进入属性分析进程
                setCurrTag(attrReg);


            // 属性分析进程
            }else if(tagType === "attrs"){
                if(result[0] === ">"){
                    
                    codeProcessed = {
                        tagType: "attrs",
                        match: ">"
                    };

                    // 开始寻找开始、结束标签
                    setCurrTag(tagReg);

                    // 属于自封口的是不会继续深入的
                    if(selfCloseTagReg.test(currNode.tagName)){
                    }else{
                        //docTree.goNext();

                        codeProcessed.goNext = 1;
                    }

                    // 如果是script等 不在寻找标签
                    if(mixableTagReg.test(currNode.tagName)){

                        setCurrTag(getCloseTagReg(currNode.tagName));
                    }

                    codeProcessQueue.push(codeProcessed);

                // 自封口了
                }else if(result[0] === "/>"){
                    // 开始寻找开始、结束标签
                    setCurrTag(tagReg);

                    codeProcessQueue.push({
                        tagType: "attrs",
                        match: "/>"
                    });

                // 这里分析属性
                }else{
                    var attrName = (result[1] + '').trim();
                    var attrValue = result[2] || result[3] || result[4];

                    if(attrName === "class"){
                        attrName = "className";
                    }

                    codeProcessQueue.push({
                        tagType: "attrs",
                        attrName: attrName,
                        attrValue: attrValue
                    });
                }
            }else if(tagType === "textTag"){
                var text = result[4];

                codeProcessQueue.push({
                    tagType: "textTag",
                    nodeValue: text || ''
                });

                currNode = node;

            }else if(tagType === "endTag"){
                    
                    codeProcessed = {
                        tagType: "endTag"
                    };

                    
                    // 自封口没有深入 也不会回溯
                    if(selfCloseTagReg.test(tagName)){

                    // 回溯到该子结点的级别
                    }else{
                        //docTree.backUp();

                        codeProcessed.backUp = 1;
                    }

                    codeProcessQueue.push(codeProcessed);
            }else if(tagType === "commentTag"){
                var closeReg = /\-\->/g;
                closeReg.type = "commentEndTag";

                setCurrTag(closeReg);
            }else if(tagType === "commentEndTag"){
                var start = lastIndex;
                var len = currReg.lastIndex - result[0].length - start;

                var text = htmlStr.substr(start, len);

                codeProcessed = {
                    tagType: "commentTag",
                    checkParentScript: false,
                    nodeValue: text,
                    backUp: 0
                };

                currNode = codeProcessed;

                setCurrTag(tagReg);

                codeProcessQueue.push(codeProcessed); 
            }else if(tagType === "mixableTagCloseReg"){
                var start = lastIndex;
                var len = currReg.lastIndex - result[0].length - start;

                var text = htmlStr.substr(start, len);

                codeProcessed = {
                    tagType: "textTag",
                    checkParentScript: 1,
                    nodeValue: text,
                    backUp: 1
                };

                currNode = codeProcessed;

                setCurrTag(tagReg);

                codeProcessQueue.push(codeProcessed);
            }
        }

        return codeProcessQueue;
    }
}

module.exports = ParseDom;
