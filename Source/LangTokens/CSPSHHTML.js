class HTMLTOKENS{
    constructor() {
        this.keywords = ['html', 'head', 'title', 'body', 'div', 'span']
        this.operators = ['/', '<', '>', '=']
        this.EOL = ['\n']
        this.unaryOperators = []
        this.ternaryOperators = []
        this.types = []
        this.func = ['(', ')']
        this.index = []
        this.curlyBraces = []
        this.string = ['"', "'", '`']
        this.inBuilt = ['id', 'class', 'type', 'rel', 'src', 'lang', 'theme', 'linecount', 'download']
    }
}

export{HTMLTOKENS}