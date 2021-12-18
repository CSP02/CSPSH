//Initializing all the required variables and constants.
let clipboardText
let content = []
let openBraceCount = 0
let fileName
let isEOLINFOR
let forCount
const jsTokens = ['new', 'undefined', 'null', 'if', 'for', 'continue', 'break', 'switch', 'case', 'else', 'return',
    'do', 'while']
const jsOperators = ['=', '+', '-', '*', '/', '.', ',', '<', '>']

const jsEOL = [';', '\n']
const jsUnaryOperators = []
const jsTernaryOperators = ['!=', '<=', '>=', '==', '++', '--', '===']
const jsKeywords = ['var', 'const', 'let', 'function']

const jsFunc = ['(', ')']
const jsIndex = ['[', ']']
const jsCurlyBraces = ['{', '}']
const jsString = ['"', "'", '`']
//Runs right after the page is loaded
window.onload = function () {
    let codes = document.getElementsByClassName('CSPSH');

    //Reads the required attributes and links the required stylesheets based on selected theme
    for (let i = 0; i < codes.length; i++) {
        let code = codes[i]
        fileName = code.getAttribute('name')
        if (!fileName) {
            fileName = `file`//sets default file name to file
        }
        content.push(code.innerHTML)
        if (code.className.includes('dark'))
            document.head.innerHTML += `<link rel="stylesheet" href="/Source/CSPSHDark.css">`
        else
            document.head.innerHTML += `<link rel="stylesheet" href="/Source/CSPSHLight.css">`
        let codeContent = code.innerHTML
        HighLight(code, codeContent)
    }
    //Copy to clipboard functionlity inside the HighLight() method
    const buttons = document.getElementsByClassName('copyVector')
    for (let j = 0; j < buttons.length; j++) {
        const button = buttons[j];
        button.addEventListener('click', function () {
            clipboardText = content[j]
            var inp = document.createElement("textarea")
            document.body.appendChild(inp)
            inp.value = clipboardText.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
            inp.select()
            document.execCommand("Copy");
            document.body.removeChild(inp)
            document.getElementById('copy-cube').style.backgroundColor = 'rgba(0, 100, 0, 0.6)'
            document.getElementById('copy-cube2').style.backgroundColor = 'rgb(0, 100, 0)'
            document.getElementById('copiedPop').style.visibility = 'visible'
            setTimeout(function () { document.getElementById('copiedPop').style.visibility = 'hidden' }, 2000)
        })
    }
}


