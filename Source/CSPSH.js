//importing all the tokens of each language
import { JSTOKENS } from './LangTokens/CSPSHJS.js'
import { CPPTOKENS } from './LangTokens/CSPSHCPP.js'
import { CTOKENS } from './LangTokens/CSPSHC.js'
import { JAVATOKENS } from './LangTokens/CSPSHJAVA.js'
import { SSTOKENS } from './LangTokens/CSPSHSS.js'

//importing other files that required cspsh
import { HighLight } from './CSPSH/HighLight.js'

//Initializing all the required variables and constants.
let clipboardText
let content = []
let openBraceCount = 0
let fileName
let isEOLINFOR
let forCount
let lang
let mode = 'dark'
let theme = 'cspsh'
let themesList = []
let tempStr = []
let copySvg
let lineCountHolder
let lineCount = 0
let code
let params
let links = [...document.head.getElementsByTagName('link')]
let codeAndLineCount
let className
//the following block will move the user's css to the down
for (let h = 0; h < links.length; h++) {
    let link = links[h]
    link.parentElement.removeChild(link)
}
const CopySvg = `
<svg width="27.5" height="30" xmlns="http://www.w3.org/2000/svg" class="CSPSHsvg">
    <polyline points="10 7.5, 2.5 7.5, 2.5 28, 20 28, 20 26.5, 10 26.5, 10 7.5" fill ="black" 
        stroke="black" stroke-linecap="round" stroke-width="5" 
        stroke-linejoin="round" id="blackLine"/>
    <polyline points="15 2.5, 7.5 2.5, 7.5 23, 25 23, 25 2.5, 15 2.5" fill="grey" stroke="grey" stroke-linecap="round"
        stroke-width="5" stroke-linejoin="round" id="greyLine"/>
</svg>`

window.onload = function () {
    const cspsh = new CSPSH
    cspsh.highlight()
}

