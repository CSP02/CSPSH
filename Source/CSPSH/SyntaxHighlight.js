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
        <div id="viewer_wrapper">
        <div class="lineCount-${theme.toUpperCase()}"></div>
        <div class="code"></div>
        </div>`
    let codeLang = codeHolder.lang
    if (codeLang == 'css') {
        properties = lang.properties
        values = lang.values
    }
    code = codeHolder.getElementsByClassName('code')[0]
    lineCountHolder = code.parentElement.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
    //looping through each token for highlighting
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        if (token === undefined) continue;
        if (codeLang !== 'html') {
            if (token == '{') {
                openBraceCount++;
            }
            if (tokens[i + 1] == '}') {
                openBraceCount--;
            }
        } else {
            if (token == '<' && tokens[i + 1] !== '/') {
                openBraceCount++;
                code.innerHTML += `<cspsh class="sh-${theme}-operator">${token}</cspsh>`;
                continue;
            }
            if (tokens[i + 1] == '</') {
                openBraceCount--;
            }
        }
        if (token === '\n') {
            code.appendChild(document.createElement('br'));
            code.innerHTML += `<cspsh class="cspsh-indentationGuidelines">${"&nbsp;&nbsp;&nbsp;&nbsp;"}</cspsh>`.repeat(openBraceCount);
            lineCount++;
            continue;
        }
        switch (token) {
            case KEYWORDS.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, `${token} `, theme, 'keyword');
                else
                    GenerateCSPSHTag(code, `${token}`, theme, 'keyword');
                break;
            case TYPES.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, `${token} `, theme, 'type');
                else
                    GenerateCSPSHTag(code, `${token}`, theme, 'keyword');
                break;
            case INDEX.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, `${token} `, theme, 'operator');
                else
                    GenerateCSPSHTag(code, `${token}`, theme, 'operator');
                break;
            case (token.includes('"') || token.includes("'") || token.includes('`')) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, `${token} `, theme, 'string');
                else
                    GenerateCSPSHTag(code, `${token}`, theme, 'string');
                break;
            case INBUILT.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, `${token} `, theme, 'inbuilt');
                else
                    GenerateCSPSHTag(code, `${token}`, theme, 'inbuilt');
                break;
            case UNARYOPERATORS.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, `${token} `, theme, 'operator');
                else
                    GenerateCSPSHTag(code, `${token}`, theme, 'operator');
                break;
            case TERNARYOPERATORS.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, ` ${token} `, theme, 'operator');
                else
                    GenerateCSPSHTag(code, `${token}`, theme, 'operator');
                break;
            case EOL.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, `${token} `, theme, 'operator');
                else
                    GenerateCSPSHTag(code, `${token}`, theme, 'operator');
                lineCount++
                break;
            default:
                if (codeLang == 'css') {
                    if (properties.includes(token)) {
                        GenerateCSPSHTag(code, `${token}`, theme, 'property');
                    } else if (values.includes(token)) {
                        GenerateCSPSHTag(code, `${token}`, theme, 'value');
                    }
                }
                if (token.startsWith('//')) {
                    GenerateCSPSHTag(code, `${token}`, theme, 'comment');
                }
                else if (!(/[A-Za-z0-9]/).test(token)) {
                    if (token === '</') {
                        GenerateCSPSHTag(code, `${token}`, theme, 'operator');
                        continue;
                    }
                    if (!(/[()\.[\]<>]/).test(token)) {
                        GenerateCSPSHTag(code, `${token} `, theme, 'operator');
                    } else
                        GenerateCSPSHTag(code, `${token}`, theme, 'operator');
                }
                else if (token.match(/^[0-9]+$/)) {
                    if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                        GenerateCSPSHTag(code, `${token} `, theme, 'numeral');
                    else
                        GenerateCSPSHTag(code, `${token}`, theme, 'numeral');
                }
                else {
                    if (token.includes('#')) {
                        GenerateCSPSHTag(code, `${token}`, theme, 'preprocess');
                        continue;
                    }
                    if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                        GenerateCSPSHTag(code, `${token} `, theme, 'variable');
                    else {
                        if (tokens[i + 1] === '(')
                            GenerateCSPSHTag(code, `${token}`, theme, 'Func');
                        else
                            GenerateCSPSHTag(code, `${token}`, theme, 'variable');
                    }
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

function GenerateCSPSHTag(code, token, theme, tokenType) {
    let cspshTag = document.createElement('cspsh');
    cspshTag.className = `sh-${theme}-${tokenType}`;
    cspshTag.innerText = token;
    code.appendChild(cspshTag);
}

//exorting SyntaxHighlight method
export { SyntaxHighlight }