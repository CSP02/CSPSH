//main fucntion that highlightes the js code
function SyntaxHighlight(tokens, params, lang) {
    const KEYWORDS = lang.keywords
    const EOL = lang.EOL
    const UNARYOPERATORS = []
    const TERNARYOPERATORS = lang.ternaryOperators
    const TYPES = lang.types
    const INDEX = lang.index
    const STRINGS = lang.string
    const INBUILT = lang.inBuilt

    let theme = params.theme
    let tempStr = params.tempStr
    let copySvg = params.copySvg
    let lineCountHolder = params.lineCountHolder
    let lineCount = params.lineCount
    let openBraceCount = params.openBraceCount
    let fileName = params.fileName
    let isEOLINFOR = params.isEOLINFOR
    let forCount = params.forCount
    let codeHolder = params.codeHolder
    let code = params.code
    //Creating the TopBar section where we can see the file name, 
    //copy to clipboard etc
    codeHolder.innerHTML += `
        <div class="copyHolder-${theme.toUpperCase()}">
        File Name: ${fileName}.${codeHolder.lang}
        </div><button class="copyVector">${copySvg}</button><br><br><br>
        <div class="lineCount-${theme.toUpperCase()}"></div><div class="code"></div>`
    let codeLang = codeHolder.lang
    code = codeHolder.getElementsByClassName('code')[0]
    let isMultiLnComment = false
    let isSingleLnComment = false
    lineCountHolder = code.parentElement.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
    //looping through each token for highlighting
    for (let i = 0; i <= tokens.length; i++) {
        let token = tokens[i]
        if (token == undefined || token == '') {
            //ignoring the null and undefined characters
            continue
        } else {
            token = token.replaceAll('\t', '').replaceAll(' ', '')
            //checking if its a for loop because ';' should be ignored in for looops other wise it will read as the default EOL token and adds a new line
            if (token == 'for') {
                forCount++
                isEOLINFOR = true
            } if (token.includes('#') && (codeLang == 'c' || codeLang == 'cpp')) {
                for (i; i <= tokens.length; i++) {
                    token = tokens[i]
                    code.innerHTML += `<span class="sh-${theme.toUpperCase()}-preprocess">${token}</span>`
                    if (token.includes('\n')) {
                        code.innerHTML += `<br>`
                        lineCount++
                        break
                    }
                }
                continue
            }
            if (token.includes('//') || isSingleLnComment) {
                code.innerHTML += `<span class="sh-${theme.toUpperCase()}-comments">${token} </span>`
                isSingleLnComment = true
                if (token.includes('\n')) {
                    code.innerHTML += `<br>`
                    lineCount++
                    isSingleLnComment = false
                }
                continue
            }
            //identifying the comments single line and multiline
            if (token.includes('/*') || isMultiLnComment) {
                code.innerHTML += `<span class="sh-${theme.toUpperCase()}-comments">${token} </span>`
                isMultiLnComment = true
                if (token.includes('\n')) {
                    code.innerHTML += `<br>`
                    lineCount++
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
                    //adding the copy to clipboard button and svg 
                    code.innerHTML += `<span class="sh-${theme.toUpperCase()}-types">${token} </span>`
                    break
                case KEYWORDS[KEYWORDS.indexOf(token)]:
                    code.innerHTML += `<span class="sh-${theme.toUpperCase()}-keyword">${token} </span>`
                    break
                case TERNARYOPERATORS[TERNARYOPERATORS.indexOf(token)]:
                    code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator"> ${token} </span>`
                    break
                case UNARYOPERATORS[UNARYOPERATORS.indexOf(token)]:
                    code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator"> ${token} </span>`
                    break
                case INBUILT[INBUILT.indexOf(token)]:
                    if (!(/[a-zA-Z]/).test(tokens[i + 1].charAt(0)))
                        code.innerHTML += `<span class="sh-${theme.toUpperCase()}-inBuilt">${token}</span>`
                    else
                        code.innerHTML += `<span class="sh-${theme.toUpperCase()}-inBuilt">${token} </span>`
                    break
                case EOL[EOL.indexOf(token)]:
                    if (tokens[i + 1] != undefined && tokens[i + 1].includes('\n')) {
                        i++;
                    }
                    if (!isEOLINFOR || forCount == 0)//checking if the EOL is in a for loop if yes we don't make a new line or else we use <br> to make a new line
                    {
                        code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token}</span><br>`
                        lineCount++;
                    }
                    else {
                        code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token} </span>`
                        continue
                    }
                    if (tokens[i + 2]) {
                        if (openBraceCount >= 0 && tokens[i + 2].includes('}')) {
                            openBraceCount--
                            if (openBraceCount <= 0)
                                openBraceCount = 0
                            //adding indentation guidelines the one you can see in many editors.
                            code.innerHTML += ('<i class="cspsh-indentationGuidelines" style="">&emsp;&emsp;&emsp;</i>').repeat(openBraceCount)
                        } else if (openBraceCount >= 0 && !tokens[i + 1].includes('}')) {
                            code.innerHTML += ('<i class="cspsh-indentationGuidelines" style="">&emsp;&emsp;&emsp;</i>').repeat(openBraceCount)
                        }
                    }
                    break
                default:
                    if (!isNaN(token))//checking if the token is a number
                        code.innerHTML += `<span class="sh-${theme.toUpperCase()}-numerals">${token}</span>`
                    //starting of string highlighting stuff
                    else if (token.includes('"') || token.includes("'") || token.includes('`')) {
                        if (STRINGS.includes(token.charAt(0)) && STRINGS.includes(token.charAt(token.length - 1)) && token.length != 1) {
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-string">${token}</span>`
                            break
                        }
                        tempStr = []
                        for (i; i < tokens.length; i++) {
                            token = tokens[i]
                            tempStr.push(token)
                            if (tokens[i + 1].includes('"') || tokens[i + 1].includes("'") || tokens[i + 1].includes('`')) {
                                tempStr.push(tokens[i + 1])
                                break
                            } else {
                                continue
                            }
                        }
                        let str = ''
                        tempStr.forEach(tempstr => {
                            str += ` ${tempstr}`
                        })
                        if (/[!@#$%^&*()_+\-=\[\]{};\\|,.<>\/?~]/.test(str)) {
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-string">${str.replace('undefined', '').replaceAll(' ', '')} </span>`
                        } else {
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-string">${str.replace('undefined', '')} </span>`
                        }
                        for (i; i < tokens.length; i++) {
                            let toke = tokens[i + 1]
                            if (toke == undefined || toke == '') { code.innerHTML += ' ' }
                            if (STRINGS.includes(toke.charAt(toke.length - 1)) || STRINGS.includes(toke)) {
                                i++
                                break
                            } else {
                                continue
                            }
                        }
                    }
                    //Ending of String highlighting stuff
                    else if (!/[a-z]/.test(token.charAt(0)) && /[A-Z]/.test(token.charAt(0)))
                        if (tokens[i - 1] == 'new' || tokens[i - 1] == 'class' || INBUILT[INBUILT.indexOf(token)])
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-class">${token}</span>`
                        else if (token.charAt(tokens[i + 1]) == '(')
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-Func">${token}</span>`
                        else
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-Variable">${token}</span>`
                    else if (token.includes('{') || token.includes('}')) {
                        if (token.includes('{')) {
                            openBraceCount++
                            forCount = 0
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token}</span>`
                        } else if (token.includes('}')) {
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token}</span>`
                        }
                    }
                    else if (!/[a-z]/.test(token) && !/[A-Z]/.test(token))
                        if (token.includes('(') || token.includes(')') || token.includes('.') || token.includes(','))
                            if (!token.includes(','))
                                code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token}</span>`
                            else
                                code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token} </span>`
                        else {
                            if (!isEOLINFOR)
                                if (INDEX[INDEX.indexOf(token)]) {
                                    if (token != ']' || !(/[a-zA-Z]/).test(tokens[i + 1].charAt(0)))
                                        code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token}</span>`
                                    else
                                        code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token} </span>`
                                }
                                else { code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator"> ${token} </span>` }
                            else
                                code.innerHTML += `<span class="sh-${theme.toUpperCase()}-operator">${token}</span>`
                        }
                    else {

                        if (token.includes('(') || tokens[i + 1] == '(' || tokens[i + 1].includes('(') || tokens[i + 2] == '(' || tokens[i + 2].includes('('))
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-Func">${token}</span>`
                        else
                            code.innerHTML += `<span class="sh-${theme.toUpperCase()}-variable">${token}</span>`
                    }
                    break
            }
        }
    }

    //return the updated code element
    return code
} // end of the main js highlighting function

//exorting SyntaxHighlight method
export {SyntaxHighlight}