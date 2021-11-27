let clipboardText
let content = []
let openBraceCount = 0
let fileName
const jsTokens = ['new', 'undefined', 'null', 'if', 'for', 'continue', 'break', 'switch', 'case', 'else', 'return',
    'do', 'while']
const jsOperators = ['=', '+', '-', '*', '/', '.', ',']

const jsEOL = [';', '\n']
const jsUnaryOperators = ['==', '++', '--']
const jsTernaryOperators = ['!=', '<=', '>=', '<', '>']
const jsKeywords = ['var', 'const', 'let', 'function']

const jsFunc = ['(', ')']
const jsIndex = ['[', ']']
const jsString = ['"', "'", '`']
window.onload = function () {
    let codes = document.getElementsByClassName('CSPSH');

    for (let i = 0; i < codes.length; i++) {
        let code = codes[i]
        fileName = code.getAttribute('name')
        if (!fileName) {
            fileName = `file`
        }
        content.push(code.innerText)
        if (code.className.includes('dark'))
            document.head.innerHTML += `<link rel="stylesheet" href="/Source/CSPSHDark.css">`
        else
            document.head.innerHTML += `<link rel="stylesheet" href="/Source/CSPSHLight.css">`
        let codeContent = code.innerHTML
        HighLight(code, codeContent)
    }
    const buttons = document.getElementsByClassName('copyVector')
    for (let j = 0; j < buttons.length; j++) {
        const button = buttons[j];
        button.addEventListener('click', function () {
            clipboardText = content[j]
            var inp = document.createElement("input")
            document.body.appendChild(inp)
            inp.value = clipboardText
            inp.select()
            document.execCommand("Copy");
            document.body.removeChild(inp)
        })

    }
}