export class CSPSH {
    //Runs right after the page is loaded
    highlight() {
        let codes = document.getElementsByClassName('CSPSH');
        //Reads the required attributes and links the required stylesheets based on selected theme
        for (let i = 0; i < codes.length; i++) {
            let codeHolder = codes[i]
            fileName = codeHolder.getAttribute('name')
            codeHolder.className += ` ${codeHolder.getAttribute('theme').toUpperCase()}`
            if (codeHolder.getAttribute('theme') && !themesList.includes(codeHolder.getAttribute('theme'))) {
                theme = codeHolder.getAttribute('theme')
                themesList.push(theme)
                document.head.innerHTML += `<link rel="stylesheet" href="/Source/ThemeStyles/${theme.toUpperCase()}${mode.toUpperCase()}.css">`
            } else
                theme = codeHolder.getAttribute('theme')
            if (!fileName) {
                fileName = `file`//sets default file name to file
            }
            //push all the code content.
            content.push(codeHolder.innerHTML)
            let codeContent = codeHolder.innerHTML
            //Detect the language and start highlighting
            switch (codeHolder.lang) {
                case 'js' || 'ts':
                    lang = new JSTOKENS()
                    lineCount = 0
                    codeAndLineCount = HighLight(SetParams(params, codeHolder, codeContent))
                    code = codeAndLineCount.code;
                    lineCount = codeAndLineCount.lineCount
                    lineCountHolder = document.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
                    className = lineCountHolder.className
                    lineCountHolder.className = `lineCount-${theme.toUpperCase()}-done`;
                    if (codeHolder.getAttribute('linecount') == 'true')
                        DisplayLineCount(lineCountHolder, lineCount)
                    ReplaceDIVWithCode(codeHolder, code)
                    code = null
                    lineCount = null
                    lang = null
                    break
                case 'cpp':
                    lang = new CPPTOKENS()
                    lineCount = 0
                    codeAndLineCount = HighLight(SetParams(params, codeHolder, codeContent))
                    code = codeAndLineCount.code;
                    lineCount = codeAndLineCount.lineCount
                    lineCountHolder = document.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
                    className = lineCountHolder.className
                    lineCountHolder.className = `lineCount-${theme.toUpperCase()}-done`;
                    if (codeHolder.getAttribute('linecount') == 'true')
                        DisplayLineCount(lineCountHolder, lineCount)
                    ReplaceDIVWithCode(codeHolder, code)
                    lang = null
                    code = null
                    lineCount = null
                    break
                case 'c':
                    lang = new CTOKENS()
                    lineCount = 0
                    codeAndLineCount = HighLight(SetParams(params, codeHolder, codeContent))
                    code = codeAndLineCount.code;
                    lineCount = codeAndLineCount.lineCount
                    lineCountHolder = document.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
                    className = lineCountHolder.className
                    lineCountHolder.className = `lineCount-${theme.toUpperCase()}-done`;
                    if (codeHolder.getAttribute('linecount') == 'true')
                        DisplayLineCount(lineCountHolder, lineCount)
                    ReplaceDIVWithCode(codeHolder, code)
                    lang = null
                    code = null
                    lineCount = null
                    break
                case 'java' || 'c#':
                    lang = new JAVATOKENS()
                    lineCount = 0
                    codeAndLineCount = HighLight(SetParams(params, codeHolder, codeContent))
                    code = codeAndLineCount.code;
                    lineCount = codeAndLineCount.lineCount
                    lineCountHolder = document.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
                    className = lineCountHolder.className

                    lineCountHolder.className = `lineCount-${theme.toUpperCase()}-done`;
                    if (codeHolder.getAttribute('linecount') == 'true')
                        DisplayLineCount(lineCountHolder, lineCount)
                    ReplaceDIVWithCode(codeHolder, code)
                    lang = null
                    code = null
                    lineCount = null
                    break
                case 'sts':
                    lang = new SSTOKENS()
                    lineCount = 0
                    codeAndLineCount = HighLight(SetParams(params, codeHolder, codeContent))
                    code = codeAndLineCount.code;
                    lineCount = codeAndLineCount.lineCount
                    lineCountHolder = document.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
                    className = lineCountHolder.className
                    lineCountHolder.className = `lineCount-${theme.toUpperCase()}-done`;
                    if (codeHolder.getAttribute('linecount') == 'true')
                        DisplayLineCount(lineCountHolder, lineCount)
                    ReplaceDIVWithCode(codeHolder, code)
                    lang = null
                    code = null
                    lineCount = null
                    break
            }
        }
        links.forEach(link => {
            document.head.appendChild(link)
        })
        //Copy to clipboard functionlity inside the HighLight() method
        const buttons = document.getElementsByClassName('copyVector')
        const CSPSHsvgs = document.getElementsByClassName('CSPSHsvg')
        for (let j = 0; j < buttons.length; j++) {
            const button = buttons[j];
            button.addEventListener('click', function () {
                clipboardText = content[j]
                copySvg = CSPSHsvgs[j]
                var inp = document.createElement("textarea")
                document.body.appendChild(inp)
                inp.value = clipboardText.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
                inp.select()
                document.execCommand("Copy");
                document.body.removeChild(inp)
                copySvg.innerHTML = `<polyline points="11 13.5, 13.5 17.5, 22.5 10" fill="transparent" stroke="green" stroke-linecap="round"
            stroke-width="3" stroke-linejoin="round"/>`
                setTimeout(function () {
                    copySvg.innerHTML = CopySvg
                }, 2000)
            })
        }
        //End of copy to clipboard functionality
        //start of theme changing
        const themeChangers = [...document.getElementsByClassName('themeChangers')];
        themeChangers.forEach(themeChanger => {
            themeChanger.addEventListener('click', click => {
                click.path[1].className = `themeusing${click.srcElement.id}`;
                click.path[2].className = `copyHolder-${click.srcElement.id}`;
                click.path[3].className = `CSPSH ${click.srcElement.id.toUpperCase()}`;
                const theme = click.srcElement.parentElement.parentElement.parentElement.getAttribute('theme');
                const spans = [...click.srcElement.parentElement.parentElement.parentElement.getElementsByTagName('span')]
                const divs = [...click.srcElement.parentElement.parentElement.parentElement.getElementsByTagName('div')]
                divs.forEach(div => {
                    div.className = div.className.replaceAll(`${theme.toUpperCase()}`, `${click.srcElement.id.toUpperCase()}`);
                })
                spans.forEach(span => {
                    span.className = span.className.replaceAll(`${theme.toUpperCase()}`, `${click.srcElement.id.toUpperCase()}`);
                })
                const mainHolder = click.path[3]
                mainHolder.setAttribute('theme', click.srcElement.id);
                click.srcElement.parentElement.nextSibling.innerText = 'Current Theme: ' + click.srcElement.id.toUpperCase()
            })
        })
        //end of theme changing
    }
}

function DisplayLineCount(lineCountHolder, lineCount) {
    for (var line = 1; line < lineCount; line++) {
        lineCountHolder.innerHTML += `<span>&nbsp;${line} </br></span>`
    }
    return
}
function ReplaceDIVWithCode(codeHolder, code) {
    codeHolder.innerHTML += `<div id="code"><code>${code.innerHTML}</code></div>`
    code.innerHTML = ''
    const codes = [...document.getElementsByClassName('code')]
    codes.forEach(code => {
        code.remove()
    })
}

function SetParams(params, codeHolder, codeContent) {
    params = {
        codeHolder: codeHolder,
        codeContent: codeContent,
        openBraceCount: openBraceCount,
        fileName: fileName,
        isEOLINFOR: isEOLINFOR,
        forCount: forCount,
        lang: lang,
        theme: theme,
        tempStr: tempStr,
        copySvg: CopySvg,
        lineCountHolder: lineCountHolder,
        lineCount: lineCount,
        code: code
    }
    return params
}