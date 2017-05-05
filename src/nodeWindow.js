var Window = require('./dwindow/window');
var ParseDom = require('./parseDom');


var fileCache = {};

class nodeWindow{
    run(filepath, browserEnv, config){
        var html;
        if(fileCache[filepath]){
        }else{
            var fileContent = require("fs").readFileSync(filepath, {encoding: "utf-8"});
            fileCache[filepath] = fileContent;
        }


        var window = new Window(browserEnv);
        var parsor = new ParseDom(window);

        parsor.parse(html);

        return window;
    }

    runHTML(html, browserEnv, config){
        var window = new Window(browserEnv);
        var parsor = new ParseDom(window);

        parsor.parse(html, window);

        return window;
    
    }
}

var a = new nodeWindow();
a.runHTML(`
    <div>xxxxxxxxxxxxxxxxxx</div>
`, {}, {});
