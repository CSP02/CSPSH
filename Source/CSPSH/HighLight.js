//importing SyntaxHighlight method from SyntaxHighlihght.js
import { SyntaxHighlight } from './SyntaxHighlight.js'
import { IdentifyTokens } from './IdentifyTokens.js'

//main method which is splitted into sub methods with different fucntions or tasks
function HighLight(params) {
    let tokens = []
    let trimmedToken = []
    let trimmedTokens = []
    let lang = params.lang
    let code = params.code
    let codeContent = params.codeContent
    let codeHolder = params.codeHolder
    let lineCount = params.lineCount

    //splitting the content to seperate each word and symbol
    codeContent.split(' ').forEach(token => {
        if (token != '')
            tokens.push(token)
        else { }
    })

    //resetting the content inside the element with class .CSPSH
    codeHolder.innerHTML = ''

    //Identifies the tokens by detecting the type of the token
    IdentifyTokens(tokens, lang, trimmedToken)

    //another main instruction which will check if there are further tokens or symbols etc and seperates them
    trimmedToken.forEach(trimmedTok => {
        if (!Array.isArray(trimmedTok)) {
            trimmedTokens.push(trimmedTok)
        } else if (Array.isArray(trimmedTok)) {
            IdentifyTokens(trimmedTok)
        }
    })
    let codeAndLineCount = SyntaxHighlight(trimmedTokens, params, lang);
    code = codeAndLineCount.code
    lineCount = codeAndLineCount.lineCount
    tokens = []
    return codeAndLineCount
}

//export HighLight() function
export { HighLight }