//main method which is splitted into sub methods with different fucntions or tasks
function HighLight(code, codeContent) {
    let tokens = []
    let trimmedToken = []
    let trimmedTokens = []
    let operators = []
    let isOperator;
    //splitting the content to seperate each word and symbol
    codeContent.split(' ').forEach(token => {
        if (token != '')
            tokens.push(token)
        else { }
    })

    //resetting the content inside the element with class .CSPSH
    code.innerHTML = ''

    //Identifies the tokens by detecting the type of the token
    IdentifyTokens(tokens)


    //another main instruction which will check if there are further tokens or symbols etc and seperates them
    trimmedToken.forEach(trimmedTok => {
        if (!Array.isArray(trimmedTok)) {
            trimmedTokens.push(trimmedTok)
        } else if (Array.isArray(trimmedTok)) {
            IdentifyTokens(trimmedTok)
        }
    })

    //A switch statement which highlightes the code based on the lang attribues right now it is confined to js will release for all lands soon
    switch (code.lang) {
        case 'js':
            JSSyntaxHighlight(trimmedTokens);
            break
    }

    //main fucntion that highlightes the js code
    function JSSyntaxHighlight(tokens) {
        //Creating the TopBar section where we can see the file name, copy to clipboard etc
        code.innerHTML += `<div id="copyHolder">File Name: ${fileName}.${code.lang}<button class="copyVector"><div id="copy-cube"></div><div id="copy-cube2"></div></button><div id = "copiedPop" style="color:white;position:fixed;margin-left:90%;margin-top:3%;visibility:hidden;">copied</div></div><br><br><br>`
        let isComment = false
        //looping through each token for highlighting
        for (i = 0; i <= tokens.length; i++) {
            let token = tokens[i]
            if (token == undefined || token == '') {//ignoring the null and undefined characters
                continue
            } else {
                //checking if its a for loop because ';' should be ignored in for looops other wise it will read as the default EOL token and adds a new line
                if (token == 'for') {
                    forCount++
                    isEOLINFOR = true
                }
                //identifying the comments single line and multiline
                if (token.includes('/*') || isComment) {
                    code.innerHTML += `<span class="sh-comments">${token} </span>`
                    isComment = true
                    if (token.includes('\n')) {
                        code.innerHTML += `<br>`
                    }
                    if (token.includes('*/')) {
                        isComment = false
                    }
                    continue
                }
                if (token.includes('//') || isComment) {
                    code.innerHTML += `<span class="sh-comments">${token} </span>`
                    isComment = true
                    if (token.includes('\n')) {
                        code.innerHTML += `<br>`
                        isComment = false
                    }
                    continue
                }
                //ending of comments section
                //Highlighting starts here based on the splitted token
                switch (token) {
                    case jsKeywords[jsKeywords.indexOf(token)]:
                        code.innerHTML += `<span class="sh-keyword">${token} </span>`
                        break
                    case jsTokens[jsTokens.indexOf(token)]:
                        code.innerHTML += `<span class="sh-token">${token} </span>`
                        break
                    case jsTernaryOperators[jsTernaryOperators.indexOf(token)]:
                        code.innerHTML += `<span class="sh-operator"> ${token}</span>`
                        break
                    case jsUnaryOperators[jsUnaryOperators.indexOf(token)]:
                        code.innerHTML += `<span class="sh-operator"> ${token}</span>`
                        break
                    case jsEOL[jsEOL.indexOf(token)]:
                        if (tokens[i + 1] != undefined && tokens[i + 1].includes('\n')) {
                            i++;
                        }
                        if (!isEOLINFOR || forCount == 0)
                            code.innerHTML += `<span class="sh-operator">${token}</span><br>`
                        else {
                            code.innerHTML += `<span class="sh-operator">${token} </span>`
                            continue
                        }
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
                        //starting of string highlighting stuff
                        else if (token.includes('"') || token.includes("'") || token.includes('`')) {
                            if (jsString.includes(token.charAt(0)) && jsString.includes(token.charAt(token.length - 1)) && token.length != 1) {
                                code.innerHTML += `<span class="sh-string">${token}</span>`
                                break
                            }
                            code.innerHTML += `<span class="sh-string"> ${token} </span>`
                            for (i; i < tokens.length; i++) {
                                let toke = tokens[i + 1]
                                if (toke == undefined || toke == '') { code.innerHTML += ' ' }
                                else
                                    if (jsString.includes(toke.charAt(toke.length - 1)) || jsString.includes(toke)) {
                                        code.innerHTML += `<span class="sh-string"> ${toke} </span>`
                                        i++
                                        break
                                    } else {
                                        code.innerHTML += `<span class="sh-string"> ${toke} </span>`
                                        continue
                                    }
                            }
                        }
                        //Ending of String highlighting stuf
                        else if (!/[a-z]/.test(token.charAt(0)) && /[A-Z]/.test(token.charAt(0)))
                            if (tokens[i - 1] == 'new')
                                code.innerHTML += `<span class="sh-class">${token}</span>`
                            else
                                code.innerHTML += `<span class="sh-Func">${token}</span>`
                        else if (token.includes('{') || token.includes('}')) {
                            if (token.includes('{')) {
                                openBraceCount++
                                forCount = 0
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
                            else {
                                if (!isEOLINFOR)
                                    code.innerHTML += `<span class="sh-operator"> ${token} </span>`
                                else
                                    code.innerHTML += `<span class="sh-operator">${token}</span>`
                            }
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

    //fucntion that identifies the tokens furthur to detect the other operators like arthematic operators etc.
    function IdentifyTokens(tokens) {
        for (k = 1; k <= tokens.length; k++) {
            let token = tokens[k]
            let tok
            if (token == undefined || token == '')
                return
            if (token.includes('for')) {

            }
            if (token.includes('&lt') || token.includes('&gt') && token.includes(';'))
                token = token.replace('&lt', '<').replace('&gt', ' >').replace(';', '')
            if (token.length > 1) {
                if (token.includes('//')) {
                    trimmedToken.push(token)
                    continue
                }
                if (token.includes('/*') || token.includes('*/')) {
                    trimmedToken.push(token)
                    continue
                }
                if (jsTernaryOperators.includes(token)) {
                    PushToken(token)
                    continue
                }
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
                        } else if (jsIndex.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        } else if (jsEOL.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        } else if (jsCurlyBraces.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        }
                        else {
                            isOperator = false
                        }
                    }
                }
                if (isOperator)
                    TrimTokens(token, tok)
                else
                    trimmedToken.push(token)
            }
            else
                trimmedToken.push(token)
        }
    }

    function TrimTokens(token, symbol) {
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
        if (jsTernaryOperators.includes(token)) {
            trimmedToken.push(token)
            return
        } else if (jsUnaryOperators.includes(token)) {
            trimmedToken.push(token)
            return
        }
        for (let n = 0; n <= token.length; n++) {
            if (token[n] != undefined && token.length > 1) {
                if (jsOperators.includes(token[n])) {
                    tok = token[n]
                    TrimTokens(token, tok)
                    return
                } else if (jsFunc.includes(token[n])) {
                    tok = token[n]
                    TrimTokens(token, tok)
                    return
                } else if (jsEOL.includes(token[n])) {
                    tok = token[n]
                    TrimTokens(token, tok)
                    return
                } else if (jsCurlyBraces.includes(token[n])) {
                    tok = token[n]
                    TrimTokens(token, tok)
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