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
        '.'
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

    const jsFunc = ['(', ')']
    const jsString = ['"', "'", '`']

    let tokens = []
    code.innerHTML.split(' ').forEach(token => {
        if (token != '')
            tokens.push(token)
        else { }
    })

    let trimmedToken = []
    let trimmedTokens = []
    let operators = []
    let isOperator;

    code.innerHTML = ''

    TrimTokens()


    trimmedToken.forEach(trimmedTok => {
        if (!Array.isArray(trimmedTok)) {
            trimmedTokens.push(trimmedTok)
        } else if (Array.isArray(trimmedTok)) {
            trimmedTok.forEach(trimTok => {
                trimmedTokens.push(trimTok)
            })
        }
    })
    console.log(trimmedTokens)

    switch (code.lang) {
        case 'js':
            JSSyntaxHighlight(trimmedTokens);
            break
    }

    //main fucntion that highlightes the js code
    function JSSyntaxHighlight(tokens) {
        for (i = 0; i <= tokens.length; i++) {
            let token = tokens[i]
            if (token == undefined || token == '') {
                continue
            }
            switch (token) {
                case jsKeywords[jsKeywords.indexOf(token)]:
                    code.innerHTML += `<span class="sh-keyword">${token} </span>`
                    break
                case jsTokens[jsTokens.indexOf(token)]:
                    code.innerHTML += `<span class="sh-token">${token} </span>`
                    break
                case jsTernaryOperators[jsTernaryOperators.indexOf(token)]:
                    code.innerHTML += `<span class="sh-operator">${token} </span>`
                    break
                case jsUnaryOperators[jsUnaryOperators.indexOf(token)]:
                    code.innerHTML += `<span class="sh-operator">${token} </span>`
                    break
                default:
                    if (!/[a-z]/.test(token.charAt(0)) && /[A-Z]/.test(token.charAt(0)))
                        code.innerHTML += `<span class="sh-class">${token} </span>`
                    else if (!/[a-z]/.test(token) && !/[A-Z]/.test(token))
                        code.innerHTML += `<span class="sh-operator">${token} </span>`
                    else
                        code.innerHTML += `<span class="sh-variable">${token} </span>`
                    break
            }
        }
    } // end of the main js highlighting function

    //fucntion that trims the tokens furthur to detect the other operators like arthematic operators etc.
    function TrimTokens() {
        for (k = 0; k <= tokens.length; k++) {
            let token = tokens[k]
            let tok
            if (token == undefined || token == '')
                return
            if (token.length > 1) {
                for (n = 0; n <= token.length; n++) {
                    if (token[n] != undefined) {
                        if (jsOperators.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        } else if (jsFunc.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        } else {
                            isOperator = false
                        }
                    }
                }
                if (isOperator)
                    IdentiyTokens(token, tok)
                else
                    PushToken(token)
            }
            else
                PushToken(token)
        }
    }

    function IdentiyTokens(token, symbol) {
        let splitted = token.split(symbol)
        for (m = 0; m <= splitted.length; m++) {
            console.log(splitted[m])
            if (m + 1 % 2 == 0) {
                console.log(symbol)
                trimmedToken.push(splitted[m])
            } else if (m % 2 != 0) {
                trimmedToken.push(symbol)
            } else {
                trimmedToken.push(splitted[m])
            }
        }
        isOperator = false
    }

    function PushToken(token) {
        trimmedToken.push(token)
    }
}