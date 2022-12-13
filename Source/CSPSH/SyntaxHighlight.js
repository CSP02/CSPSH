//main fucntion that highlightes the js code
function SyntaxHighlight(tokens, params, lang, options) {
    const KEYWORDS = lang.keywords
    const EOL = lang.EOL
    const UNARYOPERATORS = []
    const TERNARYOPERATORS = lang.ternaryOperators
    const TYPES = lang.types
    const INDEX = lang.index
    const STRINGS = lang.string
    const INBUILT = lang.inBuilt
    const theme = params.theme
    const copySvg = params.copySvg
    const codeHolder = params.codeHolder
    const fileName = params.fileName

    let tempStr = params.tempStr
    let lineCountHolder = params.lineCountHolder
    let lineCount = params.lineCount
    let openBraceCount = params.openBraceCount
    let isEOLINFOR = params.isEOLINFOR
    let forCount = params.forCount
    let code = params.code
    let properties;
    let values;

    //Creating the TopBar section where we can see the file name,
    //copy to clipboard etc
    //adding the copy to clipboard button and svg 
    codeHolder.innerHTML += `
        <div class="copyHolder-${theme.toUpperCase()}">
        <div class="fileName">File Name: ${fileName}.${codeHolder.lang}</div><div class="changeTheme">
        Change Theme: <button id="drakula" class="themeChangers">Drakula</button>
        <button id="cspsh" class="themeChangers">CSPSH</button>
        <button id="monokai" class="themeChangers">Monokai</button>
        </div><div id="themeUsing">Current Theme: ${theme.toUpperCase()}</div>
        </div><button class="copyVector">${copySvg}</button><br><br><br>
        <div class="lineCount-${theme.toUpperCase()}"></div><div class="code"></div>`
    let codeLang = codeHolder.lang
    if (codeLang == 'css') {
        properties = lang.properties
        values = lang.values
    }
    code = codeHolder.getElementsByClassName('code')[0]
    let isMultiLnComment = false
    let isSingleLnComment = false
    lineCountHolder = code.parentElement.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
    //looping through each token for highlighting
    for (let i = 0; i <= tokens.length; i++) {
        // console.log(tokens)
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
            }
            if (token.includes('#') && (codeLang == 'c' || codeLang == 'cpp')) {//checking for include statements in c and cpp
                for (i; i <= tokens.length; i++) {
                    token = tokens[i]
                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-preprocess sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                    } else
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-preprocess">${token}</cspsh>`
                    if (token.includes('\n')) {
                        code.innerHTML += `<br>`
                        lineCount++
                        break
                    }
                }
                continue
            } else if (token.includes('#') && (codeLang == 'css')) {
                if (tokens[i + 1] <= 'f')
                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value">${token}</cspsh>`
                else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-idSelector">${token} </cspsh>`
                continue
            }
            if (token.includes('//') || isSingleLnComment) {//checking for inline comments
                if (!(/[a-zA-Z]/).test(token) || !(/[a-zA-Z]/).test(tokens[tokens.indexOf(token) + 1]))
                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-comments sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                    } else
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-comments">${token}</cspsh>`
                else
                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-comments sh-linehighlight">${token} </cspsh>`
                    } else
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-comments">${token} </cspsh>`
                isSingleLnComment = true
                if (token.includes('\n')) {
                    code.innerHTML += `<br>`
                    lineCount++
                    isSingleLnComment = false
                }
                continue
            }
            //identifying the comments single line and multiline
            if (token.includes('<') && tokens[i + 1].includes('!')) {
                let content = ''
                for (i; i < tokens.length; i++) {
                    token = tokens[i]
                    if (token == '>') {
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-comments">${token}</cspsh>`
                        break;
                    } else {
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-comments">${token}</cspsh>`
                    }
                }
                continue
            }
            if (token.includes('/*') || isMultiLnComment) {
                if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-comments sh-linehighlight">${token} </cspsh>`
                } else
                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-comments">${token} </cspsh>`
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
                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-types sh-${theme.toUpperCase()}-lineHighlight">${token} </cspsh>`
                    } else
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-types">${token} </cspsh>`
                    break
                case KEYWORDS[KEYWORDS.indexOf(token)]:
                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                        if (codeLang != 'html')
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-keyword sh-${theme.toUpperCase()}-lineHighlight">${token} </cspsh>`
                        else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-keyword sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                    } else
                        if (codeLang != 'html')
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-keyword">${token} </cspsh>`
                        else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-keyword">${token}</cspsh>`
                    break
                case TERNARYOPERATORS[TERNARYOPERATORS.indexOf(token)]:
                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight"> ${token} </cspsh>`
                    } else
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator"> ${token} </cspsh>`
                    break
                case UNARYOPERATORS[UNARYOPERATORS.indexOf(token)]:
                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight"> ${token} </cspsh>`
                    } else
                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator"> ${token} </cspsh>`
                    break
                case INBUILT[INBUILT.indexOf(token)]:
                    if (!(/[a-zA-Z]/).test(tokens[i + 1].charAt(0)))
                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-inBuilt sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                        } else
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-inBuilt"> ${token}</cspsh>`
                    else
                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                            if (codeLang != 'html') code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-inBuilt sh-${theme.toUpperCase()}-lineHighlight">${token} </cspsh>`
                            else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-inBuilt sh-${theme.toUpperCase()}-lineHighlight"> ${token} </cspsh>`
                        } else
                            if (codeLang != 'html') code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-inBuilt">${token} </cspsh>`
                            else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-inBuilt"> ${token} </cspsh>`
                    break
                case EOL[EOL.indexOf(token)]:
                    if (tokens[i + 1] != undefined && tokens[i + 1].includes('\n')) {
                        i++;
                    }
                    if (!isEOLINFOR || forCount == 0)//checking if the EOL is in a for loop if yes we don't make a new line or else we use <br> to make a new line
                    {
                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh><br>`
                        } else
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh><br>`
                        lineCount++;
                    }
                    else {
                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token} </cspsh>`
                        } else
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token} </cspsh>`
                        continue
                    }
                    if (tokens[i + 2]) {
                        if (openBraceCount >= 0 && tokens[i + 2].includes('}')) {
                            openBraceCount--
                            if (openBraceCount <= 0)
                                openBraceCount = 0
                            //adding indentation guidelines the one you can see in many editors.
                            if (options.highlightLine.includes(lineCount)) {
                                code.innerHTML += ('<i class="cspsh-indentationGuidelines sh-${theme.toUpperCase()}-lineHighlight" style="">&emsp;&emsp;&emsp;</i>').repeat(openBraceCount)
                            } else
                                code.innerHTML += ('<i class="cspsh-indentationGuidelines" style="">&emsp;&emsp;&emsp;</i>').repeat(openBraceCount)
                        } else if (openBraceCount >= 0 && !tokens[i + 1].includes('}')) {
                            if (options.highlightLine.includes(lineCount)) {
                                code.innerHTML += ('<i class="cspsh-indentationGuidelines sh-${theme.toUpperCase()}-lineHighlight" style="">&emsp;&emsp;&emsp;</i>').repeat(openBraceCount)
                            } else
                                code.innerHTML += ('<i class="cspsh-indentationGuidelines" style="">&emsp;&emsp;&emsp;</i>').repeat(openBraceCount)
                        }
                    }
                    break
                default:
                    if (!isNaN(token))//checking if the token is a number
                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-numerals sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                        } else
                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-numerals">${token}</cspsh>`
                    //starting of string highlighting stuff
                    else if (token.includes('"') || token.includes("'") || token.includes('`')) {
                        if (STRINGS.includes(token.charAt(0)) && STRINGS.includes(token.charAt(token.length - 1)) && token.length != 1) {
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-string sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-string">${token}</cspsh>`
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
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-string sh-${theme.toUpperCase()}-lineHighlight">${str.replace('undefined', '').replaceAll(' ', '')} </cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-string">${str.replace('undefined', '').replaceAll(' ', '')} </cspsh>`
                        } else {
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-string sh-${theme.toUpperCase()}-lineHighlight">${str.replace('undefined', '')} </cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-string">${str.replace('undefined', '')} </cspsh>`
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
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-class sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-class">${token}</cspsh>`
                        else if (token.charAt(tokens[i + 1]) == '(')
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-Func sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-Func">${token}</cspsh>`
                        else {
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-Variable sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-Variable">${token}</cspsh>`
                        }
                    else if (token.includes('{') || token.includes('}')) {
                        if (token.includes('{')) {
                            openBraceCount++
                            forCount = 0
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh>`
                        } else if (token.includes('}')) {
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh>`
                        }
                    }
                    else if (!/[a-z]/.test(token) && !/[A-Z]/.test(token)) {
                        if (token.includes('(') || token.includes(')') || token.includes('.') || token.includes(','))
                            if (token.includes('.') && codeLang.includes('css')) {
                                if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-classSelector sh-${theme.toUpperCase()}-lineHighlight">${tokens[tokens.indexOf(token) + 1]} </cspsh>`
                                } else {
                                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh>`
                                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-classSelector">${tokens[tokens.indexOf(token) + 1]} </cspsh>`
                                }
                                i++
                            }
                            else if (!token.includes(','))
                                if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                } else
                                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh>`
                            else
                                if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token} </cspsh>`
                                } else
                                    code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token} </cspsh>`
                        else {
                            if (!isEOLINFOR)
                                if (INDEX[INDEX.indexOf(token)]) {
                                    if (token != ']' || !(/[a-zA-Z]/).test(tokens[i + 1].charAt(0)))
                                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                        } else
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh>`
                                    else
                                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token} </cspsh>`
                                        } else
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token} </cspsh>`
                                }
                                else if (codeLang != 'css')
                                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight"> ${token} </cspsh>`
                                    } else
                                        if (codeLang != 'html') code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator"> ${token} </cspsh>`
                                        else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh>`
                                else
                                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator sh-${theme.toUpperCase()}-lineHighlight">${token} </cspsh>`
                                    } else
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token} </cspsh>`
                        }
                    }
                    else {
                        if (token.includes('(') || tokens[i + 1] == '(' || tokens[i + 1].includes('(') || tokens[i + 2] == '(' || tokens[i + 2].includes('('))
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-Func sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-Func">${token}</cspsh>`
                        else if (codeLang !== 'css')
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-variable sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                if (codeLang != 'html') code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-variable"> ${token}</cspsh>`
                                else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-text"> ${token}</cspsh>`
                        else if (codeLang === 'css' && tokens[i + 1] != ':') {
                            switch (token) {
                                case properties[properties.indexOf(token)]:
                                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-property sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                    } else
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-property">${token}</cspsh>`
                                    break;
                                case values[values.indexOf(token)]:
                                    if (tokens[i + 1] != ';')
                                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value sh-${theme.toUpperCase()}-lineHighlight"> ${token} </cspsh>`
                                        } else
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value"> ${token} </cspsh>`
                                    else
                                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                        } else
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value">${token}</cspsh>`
                                    break;
                                default:
                                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-variable sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                    } else
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-variable">${token}</cspsh>`
                                    break;
                            }
                        }
                        else if (codeLang == 'css') {
                            switch (token) {
                                case properties[properties.indexOf(token)]:
                                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-property sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                    } else
                                        code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-property">${token}</cspsh>`
                                    break;
                                case values[values.indexOf(token)]:
                                    if (tokens[i + 1] != ';')
                                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value sh-${theme.toUpperCase()}-lineHighlight">${token} </cspsh>`
                                        } else
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value">${token} </cspsh>`
                                    else
                                        if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                        } else
                                            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-value">${token}</cspsh>`
                                    break;
                                default:
                                    if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                        if (codeLang != 'html') code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-variable sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                        else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-text sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                    } else
                                        if (codeLang != 'html') code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-variable">${token}</cspsh>`
                                        else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-text">${token}</cspsh>`
                                    break;
                            }
                        }
                        else
                            if ((`${codeHolder.getAttribute('name')}.${codeHolder.getAttribute('lang')}` == options.file) && (options.highlightLine.includes(lineCount))) {
                                if (codeLang != 'html') code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-variable sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                                else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-text sh-${theme.toUpperCase()}-lineHighlight">${token}</cspsh>`
                            } else
                                if (codeLang != 'html') code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-variable">${token}</cspsh>`
                                else code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-text">${token}</cspsh>`
                    }
                    break
            }
        }
    }

    const codeAndLineCount = {
        code: code,
        lineCount: lineCount
    }
    //return the updated code element
    return codeAndLineCount
} // end of the main js highlighting function

//exorting SyntaxHighlight method
export { SyntaxHighlight }