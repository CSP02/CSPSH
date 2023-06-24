class CTOKENS {
    constructor() {
        this.keywords = ['for', 'while',
            'break', 'goto', 'if',
            'continue', 'switch',
            'else', 'return',
            'do']
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>']

        this.EOL = [';', '\n']
        this.unaryOperators = []
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--']
        this.types = [
            'auto', 'extern', 'short', 'float', 'signed', '_Alignas',
            'case', 'sizeof', '_Alignof',
            'char', 'static', '_Atomic',
            'const', 'struct', '_Bool', 'inline', '_Complex',
            'default', 'int', 'typedef', '_Generic', 'long', 'union', '_Imaginary',
            'double', 'register', 'unsigned', '_Noreturn', 'restrict', 'void', '_Static_assert',
            'enum', 'volatile', '_Thread_local'
        ]
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = ['{', '}']
        this.string = ['"', "'"]
        this.inBuilt = [
            'printf', 'scanf', 'abort', 'abs',
            'acos', 'asctime', 'asctime_r', 'asin', 'assert',
            'atan2', 'atexit', 'atof', 'atoi', 'atan', 'atol',
            'bsearch', 'btowc', 'calloc', 'catclose', 'gets', 'puts',
            'getchar', 'getc', 'fopen', 'fclose', 'strcat', 'strchr',
            'strcmp', 'sscanf', 'strcpy', 'strlen'
        ]
    }
}
export { CTOKENS }