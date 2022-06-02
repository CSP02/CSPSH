//importing PushToken method form PushTokens.js
import { PushToken } from './PushTokens.js'

//function that trims the tokens when the token 
//contains a symbol, and pushes to trimmedToken
function TrimTokens(token, symbol, lang, trimmedToken) {
    let splitted = token.split(symbol)
    for (let m = 0; m < (splitted.length + 1); m++) {
        if (splitted.length <= 2) {
            if (m == 0) {
                PushToken(splitted[0], lang, trimmedToken)
                continue
            }
            else if (m % 2 == 0) {
                PushToken(splitted[m - 1], lang, trimmedToken)
                continue
            } else if (m % 2 != 0) {
                trimmedToken.push(symbol)
                continue
            }
        } else {
            PushToken(splitted[m - 1], lang, trimmedToken)
            if (m != splitted.length && m != 0) {
                trimmedToken.push(symbol)
            }
        }
    }
}

export{TrimTokens}