function HighLight(code, codeContent) {
    let tokens = []
    let trimmedToken = []
    let trimmedTokens = []
    let operators = []
    let isOperator;
    codeContent.split(' ').forEach(token => {
        if (token != '')
            tokens.push(token)
        else { }
    })


    code.innerHTML = ''

    TrimTokens(tokens)

    trimmedToken.forEach(trimmedTok => {
        if (!Array.isArray(trimmedTok)) {
            trimmedTokens.push(trimmedTok)
        } else if (Array.isArray(trimmedTok)) {
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
        code.innerHTML += `<div id="copyHolder">File Name: ${fileName}.${code.lang}<button class="copyVector"><div id="copy-cube"></div><div id="copy-cube2"><hr class="hr-copy-cube"><hr class="hr-copy-cube"></div></button></div><br><br>`
        for (i = 0; i <= tokens.length; i++) {
            let token = tokens[i]
            if (token == undefined || token == '') {
                continue
            } else {
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
                        if (tokens[i+1] != undefined && tokens[i + 1].includes('\n')) {
                            i++;
                        }
                        code.innerHTML += `<span class="sh-operator">${token}</span><br>`
                        if (tokens[i + 2]) {
                            if (openBraceCount >= 0 && tokens[i + 2].includes('}')) {
                                openBraceCount--
                                if (openBraceCount <= 0)
                                    openBraceCount = 0
                                code.innerHTML += ('&emsp;&emsp;&emsp;').repeat(openBraceCount)
                            } else if (openBraceCount >= 0 && !tokens[i + 1].includes('}')) {
                                code.innerHTML += ('&emsp;&emsp;&emsp;').repeat(openBraceCount)
                            }
                        }
                        break
                    default:
                        if (!isNaN(token))
                            code.innerHTML += `<span class="sh-numerals">${token}</span>`
                        else if (token.includes('"') || token.includes("'") || token.includes('`')) {
                            code.innerHTML += `<span class="sh-string">${token}</span>`
                            if (jsString.includes(token.charAt(0)) && jsString.includes(token.charAt(token.length - 1))) { }
                            else
                                for (i; i < tokens.length; i++) {
                                    let toke = tokens[i + 1]
                                    if (toke == undefined) { }
                                    else
                                        if (toke.includes('"') || toke.includes("'") || toke.includes('`')) {
                                            code.innerHTML += `<span class="sh-string">${toke}</span>`
                                            i++
                                            break
                                        } else {
                                            code.innerHTML += `<span class="sh-string">${toke}</span>`
                                            continue
                                        }
                                }
                        }
                        else if (!/[a-z]/.test(token.charAt(0)) && /[A-Z]/.test(token.charAt(0)))
                            if (tokens[i - 1] == 'new')
                                code.innerHTML += `<span class="sh-class">${token}</span>`
                            else
                                code.innerHTML += `<span class="sh-Func">${token}</span>`
                        else if (token.includes('{') || token.includes('}')) {
                            if (token.includes('{')) {
                                let l = 0
                                openBraceCount++
                                code.innerHTML += `<span class="sh-operator">${token}</span>`
                            } else if (token.includes('}')) {
                                code.innerHTML += `<span class="sh-operator">${token}</span>`
                            }
                        }
                        else if (!/[a-z]/.test(token) && !/[A-Z]/.test(token))
                            if (token.includes('(') || token.includes(')') || token.includes('.') || token.includes(','))
                                if (!token.includes(','))
                                    code.innerHTML += `<span class="sh-operator">${token}</span>`
                                else
                                    code.innerHTML += `<span class="sh-operator">${token} </span>`
                            else
                                code.innerHTML += `<span class="sh-operator"> ${token} </span>`
                        else {
                            if (token.includes('(') || tokens[i + 1] == '(' || tokens[i + 1].includes('(') || tokens[i + 2] == '(' || tokens[i + 2].includes('('))
                                code.innerHTML += `<span class="sh-Func">${token}</span>`
                            else
                                code.innerHTML += `<span class="sh-variable">${token}</span>`
                        }
                        break
                }
            }
        }
    } // end of the main js highlighting function

    //fucntion that trims the tokens furthur to detect the other operators like arthematic operators etc.
    function TrimTokens(tokens) {
        for (k = 1; k <= tokens.length; k++) {
            let token = tokens[k]
            let tok
            if (token == undefined || token == '')
                return
            if (token.includes('&lt') || token.includes('&gt') && token.includes(';'))
            token = token.replace('&lt', ' <').replace('&gt', ' >').replace(';', '')
            if (token.length > 1) {
                if (jsTernaryOperators.includes(token.trim())) {
                
                    PushToken(token)
                    continue
                }
                else if (jsUnaryOperators.includes(token.trim())) {
                
                    PushToken(token)
                    continue
                } else
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
                    trimmedToken.push(token)
            }
            else
                trimmedToken.push(token)
        }
    }

    function IdentiyTokens(token, symbol) {
        let splitted = token.split(symbol)
        for (let m = 0; m < (splitted.length + 1); m++) {
            if (splitted.length <= 2) {
                if (m == 0) {
                    PushToken(splitted[0])
                    continue
                }
                else if (m % 2 == 0) {
                    PushToken(splitted[m - 1])
                    continue
                } else if (m % 2 != 0) {
                    trimmedToken.push(symbol)
                    continue
                }
            } else {
                PushToken(splitted[m - 1])
                if (m != splitted.length && m != 0) {
                    trimmedToken.push(symbol)
                }
            }
        }
    }
    function PushToken(token) {
        if (token == undefined) { return }
        for (let n = 0; n <= token.length; n++) {
            if (token[n] != undefined && token.length > 1) {
                if (jsOperators.includes(token[n])) {
                    tok = token[n]
                    IdentiyTokens(token, tok)
                    return
                } else if (jsFunc.includes(token[n])) {
                    tok = token[n]
                    IdentiyTokens(token, tok)
                    return
                } else if (jsEOL.includes(token[n])) {
                    tok = token[n]
                    IdentiyTokens(token, tok)
                    return
                } else {
                }
            } else {
                trimmedToken.push(token)
                return
            }
        }
    }
}