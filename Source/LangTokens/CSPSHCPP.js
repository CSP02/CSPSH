//still in dev

class CPPTOKENS {
    constructor() {
        this.keywords = ['new', 'undefined', 'null', 'if', 'for', 'continue', 'break', 'switch', 'case', 'else', 'return',
            'do', 'while', 'public', 'private', 'void', 'using', 'namespace']
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>',':', '::']

        this.EOL = [';', '\n']
        this.unaryOperators = []
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--', '>>', '<<']
        this.types = ['class', 'int', 'float', 'char', 'string']
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = ['{', '}']
        this.string = ['"', "'", '`']
        this.inBuilt = ['cout']
    }
}
export { CPPTOKENS }