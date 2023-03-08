//importing SyntaxHighlight method from SyntaxHighlihght.js
import { SyntaxHighlight } from './SyntaxHighlight.js'

//main method which is splitted into sub methods with different fucntions or tasks
function HighLight(params, options) {
    const lang = params.lang

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
    //filter empty tokens
    tokens = tokens.filter(token => token !== ' ' && token !== '' && token !== '\t');
    let optimisedTokens = []
    let tempToken = ''

    //optimising the tokens to append the consecutive symbols like ++, --, +=, -=, etc.
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (checkTernary(token) && checkTernary(tokens[i + 1])) {
            // console.log(token);
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
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === '#') {
            for (i; i < tokens.length; i++) {
                const token = tokens[i];
                if (tokens[i + 1] === '>') {
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
    //replacing < and > with &lt; and &gt; respectively to avoid conflict in browsers
    tokens = optimisedTokens.filter(token => token.replace('<', '&lt;').replace('>', '&gt;'))
    optimisedTokens = []
    tempToken = '';

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === '/*') {
            for (i; i < tokens.length; i++) {
                const token = tokens[i];
                if(tokens[i+1] === '*/'){
                    tempToken += token + tokens[i+1];
                    optimisedTokens.push(tempToken);
                    tempToken = '';
                    i++;
                    break;
                }else{
                    tempToken += token + ' ';
                }
            }
        }else{
            optimisedTokens.push(token);
        }
    }
    tokens = optimisedTokens
    
    let codeAndLineCount = SyntaxHighlight(tokens, params, lang, options);
    code = codeAndLineCount.code
    lineCount = codeAndLineCount.lineCount
    tokens = []
    return codeAndLineCount
}

//method to check if the character is a symbol or not(used while checking for ternary operators)
function checkTernary(char) {
    const symbols = ["-", "+", "<", "!", ">", "*", "=", "/"];
    let bool = false;
    for (let i = 0; i < symbols.length; i++) {
        let symbol = symbols[i];
        if (symbol === char) {
            bool = true;
            break;
        } else {
            bool = false;
            continue;
        }
    }

    return bool;
}

//export HighLight() function
export { HighLight }