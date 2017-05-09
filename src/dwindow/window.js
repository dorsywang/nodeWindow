var Document = require('./document');

class Window{
    constructor(browserEnv){
        this.document = new Document(this);
        this.setGlobalVars();
    }

    setGlobalVars(){
        this.setTimeout = setTimeout;
        this.clearTimeout = clearTimeout;
        this.setInterval = setInterval;
        this.clearInterval = clearInterval;
        this.parseInt = parseInt;
        this.parseFloat = parseFloat;

        this.console = {
            log: function(val){
                console.log(val);
            },

            info: function(){
            },

            debug: function(){
            },

            dir: function(){
            }
        }
    }
}

module.exports = Window;
