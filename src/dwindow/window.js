var Document = require('./document');

class Window{
    constructor(browserEnv){
        this.document = new Document();
    }

    setGlobalVars(){
        this.setTimeout = setTimeout;
        this.clearTimeout = clearTimeout;
        this.setInterval = setInterval;
        this.clearInterval = clearInterval;
        this.parseInt = parseInt;
        this.parseFloat = parseFloat;
    }
}

module.exports = Window;
