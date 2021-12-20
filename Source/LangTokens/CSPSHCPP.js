//still in dev

class CPPTOKENS {
    constructor() {
        this.tokens = ['new', 'undefined', 'null', 'if', 'for', 'continue', 'break', 'switch', 'case', 'else', 'return',
            'do', 'while', 'public', 'private']
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>',':', '::']

        this.EOL = [';']
        this.unaryOperators = []
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--']
        this.keywords = ['var', 'const', 'let', 'function', 'class', 'int', 'float', 'char', 'string']
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = ['{', '}']
        this.string = ['"', "'", '`']
    }
}
export { CPPTOKENS }