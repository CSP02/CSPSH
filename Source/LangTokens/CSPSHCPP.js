//still in dev

class CPPTOKENS {
    constructor() {
        this.keywords = ['new', 'undefined', 'null', 'if', 'for', 'continue', 'break', 'switch', 'case', 'else', 'return',
            'do', 'while', 'public', 'private', 'void']
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>',':', '::']

        this.EOL = [';']
        this.unaryOperators = []
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--']
        this.types = ['class', 'int', 'float', 'char', 'string']
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = ['{', '}']
        this.string = ['"', "'", '`']
    }
}
export { CPPTOKENS }