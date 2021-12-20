//still in dev

class PYTOKENS {
    constructor() {
        this.tokens = ['new', 'undefined', 'null', 'if', 'for', 'continue', 'break', 'switch', 'case', 'else', 'return',
            'do', 'while', 'public', 'private']
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>', ':', '::']

        this.EOL = [';', '\n']
        this.unaryOperators = []
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--']
        this.keywords = ['const', 'function', 'class', 'int', 'float', 'char', 'string']
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = [':']
        this.string = ['"', "'", '`']
    }
}
export { PYTOKENS }