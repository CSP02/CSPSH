//importing TrimTokens from TrimTokens.js
import { TrimTokens } from './TrimTokens.js'

//method that pushes tokens that are trimmed by TrimTokens method in TrimTokens.js
function PushToken(token, lang, trimmedToken) {
    //assigning lang tokens again
    const OPERATORS = lang.operators
    const EOL = lang.EOL
    const UNARYOPERATORS = []
    const TERNARYOPERATORS = lang.ternaryOperators
    const FUNCTIONS = lang.func
    const INDEX = lang.index
    const CURLYBRACES = lang.curlyBraces

    let tok
    if (token == undefined) { return } //return if the token is undefined
    if (TERNARYOPERATORS.includes(token)) {
        trimmedToken.push(token)
        return
    } else if (UNARYOPERATORS.includes(token)) {
        trimmedToken.push(token)
        return
    }
    //if the trimmed token has another symbol it has 
    //to trimmed again so the trimmed token will be furthur trimmed
    //untill it is no more a combination of symbols and words
    for (let n = 0; n <= token.length; n++) {
        if (token[n] != undefined && token.length > 1) {
            if (OPERATORS.includes(token[n])) {
                if (token[n] == '.' && !isNaN(token[n - 1]) && !isNaN(token[n + 1])) {
                    continue
                } else {
                    tok = token[n]
                    TrimTokens(token, tok, lang, trimmedToken)
                    return
                }
            } else if (FUNCTIONS.includes(token[n])) {
                tok = token[n]
                TrimTokens(token, tok, lang, trimmedToken)
                return
            } else if (INDEX.includes(token[n])) {
                tok = token[n]
                TrimTokens(token, tok, lang, trimmedToken)
                return
            } else if (EOL.includes(token[n])) {
                tok = token[n]
                TrimTokens(token, tok, lang, trimmedToken)
                return
            } else if (CURLYBRACES.includes(token[n])) {
                tok = token[n]
                TrimTokens(token, tok, lang, trimmedToken)
                return
            } else { }
        } else {
            trimmedToken.push(token)
            return
        }
    }
}

//exporting PushToken method
export { PushToken }