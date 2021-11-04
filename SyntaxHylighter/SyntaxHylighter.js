window.onload = function () {
    let code = document.getElementById('SyHy');
    if (code.className.includes('Dark'))
        document.head.innerHTML += `<link rel="stylesheet" href="./SyntaxHylighter/SyntaxHylighterDark.css">`
    else
        document.head.innerHTML += `<link rel="stylesheet" href="./SyntaxHylighter/SyntaxHylighterLight.css">`

    const jsTokens = [
        'new',
        'undefined',
        'null',
        'if',
        'for',
        'continue',
        'break',
        'switch',
        'case',
        'else'
    ]
    const jsOperators = [
        '=',
        '+',
        '-',
        '*',
        '/',
    ]
    const jsUnaryOperators = [
        '==',
        '++',
        '--'
    ]
    const jsTernaryOperators = [
        '!=',
        '<=',
        '>=',
        '<',
        '>'
    ]
    const jsKeywords = [
        'var',
        'const'
    ]

    let tokens = []
    code.innerHTML.split(' ').forEach(token => {
        if (token != '')
            tokens.push(token)
        else { }
    })

    let trimmedTokens = []
    let isOperator;

    code.innerHTML = ''
    switch (code.lang) {
        case 'js':
            JSSyntaxHighlight(tokens);
            break
    }

    function JSSyntaxHighlight(tokens) {
        for (i = 0; i <= tokens.length; i++) {
            let token = tokens[i]
            if (token == undefined) {
                continue
            }
            switch (token) {
                case jsKeywords[jsKeywords.indexOf(token)]:
                    code.innerHTML += `<span class="sh-keyword">${token} </span>`
                    break
                case jsTokens[jsTokens.indexOf(token)]:
                    code.innerHTML += `<span class="sh-token">${token} </span>`
                    break
                default:
                    if (!/[a-z]/.test(token.charAt(0)) && /[A-Z]/.test(token.charAt(0)))
                        code.innerHTML += `<span class="sh-class">${token} </span>`
                    else
                        code.innerHTML += `<span class="sh-variable">${token} </span>`
                    break
            }
        }
    }
}