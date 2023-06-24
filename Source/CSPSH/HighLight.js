//importing SyntaxHighlight method from SyntaxHighlihght.js
import { SyntaxHighlight } from './SyntaxHighlight.js'

//main method which is splitted into sub methods with different fucntions or tasks
function HighLight(params, options) {
    const lang = params.lang
    const codeLang = params.codeHolder.lang

    let tokens = []
    let code = params.code
    let codeContent = params.codeContent
    let codeHolder = params.codeHolder
    let lineCount = params.lineCount
    let token = ''

    //splitting the content to seperate each character and symbol
    const characters = codeContent.split('')
    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (!(/[A-Za-z0-9]/).test(char)) {
            tokens.push(token.trim());
            //adding the content untill there is \n for single line comments
            if (char === '/' && characters[i + 1] === '/') {
                for (i; i < characters.length; i++) {
                    const char = characters[i];
                    if (char === '\n') {
                        token += char;
                        tokens.push(token.trim());
                        token = ''
                        break;
                    } else {
                        token += char;
                    }
                }
            } else if (char === '"' || char === "'" || char === '`') {
                //adding the content untill there is the corresponding closing quote for strings
                const stringCloser = char;
                token = char
                i++;
                for (i; i < characters.length; i++) {
                    const char = characters[i];
                    if (char === stringCloser) {
                        token += char;
                        tokens.push(token.trim());
                        token = ''
                        break;
                    } else {
                        if (char !== undefined)
                            token += char;
                    }
                }
            } else {
                tokens.push(char);
                token = '';
            }
        }
        else {
            token += char;
        }
    }

    //resetting the content inside the element with class .CSPSH
    codeHolder.innerHTML = ''
    let replacedTokens = []
    //filter empty tokens
    if (codeLang !== 'py')
        replacedTokens = tokens.filter(token => token !== ' ' && token !== '' && token !== '\t');
    else
        [...tokens].forEach(token => {
            replacedTokens.push(token.replace(' ', ' '))
        })

    tokens = replacedTokens
    let optimisedTokens = []
    let tempToken = ''

    tokens = tokens.filter(token => token !== '')
    //optimising the tokens to append the consecutive symbols like ++, --, +=, -=, etc.
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (checkTernary(token) && checkTernary(tokens[i + 1])) {
            tempToken = token + tokens[i + 1];
            i++;
            optimisedTokens.push(tempToken);
        }
        else {
            tempToken = token;
            optimisedTokens.push(tempToken);
        }
    }
    tokens = optimisedTokens;

    optimisedTokens = []
    tempToken = ''
    //appending content for prepossor statements
    if (codeLang === 'c' || codeLang === 'cpp' || codeLang === 'css' || codeLang === "py") {
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const isCssSelector = (codeLang === 'css' && (token === '.' && !(/[0-9]/).test(tokens[i - 1])))
            if ((token === '#' || isCssSelector) && tokens[i - 1] !== ':') {
                for (i; i < tokens.length; i++) {
                    const token = tokens[i];
                    if (tokens[i + 1] === '>' || (codeLang === 'css' && tokens[i + 2] === '{') || (codeLang === 'py' && tokens[i + 2] === '\n')) {
                        tempToken += token + tokens[i + 1];
                        optimisedTokens.push(tempToken);
                        tempToken = '';
                        i++;
                        break;
                    } else {
                        tempToken += token;
                    }
                }
            } else {
                optimisedTokens.push(token);
            }
        }
    } else {
        optimisedTokens = tokens
    }
    //replacing < and > with &lt; and &gt; respectively to avoid conflict in browsers
    tokens = optimisedTokens.filter(token => token.replace('<', '&lt;').replace('>', '&gt;'))
    optimisedTokens = []
    tempToken = '';

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === '/*') {
            for (i; i < tokens.length; i++) {
                const token = tokens[i];
                if (tokens[i + 1] === '*/') {
                    tempToken += token + tokens[i + 1];
                    optimisedTokens.push(tempToken);
                    tempToken = '';
                    i++;
                    break;
                } else {
                    tempToken += token + ' ';
                }
            }
        } else {
            optimisedTokens.push(token);
        }
    }
    tokens = optimisedTokens
    let offset = 0

    if (codeLang === 'py') {
        let initialIndex = 0
        if (tokens[0] === '\n') {
            initialIndex = 1
        }
        for (let i = initialIndex; i < tokens.length; i++) {
            const token = tokens[i];
            if (!(/[/ /]/).test(token[0])) {
                break
            } else {
                offset++
            }
        }
    }
    optimisedTokens = []
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        if (token === '\n') {
            i += offset
        }
        optimisedTokens.push(token)
    }

    tempToken = ''
    tokens = []
    for (let i = 0; i < optimisedTokens.length; i++) {
        const opToken = optimisedTokens[i]
        if (opToken === ' ') {
            tempToken += opToken
        } else {
            tokens.push(tempToken)
            tokens.push(opToken)
            tempToken = ''
        }
    }

    tokens = tokens.filter(token => token !== '')

    let codeAndLineCount = SyntaxHighlight(tokens, params, lang, options);
    code = codeAndLineCount.code
    lineCount = codeAndLineCount.lineCount
    tokens = []
    return codeAndLineCount
}

//method to check if the character is a symbol or not(used while checking for ternary operators)
function checkTernary(char) {
    const symbols = ["-", "+", "<", "!", ">", "*", "=", "/"];
    let isTernary = false;
    for (let i = 0; i < symbols.length; i++) {
        let symbol = symbols[i];
        if (symbol === char) {
            isTernary = true;
            break;
        } else {
            isTernary = false;
            continue;
        }
    }

    return isTernary;
}

//export HighLight() function
export { HighLight }