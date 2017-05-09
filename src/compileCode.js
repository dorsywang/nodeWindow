var vm = require('vm');
var url = require('url');
var path = require('path');

   // 这里require是由script标签触发的
var drequire = function(filename, callback, isPreCompile){
    var originPath = filename;

//    filename = this.__toRealPath(filename);

    var urlpath = url.parse(filename);
    var search = urlpath.search;
    var query = querystring.parse((urlpath.search || "").replace(/^\?/, ""));


    // http请求
    if(urlpath.hostname){
        /*
        var xhr = new this.XMLHttpRequest();
        xhr.open("GET", urlpath.href);
        xhr.onload = function(data){
            vm.runInThisContext(content, filename);
        };

        xhr.send(search);
        */

    // 本地文件
    }else{
        var filepath;
      //  if(/qqapi\.js/.test(filename)){
       //     filepath = filename;
        //}else{
            filepath = path.resolve(this.__basePath, urlpath.pathname);
        //}

        var content;

        if(fileReadMap[filename]){
        }else{
           try{
               fileReadMap[filename] = fs.readFileSync(filepath, {encoding: "utf-8"});
           }catch(e){
                console.log('file not found', filepath, originPath);

                throw e;
           }
        }

        content = fileReadMap[filename];

        if(fileCompiledMap[filename]){
        }else{
            fileCompiledMap[filename] = new vm.Script(content, {
                filename: filename
            });
        }

        var compiledScript = fileCompiledMap[filename];

        if(isPreCompile){
            return compiledScript;
        }else{
            try{
                var rs = compiledScript.runInNewContext(this);
            }catch(e){
                console.log(e.stack);
            }

            for(var i in rs){
                this[i] = rs[i];
            }

            ctx = null;
        }

        callback && callback();
    }
};

module.exports = {
    runCode: function(code, window){
        return vm.runInNewContext(code, window);
    }
};
