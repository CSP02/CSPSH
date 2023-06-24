class PYTOKENS {
    constructor() {
        this.keywords = ['import', 'from', 'as', 'def', 'class', 'return', 'if', 'else', 
        'elif', 'for', 'in', 'while', 'break', 'continue', 'pass', 'try', 'except', 
        'finally', 'raise', 'assert', 'with', 'yield', 'lambda', 'del', 'nonlocal', 
        'global', 'async', 'await', 'print', 'input', 'open', 'range', 'len', 'str', 
        'int', 'float', 'bool', 'list', 'dict', 'set', 'tuple', 'frozenset', 'enumerate', 
        'zip', 'reversed', 'sorted', 'sum', 'max', 'min', 'any', 'all', 'abs', 'round', 'pow', 
        'map', 'filter', 'reduce', 'isinstance', 'issubclass', 'super', 'type', 'dir', 'vars', 
        'locals', 'globals', 'hasattr', 'getattr', 'setattr', 'delattr', 'property', 'object', 'Exception'],
        this.operators = ['=', '+', '-', '*', '/', '.', ',', '<', '>', ':', '%', '&', '|', '^', '~', '!', '?', '@', '#', '$']
        this.EOL = [';', '\n']
        this.unaryOperators = []
        this.ternaryOperators = ['!=', '<=', '>=', '==', '++', '--', '===']
        this.types = ['str', 'int', 'float', 'bool', 'list', 'dict', 'set', 'tuple', 'frozenset']
        this.func = ['(', ')']
        this.string = ['"', "'", '`']
        this.index = ['[', ']']
        this.inBuilt = ['print', 'input', 'open', 'range', 'len', 'str', 'int', 
        'float', 'bool', 'list', 'dict', 'set', 'tuple', 'frozenset', 'enumerate', 
        'zip', 'reversed', 'sorted', 'sum', 'max', 'min', 'any', 'all', 'abs', 'round', 
        'pow', 'map', 'filter', 'reduce', 'isinstance', 'issubclass', 'super', 'type', 
        'dir', 'vars', 'locals', 'globals', 'hasattr', 'getattr', 'setattr', 'delattr', 
        'property', 'object', 'Exception']
    }
}

export { PYTOKENS }