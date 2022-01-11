//still in dev

class JAVATOKENS {
    constructor() {
        this.keywords = ['for', 'while',
            'break', 'goto', 'if',
            'continue', 'switch',
            'else', 'return',
            'do', 'abstract', 'assert', 'catch', 'try', 'extends', 'finally',
            'implements', 'import', 'instanceof', 'interface', 'native', 'new',
            'package', 'private', 'protected', 'public', 'static', 'strictfp', 'super',
            'synchronized', 'this', 'throw', 'throws', 'volatile', 'default', 'void']
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>', ':']

        this.EOL = [';', '\n']
        this.unaryOperators = []
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--']
        this.types = [
            'int', 'float', 'char', 'long', 'double', 'byte', 'enum', 'null', 'short', 'class'
        ]
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = ['{', '}']
        this.string = ['"', "'"]
        this.inBuilt = ['System', 'String']
    }
}
export { JAVATOKENS }