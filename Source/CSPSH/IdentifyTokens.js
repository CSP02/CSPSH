//importing TrimTokens from TrimTokens.js
import { TrimTokens } from './TrimTokens.js'

//fucntion that identifies the tokens furthur to detect the other operators like arthematic operators etc.
function IdentifyTokens(tokens, lang, trimmedToken, codeHolder) {
    //assigning language tokens
    const OPERATORS = lang.operators
    const EOL = lang.EOL
    const UNARYOPERATORS = []
    const TERNARYOPERATORS = lang.ternaryOperators
    const FUNCTIONS = lang.func
    const INDEX = lang.index
    const CURLYBRACES = lang.curlyBraces

    let operators = []
    let isOperator;

    //pushing the tokens which is a single word and which doesnt contain any symbols(=, +, -, etc.)
    for (let k = 0; k <= tokens.length; k++) {
        let token = tokens[k]
        let tok
        if (token == undefined || token == '' || token.startsWith('</'))
            //if token is undefined or null or contains </ because google chrome adds the missing close tags. 
            //but in c and c++ we use #include < studio.h > or in some other langs which should be removed.
            return
        if (token.includes('for')) {
            //if token is a for loop it should neglect the ; and highlihgt tokens inside it.
        }
        if (token.includes('&lt') || token.includes('&gt') && token.includes(';'))
            token = token.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll(';', '')
        if (token == '=>') {
            trimmedToken.push('=>')
            continue
        }
        if (TERNARYOPERATORS.includes(token)) {
            trimmedToken.push(token)
            continue
        }
        if (UNARYOPERATORS.includes(token)) {
            trimmedToken.push(token)
            continue
        }
        if (token.length > 1) {
            if (token.includes('//')) {
                trimmedToken.push(token)
                continue
            }
            if (token.includes('/*') || token.includes('*/')) {
                trimmedToken.push(token)
                continue
            }
            if (token.includes('#') && codeHolder.lang != 'css') {
                for (k; k <= tokens.length; k++) {
                    token = tokens[k]
                    trimmedToken.push(token.replaceAll('<', '&lt;'))
                    if (token.includes('\n')) {
                        break
                    }
                }
                continue
            }
            //detecting the tokens and operators to split.
            for (let n = 0; n <= token.length; n++) {
                if (token[n] != undefined) {
                    if (OPERATORS.includes(token[n])) {
                        if (token[n] == '.' && !isNaN(token[n - 1]) && !isNaN(token[n + 1])) {
                            continue
                        } else {
                            tok = token[n]
                            isOperator = true
                            operators.push(tok)
                            break
                        }
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
                TrimTokens(token, tok, lang, trimmedToken)
            else
                trimmedToken.push(token)
        }
        else
            trimmedToken.push(token)
    }
}

//export IdentifyTokens
export {IdentifyTokens}