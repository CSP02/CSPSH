window.onload = function () {
    let code = document.getElementById('SyHy');
    let clipboardText = code.innerText
    if (code.className.includes('Dark'))
        document.head.innerHTML += `<link rel="stylesheet" href="/SyntaxHylighter/SyntaxHylighterDark.css">`
    else
        document.head.innerHTML += `<link rel="stylesheet" href="/SyntaxHylighter/SyntaxHylighterLight.css">`

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
        '.',
    ]

    const jsEOL = [';', '\n']
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
        'const',
        'let'
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

    TrimTokens(tokens)
    console.log(trimmedToken)

    trimmedToken.forEach(trimmedTok => {
        if (!Array.isArray(trimmedTok)) {
            trimmedTokens.push(trimmedTok)
        } else if (Array.isArray(trimmedTok)) {
            console.log("working")
            TrimTokens(trimmedTok)
        }
    })

    switch (code.lang) {
        case 'js':
            JSSyntaxHighlight(trimmedTokens);
            break
    }

    //main fucntion that highlightes the js code
    function JSSyntaxHighlight(tokens) {
        code.innerHTML += `<div id="copyHolder"><button id="copyVector"><div id="copy-cube"></div><div id="copy-cube2"><hr class="hr-copy-cube"><hr class="hr-copy-cube"></div></button></div><br>`
        for (i = 0; i <= tokens.length; i++) {
            let token = tokens[i]
            if (token == undefined || token == '') {
                continue
            } else
                switch (token) {
                    case jsKeywords[jsKeywords.indexOf(token)]:
                        code.innerHTML += `<span class="sh-keyword">${token} </span>`
                        break
                    case jsTokens[jsTokens.indexOf(token)]:
                        code.innerHTML += `<span class="sh-token">${token} </span>`
                        break
                    case jsTernaryOperators[jsTernaryOperators.indexOf(token)]:
                        code.innerHTML += `<span class="sh-operator">${token}</span>`
                        break
                    case jsUnaryOperators[jsUnaryOperators.indexOf(token)]:
                        code.innerHTML += `<span class="sh-operator">${token}</span>`
                        break
                    case jsEOL[jsEOL.indexOf(token)]:
                        code.innerHTML += `<span class="sh-operator">${token}</span><br>`
                        break
                    default:
                        if (!isNaN(token))
                            code.innerHTML += `<span class="sh-numerals">${token}</span>`
                        else if (token.includes('"') || token.includes("'") || token.includes('`')) {
                            code.innerHTML += `<span class="sh-string"> ${token}</span>`
                            if (jsString.includes(token.charAt(0)) && jsString.includes(token.charAt(token.length - 1))) { }
                            else
                                for (i; i < tokens.length; i++) {
                                    let toke = tokens[i + 1]
                                    if (toke == undefined) { }
                                    else
                                        if (toke.includes('"') || toke.includes("'") || toke.includes('`')) {
                                            code.innerHTML += `<span class="sh-string"> ${toke}</span>`
                                            i++
                                            break
                                        } else {
                                            code.innerHTML += `<span class="sh-string"> ${toke}</span>`
                                            continue
                                        }
                                }
                        }
                        else if (!/[a-z]/.test(token.charAt(0)) && /[A-Z]/.test(token.charAt(0)))
                            code.innerHTML += `<span class="sh-class">${token} </span>`
                        else if (!/[a-z]/.test(token) && !/[A-Z]/.test(token))
                            code.innerHTML += `<span class="sh-operator">${token}</span>`
                        else
                            code.innerHTML += `<span class="sh-variable">${token}</span>`
                        break
                }
        }
    } // end of the main js highlighting function

    //fucntion that trims the tokens furthur to detect the other operators like arthematic operators etc.
    function TrimTokens(tokens) {
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
                        } else if (jsEOL.includes(token[n])) {
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
        for (m = 0; m < splitted.length + 1; m++) {
            if (m == 0)
                trimmedToken.push(splitted[0])
            else if (m % 2 == 0) {
                trimmedToken.push(splitted[m - 1])
            } else if (m % 2 != 0) {
                trimmedToken.push(symbol)
            }
        }
        isOperator = false
    }

    function PushToken(token) {
        trimmedToken.push(token)
    }

    document.getElementById('copyVector').addEventListener('click', function(){        
        var inp = document.createElement("input")
        document.body.appendChild(inp)
        inp.value = clipboardText
        var inpValue = inp.value
        console.log(inpValue)
        inp.select()
        document.execCommand("Copy");
        document.body.removeChild(inp)
        document.getElementById("copyHolder").innerHTML += 'Copied'
    })
}