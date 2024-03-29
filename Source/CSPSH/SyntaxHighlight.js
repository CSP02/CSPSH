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
    const extension = params.codeHolder.lang

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
            <div class="fileName">File Name: ${fileName}.${codeHolder.lang}</div>
            <div class="changeTheme">
                Theme:
                <select class="theme_selectors">
                    <option value="drakula">Drakula</option>
                    <option value="cspsh">CSPSH</option>
                    <option value="monokai">Monokai</option>
                </select>
            </div>
            <div>
                <label for="retro_${codeHolder.getAttribute("name")}_${codeHolder.lang}" style="display: flex;align-items: center;">Retro effect
                    <input type="checkbox" class="retro_effect" name="retro_in" id="retro_${codeHolder.getAttribute("name")}_${codeHolder.lang}"/><span class="customCheckbox"><div id="circle"></div></span>
                </label>
            </div>
        </div>
        <div class="copy_vector_holder"><button class="copyVector">${copySvg}</button></div><br><br><br>
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
        if (codeLang === 'py') {
            if (token.startsWith(' ')) {
                GenerateCSPSHTag(code, extension, lineCount, token, params, theme, options.highlightLine, options.file, 'indentationGuidelines');
                continue;
            }
        }
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

        if (EOL.includes(token) && !EOL.includes(tokens[i + 1])) {
            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh>`
            code.appendChild(document.createElement('br'));
            code.innerHTML += `<cspsh class="cspsh-indentationGuidelines">${"&nbsp;&nbsp;&nbsp;&nbsp;"}</cspsh>`.repeat(openBraceCount);
            lineCount++;
            continue;
        } else if (EOL.includes(token) && !EOL.includes(tokens[i + 1])) {
            code.innerHTML += `<cspsh class="sh-${theme.toUpperCase()}-operator">${token}</cspsh>`
            code.appendChild(document.createElement('br'));
            code.innerHTML += `<cspsh class="cspsh-indentationGuidelines">${"&nbsp;&nbsp;&nbsp;&nbsp;"}</cspsh>`.repeat(openBraceCount);
            lineCount++;
            i++;
            continue;
        }
        switch (token) {
            case KEYWORDS.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'keyword');
                else
                    GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'keyword');
                break;
            case TYPES.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'type');
                else
                    GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'keyword');
                break;
            case INDEX.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'operator');
                else
                    GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'operator');
                break;
            case (token.includes('"') || token.includes("'") || token.includes('`')) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'string');
                else
                    GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'string');
                break;
            case INBUILT.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'inbuilt');
                else
                    GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'inbuilt');
                break;
            case UNARYOPERATORS.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'operator');
                else
                    GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'operator');
                break;
            case TERNARYOPERATORS.includes(token) ? token : undefined:
                if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                    GenerateCSPSHTag(code, extension, lineCount, ` ${token} `, params, theme, options.highlightLine, options.file, 'operator');
                else
                    GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'operator');
                break;
            default:
                if (codeLang == 'css') {
                    if (properties.includes(token)) {
                        GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'property');
                        continue;
                    } else if (values.includes(token)) {
                        GenerateCSPSHTag(code, extension, lineCount, ` ${token}`, params, theme, options.highlightLine, options.file, 'value');
                        continue;
                    }
                }
                if (token.startsWith('//') || token.startsWith('/*')) {
                    GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'comment');
                }
                else if (!(/[A-Za-z0-9]/).test(token)) {
                    if (token === '</') {
                        GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'operator');
                        continue;
                    }
                    if (!(/[()\.[\]<>]/).test(token)) {
                        GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'operator');
                    } else
                        GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'operator');
                }
                else if (token.match(/^[0-9]+$/)) {
                    if (!(/[()\.[\],;<>]/).test(tokens[i + 1]))
                        GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'numeral');
                    else
                        GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'numeral');
                }
                else {
                    if (token.includes('#')) {
                        if (codeLang === 'css') {
                            GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'idSelector');
                            continue;
                        }
                        if (codeLang === "py") {
                            GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'comment');
                            continue;
                        }
                        GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'preprocess');
                        continue;
                    }
                    if (!(/[()\.[\],;<>]/).test(tokens[i + 1])) {
                        if (codeLang === "css" && token.includes('.')) {
                            GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'classSelector');
                            continue;
                        }
                        GenerateCSPSHTag(code, extension, lineCount, `${token} `, params, theme, options.highlightLine, options.file, 'variable');
                    }
                    else {
                        if (tokens[i + 1] === '(')
                            GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'Func');
                        else {
                            if (tokens[i - 1] === '#') {
                                GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'cssColor');
                                continue;
                            }
                            GenerateCSPSHTag(code, extension, lineCount, `${token}`, params, theme, options.highlightLine, options.file, 'variable');
                        }
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

function GenerateCSPSHTag(code, extension, lineCount, token, params, theme, highlightLines, files, tokenType) {
    let cspshTag = document.createElement('cspsh');
    const fileName = params.fileName
    const codeLang = params.codeHolder.lang
    if (codeLang === 'css' && token.trim() !== ':') {
        token = token.trim();
    }
    const FileAndLinehighlight = new Map();
    [...files].forEach((file, i) => {
        FileAndLinehighlight.set(file, highlightLines[i])
    });
    const lines = FileAndLinehighlight.get(`${fileName}.${extension}`)
    if(lines && lines.includes(lineCount)){
        cspshTag.className += `sh-${theme}-${tokenType} sh-${theme.toUpperCase()}-lineHighlight`
    }else{
        cspshTag.className = `sh-${theme}-${tokenType}`;
    }
    if (codeLang === 'py' && (/[a-zA-Z0-9-\./|?!@#$%^&*()_+={}[\]~`:;"'<,>]/).test(token)) {
        token = token.trim()
    }
    if (codeLang === 'py')
        cspshTag.innerHTML = token.replace(/ /g, '&nbsp;').trim();
    else
        cspshTag.innerText = token;
    code.appendChild(cspshTag);
}

//exorting SyntaxHighlight method
export { SyntaxHighlight }