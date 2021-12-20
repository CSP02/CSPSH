class JSTOKENS {
    constructor() {
        this.tokens = ['new', 'undefined', 'null', 'if', 'for', 'continue', 'break', 'switch', 'case', 'else', 'return',
            'do', 'while']
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>']

        this.EOL = [';', '\n']
        this.unaryOperators = []
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--', '===']
        this.keywords = ['var', 'const', 'let', 'function']
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = ['{', '}']
        this.string = ['"', "'", '`']
    }
}
export { JSTOKENS }