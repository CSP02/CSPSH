class SSTOKENS {
    constructor() {
        this.types = ['int', 'float', 'string', 'dynamic', 'Action', 'void']
        this.keywords = ['lambda', 'if', 'else', 'switch', 'case', 'then', 'end', 'BREAKPOINT', 'func', 'import'
            , 'new', 'undefined', 'null', 'if', 'for', 'continue', 'break', 'switch', 'case', 'else', 'return']
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>']
        this.inBuilt = ['print', 'input']
        this.EOL = [';', '\n']
        this.unaryOperators = ['=>']
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--']
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = ['{', '}']
        this.string = ['"', "'"]
        this.inBuilt = []
    }
}

export {SSTOKENS}