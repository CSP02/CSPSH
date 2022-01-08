//importing all the tokens of each language
import { JSTOKENS } from './LangTokens/CSPSHJS.js'
import { CPPTOKENS } from './LangTokens/CSPSHCPP.js'
import { CTOKENS } from './LangTokens/CSPSHC.js'
import { JAVATOKENS } from './LangTokens/CSPSHJAVA.js'
// import { PYTOKENS } from './LangTokens/CSPSHPY.js'

//Initializing all the required variables and constants.
let clipboardText
let content = []
let openBraceCount = 0
let fileName
let isEOLINFOR
let forCount
let lang

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
        // content.push(code.innerHTML)
        if (code.className.includes('dark'))
            document.head.innerHTML += `<link rel="stylesheet" href="/Source/CSPSHDark.css">`
        else
            document.head.innerHTML += `<link rel="stylesheet" href="/Source/CSPSHLight.css">`
        let codeContent = code.innerHTML
        switch (code.lang) {
            case 'js':
                lang = new JSTOKENS()
                HighLight(code, codeContent, lang)
                lang = null
                break
            case 'cpp':
                lang = new CPPTOKENS()
                HighLight(code, codeContent, lang)
                lang = null
                break
            case 'c':
                lang = new CTOKENS()
                HighLight(code, codeContent, lang)
                lang = null
                break
            case 'java':
                lang = new JAVATOKENS()
                HighLight(code, codeContent, lang)
                lang = null
                break
        }
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
function HighLight(code, codeContent, lang) {
    let tokens = []
    let trimmedToken = []
    let trimmedTokens = []
    let operators = []
    let isOperator;

    const KEYWORDS = lang.keywords
    const OPERATORS = lang.operators

    const EOL = lang.EOL
    const UNARYOPERATORS = []
    const TERNARYOPERATORS = lang.ternaryOperators
    const TYPES = lang.types

    const FUNCTIONS = lang.func
    const INDEX = lang.index
    const CURLYBRACES = lang.curlyBraces
    const STRINGS = lang.string
    const INBUILT = lang.inBuilt
    //splitting the content to seperate each word and symbol
    codeContent.split(' ').forEach(token => {
        if (token != '')
            tokens.push(token)
        else { }
    })

    //resetting the content inside the element with class .CSPSH
    code.innerHTML = ''

    console.log(tokens)
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
    SyntaxHighlight(trimmedTokens);

    //main fucntion that highlightes the js code
    function SyntaxHighlight(tokens) {
        console.log(tokens)
        //Creating the TopBar section where we can see the file name, copy to clipboard etc
        code.innerHTML += `<div id="copyHolder">File Name: ${fileName}.${code.lang}<button class="copyVector"><div id="copy-cube"></div><div id="copy-cube2"></div></button><div id = "copiedPop" style="color:white;position:fixed;margin-left:90%;margin-top:3%;visibility:hidden;">copied</div></div><br><br><br>`
        let isMultiLnComment = false
        let isSingleLnComment = false
        //looping through each token for highlighting
        for (let i = 0; i <= tokens.length; i++) {
            let token = tokens[i]
            if (token == undefined || token == '') {
                //ignoring the null and undefined characters
                continue
            } else {
                //checking if its a for loop because ';' should be ignored in for looops other wise it will read as the default EOL token and adds a new line
                if (token == 'for') {
                    forCount++
                    isEOLINFOR = true
                } if (token.includes('#') && code.lang == 'c' || code.lang == 'c++' || code.lang == 'cpp') {
                    for (i; i <= tokens.length; i++) {
                        token = tokens[i]
                        code.innerHTML += `<span class="sh-${code.lang}-preprocess">${token}</span>`
                        if (token.includes('\n')) {
                            code.innerHTML += `<br>`
                            break
                        }
                    }
                    continue
                }
                if (token.includes('//') || isSingleLnComment) {
                    code.innerHTML += `<span class="sh-${code.lang}-comments">${token} </span>`
                    isSingleLnComment = true
                    if (token.includes('\n')) {
                        code.innerHTML += `<br>`
                        isSingleLnComment = false
                    }
                    continue
                }
                //identifying the comments single line and multiline
                if (token.includes('/*') || isMultiLnComment) {
                    code.innerHTML += `<span class="sh-${code.lang}-comments">${token} </span>`
                    isMultiLnComment = true
                    if (token.includes('\n')) {
                        code.innerHTML += `<br>`
                    }
                    if (token.includes('*/')) {
                        isMultiLnComment = false
                    }
                    continue
                }

                //ending of comments section
                //Highlighting starts here based on the splitted token
                switch (token) {
                    case TYPES[TYPES.indexOf(token)]:
                        code.innerHTML += `<span class="sh-${code.lang}-types">${token} </span>`
                        break
                    case KEYWORDS[KEYWORDS.indexOf(token)]:
                        code.innerHTML += `<span class="sh-${code.lang}-keyword">${token} </span>`
                        break
                    case TERNARYOPERATORS[TERNARYOPERATORS.indexOf(token)]:
                        code.innerHTML += `<span class="sh-${code.lang}-operator"> ${token}</span>`
                        break
                    case UNARYOPERATORS[UNARYOPERATORS.indexOf(token)]:
                        code.innerHTML += `<span class="sh-${code.lang}-operator"> ${token}</span>`
                        break
                    case EOL[EOL.indexOf(token)]:
                        if (tokens[i + 1] != undefined && tokens[i + 1].includes('\n')) {
                            i++;
                        }
                        if (!isEOLINFOR || forCount == 0)
                            code.innerHTML += `<span class="sh-${code.lang}-operator">${token}</span><br>`
                        else {
                            code.innerHTML += `<span class="sh-${code.lang}-operator">${token} </span>`
                            continue
                        }
                        if (tokens[i + 2]) {
                            if (openBraceCount >= 0 && tokens[i + 2].includes('}')) {
                                openBraceCount--
                                if (openBraceCount <= 0)
                                    openBraceCount = 0
                                code.innerHTML += ('<i class="cspsh-indentationGuidelines" style="">&emsp;&emsp;&emsp;</i>').repeat(openBraceCount)
                            } else if (openBraceCount >= 0 && !tokens[i + 1].includes('}')) {
                                code.innerHTML += ('<i class="cspsh-indentationGuidelines" style="">&emsp;&emsp;&emsp;</i>').repeat(openBraceCount)
                            }
                        }
                        break
                    default:
                        if (!isNaN(token))
                            code.innerHTML += `<span class="sh-${code.lang}-numerals">${token}</span>`
                        //starting of string highlighting stuff
                        else if (token.includes('"') || token.includes("'") || token.includes('`')) {
                            if (STRINGS.includes(token.charAt(0)) && STRINGS.includes(token.charAt(token.length - 1)) && token.length != 1) {
                                code.innerHTML += `<span class="sh-${code.lang}-string">${token}</span>`
                                break
                            }
                            code.innerHTML += `<span class="sh-${code.lang}-string"> ${token} </span>`
                            for (i; i < tokens.length; i++) {
                                let toke = tokens[i + 1]
                                if (toke == undefined || toke == '') { code.innerHTML += ' ' }
                                else
                                    if (STRINGS.includes(toke.charAt(toke.length - 1)) || STRINGS.includes(toke)) {
                                        code.innerHTML += `<span class="sh-${code.lang}-string"> ${toke} </span>`
                                        i++
                                        break
                                    } else {
                                        code.innerHTML += `<span class="sh-${code.lang}-string"> ${toke} </span>`
                                        continue
                                    }
                            }
                        }
                        //Ending of String highlighting stuf
                        else if (!/[a-z]/.test(token.charAt(0)) && /[A-Z]/.test(token.charAt(0)))
                            if (tokens[i - 1] == 'new' || tokens[i - 1] == 'class' || INBUILT)
                                code.innerHTML += `<span class="sh-${code.lang}-class">${token}</span>`
                            else
                                code.innerHTML += `<span class="sh-${code.lang}-Func">${token}</span>`
                        else if (token.includes('{') || token.includes('}')) {
                            if (token.includes('{')) {
                                openBraceCount++
                                forCount = 0
                                code.innerHTML += `<span class="sh-${code.lang}-operator">${token}</span>`
                            } else if (token.includes('}')) {
                                code.innerHTML += `<span class="sh-${code.lang}-operator">${token}</span>`
                            }
                        }
                        else if (!/[a-z]/.test(token) && !/[A-Z]/.test(token))
                            if (token.includes('(') || token.includes(')') || token.includes('.') || token.includes(','))
                                if (!token.includes(','))
                                    code.innerHTML += `<span class="sh-${code.lang}-operator">${token}</span>`
                                else
                                    code.innerHTML += `<span class="sh-${code.lang}-operator">${token} </span>`
                            else {
                                if (!isEOLINFOR)
                                    code.innerHTML += `<span class="sh-${code.lang}-operator"> ${token} </span>`
                                else
                                    code.innerHTML += `<span class="sh-${code.lang}-operator">${token}</span>`
                            }
                        else {
                            if (token.includes('(') || tokens[i + 1] == '(' || tokens[i + 1].includes('(') || tokens[i + 2] == '(' || tokens[i + 2].includes('('))
                                code.innerHTML += `<span class="sh-${code.lang}-Func">${token}</span>`
                            else
                                code.innerHTML += `<span class="sh-${code.lang}-variable">${token}</span>`
                        }
                        break
                }
            }
        }
    } // end of the main js highlighting function

    //fucntion that identifies the tokens furthur to detect the other operators like arthematic operators etc.
    function IdentifyTokens(tokens) {
        for (let k = 1; k <= tokens.length; k++) {
            let token = tokens[k]
            let tok
            if (token == undefined || token == '')
                return
            if (token.includes('for')) {

            }
            if (token.includes('&lt') || token.includes('&gt') && token.includes(';'))
                token = token.replaceAll('&lt', '<').replaceAll('&gt', ' >').replaceAll(';', '')
            if (token.length > 1) {
                if (token.includes('//')) {
                    trimmedToken.push(token)
                    continue
                }
                if (token.includes('/*') || token.includes('*/')) {
                    trimmedToken.push(token)
                    continue
                }
                if (TERNARYOPERATORS.includes(token)) {
                    PushToken(token)
                    continue
                }
                if (token.includes('#')) {
                    for (k; k <= tokens.length; k++) {
                        token = tokens[k]
                        trimmedToken.push(token)
                        if (token.includes('\n')) {
                            break
                        }
                    }
                    continue
                }
                for (let n = 0; n <= token.length; n++) {
                    if (token[n] != undefined) {
                        if (OPERATORS.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        } else if (FUNCTIONS.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        } else if (INDEX.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        } else if (EOL.includes(token[n])) {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        } else if (CURLYBRACES.includes(token[n])) {
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
        let tok
        if (token == undefined) { return }
        if (TERNARYOPERATORS.includes(token)) {
            trimmedToken.push(token)
            return
        } else if (UNARYOPERATORS.includes(token)) {
            trimmedToken.push(token)
            return
        }
        for (let n = 0; n <= token.length; n++) {
            if (token[n] != undefined && token.length > 1) {
                if (OPERATORS.includes(token[n])) {
                    tok = token[n]
                    TrimTokens(token, tok)
                    return
                } else if (FUNCTIONS.includes(token[n])) {
                    tok = token[n]
                    TrimTokens(token, tok)
                    return
                } else if (EOL.includes(token[n])) {
                    tok = token[n]
                    TrimTokens(token, tok)
                    return
                } else if (CURLYBRACES.includes(token[n])) {
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