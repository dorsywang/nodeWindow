var Window = require('./dwindow/window');
var ParseDom = require('./parseDom');


var fileCache = {};

class NodeWindow{
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

module.exports = NodeWindow;
/*

var a = new nodeWindow();
var window = a.runHTML(`
    <body>
    <div>xxxxxxxxxxxxxxxxxx</div>
    <script type="text/javascript">console.log()</script>
    </body>
`, {}, {});

// test style
var d = window.document.body;
d.style.width = '12px';
d.style.display = "block";
//console.log(d.outerHTML);

// test cssText
window.document.body.style.cssText = "left: 0px; top: 0px;";

console.log(window.document.body.outerHTML);
*/
