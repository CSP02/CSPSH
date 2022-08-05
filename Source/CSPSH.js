//importing all the tokens of each language
import { JSTOKENS } from './LangTokens/CSPSHJS.js'
import { CPPTOKENS } from './LangTokens/CSPSHCPP.js'
import { CTOKENS } from './LangTokens/CSPSHC.js'
import { JAVATOKENS } from './LangTokens/CSPSHJAVA.js'
import { SSTOKENS } from './LangTokens/CSPSHSS.js'
import { HTMLTOKENS } from './LangTokens/CSPSHHTML.js'
import { CSSTOKENS } from './LangTokens/CSPSHCSS.js'

//importing other files that required cspsh
import { HighLight } from './CSPSH/HighLight.js'
import { BuildTabs } from './CSPSH/TabBuilder.js'

//Initializing all the required variables and constants.
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
let lineCountHolder
let lineCount = 0
let code
let params
let links = [...document.head.getElementsByTagName('link')]
let codeAndLineCount
let tempClassName
let codeHolder
let codeContent

//the following block will move the user's css to the down
for (let h = 0; h < links.length; h++) {
    let link = links[h]
    link.parentElement.removeChild(link)
}
const copySvg = `
<svg width="27.5" height="30" xmlns="http://www.w3.org/2000/svg" class="CSPSHsvg">
    <polyline points="10 7.5, 2.5 7.5, 2.5 28, 20 28, 20 26.5, 10 26.5, 10 7.5" fill ="black" 
        stroke="black" stroke-linecap="round" stroke-width="5" 
        stroke-linejoin="round" id="blackLine"/>
    <polyline points="15 2.5, 7.5 2.5, 7.5 23, 25 23, 25 2.5, 15 2.5" fill="grey" stroke="grey" stroke-linecap="round"
        stroke-width="5" stroke-linejoin="round" id="greyLine"/>
</svg>`

// window.onload = function () {
//     const options = {
//         file: null,
//         highlightLine: null
//     }
//     const cspsh = new CSPSH()
//     cspsh.highlight(options)
// }

export class CSPSH {
    //Runs right after the page is loaded
    highlight(options) {
        try {
            let codes = document.getElementsByClassName('CSPSH');
            //Reads the required attributes and links the required stylesheets based on selected theme
            for (let i = 0; i < codes.length; i++) {
                codeHolder = codes[i]
                fileName = codeHolder.getAttribute('name')
                codeHolder.className += ` ${codeHolder.getAttribute('theme').toUpperCase()}`
                if (codeHolder.getAttribute('theme') && !themesList.includes(codeHolder.getAttribute('theme'))) {
                    if (codeHolder.getAttribute('theme').split(' ').length > 1)
                        theme = codeHolder.getAttribute('theme').split(' ')[0];
                    else
                        theme = codeHolder.getAttribute('theme')
                    themesList.push(theme)
                    document.head.innerHTML += `<link rel="stylesheet" href="/Source/ThemeStyles/CSPSHDARK.css">`
                    document.head.innerHTML += `<link rel="stylesheet" href="/Source/ThemeStyles/DRAKULADARK.css">`
                    document.head.innerHTML += `<link rel="stylesheet" href="/Source/ThemeStyles/MONOKAIDARK.css">`
                } else
                    theme = codeHolder.getAttribute('theme')
                if (!fileName) {
                    fileName = `file`//sets default file name to file
                }
                //push all the code content.
                content.push(codeHolder.innerHTML)
                codeContent = codeHolder.innerHTML
                //Detect the language and start highlighting
                switch (codeHolder.lang) {
                    case 'js' || 'ts':
                        lang = new JSTOKENS()
                        break
                    case 'cpp':
                        lang = new CPPTOKENS()
                        break
                    case 'c':
                        lang = new CTOKENS()
                        break
                    case 'java' || 'c#':
                        lang = new JAVATOKENS()
                        break
                    case 'sts':
                        lang = new SSTOKENS()
                        lineCount = 0
                        break
                    case 'css':
                        lang = new CSSTOKENS();
                        lineCount = 0
                        break
                }
                Start(options)
            }
            //appends the link tags back to head so that user can manipulate the properties of cspsh.
            links.forEach(link => {
                document.head.appendChild(link)
            })

            //Copy to clipboard functionlity inside the HighLight() method
            const buttons = document.getElementsByClassName('copyVector')
            //Adds the copy to clipboard functionality to all the buttons
            for (let j = 0; j < buttons.length; j++) {
                const button = buttons[j];
                button.addEventListener('click', function () {
                    //get the innertext of #code element i.e the code to be copied
                    const clipboardText = button.parentElement.children[6].innerText
                    const copiedSvg = button.children[0];
                    //copy the code to clipboard
                    navigator.clipboard.writeText(clipboardText)
                    //change the svg to tick mark indicating that the code is copied
                    copiedSvg.innerHTML = `<polyline points="11 13.5, 13.5 17.5, 22.5 10" fill="transparent" stroke="green" stroke-linecap="round"
            stroke-width="3" stroke-linejoin="round"/>`
                    //wait for 0.5s (500ms) and revert back to the original svg
                    setTimeout(function () {
                        copiedSvg.innerHTML = copySvg
                    }, 500)
                })
            }
            //End of copy to clipboard functionality
            //start of theme changing
            const themeChangers = [...document.getElementsByClassName('themeChangers')];
            themeChangers.forEach(themeChanger => {
                themeChanger.addEventListener('click', click => {
                    click.path[1].className = `themeusing${click.target.id}`;
                    click.path[2].className = `copyHolder-${click.target.id}`;
                    click.path[3].className = `CSPSH ${click.target.id.toUpperCase()}`;
                    const theme = click.target.parentElement.parentElement.parentElement.getAttribute('theme');
                    const spans = [...click.target.parentElement.parentElement.parentElement.getElementsByTagName('span')]
                    const divs = [...click.target.parentElement.parentElement.parentElement.getElementsByTagName('div')]
                    divs.forEach(div => {
                        div.className = div.className.replaceAll(`${theme.toUpperCase()}`, `${click.target.id.toUpperCase()}`);
                    })
                    spans.forEach(span => {
                        span.className = span.className.replaceAll(`${theme.toUpperCase()}`, `${click.target.id.toUpperCase()}`);
                    })
                    const mainHolder = click.path[3]
                    mainHolder.setAttribute('theme', click.target.id);
                    click.target.parentElement.nextSibling.innerText = 'Current Theme: ' + click.target.id.toUpperCase()
                })
            })
            //end of theme changing
            //Build tabs if there are any
            BuildTabs();
            //auto-scroll the linecount according to the scroll position of the code
            AutoScroll();
        } catch (e) {
            codeHolder.children[6].children[0].innerHTML += `
            <div id="CSPSH-errorMessage">!unable to highlight code due to some issue.
            <p style="color:white;">Here is the full details:</p>${e.stack.toString().split('\n').join('<br>')}
            <br>you can report the Error by clicking reporting an issue here:<br>
            <a href="https://github.com/Chandra-sekhar-pilla/CSPSH/issues">Report a bug</a><br>
            <p>Please use the issue template provided while reporting an issue.</div>`
            codeHolder.children[6].style.overflow = 'hidden'
        }
    }

    nullOptions() {
        const options = {
            file: null,
            highlightLine: null,
        }

        return options
    }
}

function Start(options) {
    lineCount = 0
    codeAndLineCount = HighLight(SetParams(params), options)
    code = codeAndLineCount.code;
    lineCount = codeAndLineCount.lineCount
    lineCountHolder = document.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
    tempClassName = lineCountHolder.className
    lineCountHolder.className = `lineCount-${theme.toUpperCase()}-done`;
    if (codeHolder.getAttribute('linecount') == 'true')
        DisplayLineCount(lineCountHolder, lineCount, options)
    ReplaceDIVWithCode(codeHolder, code)
    code = null
    lineCount = null
    lang = null
}

//function to display line count id enabled
function DisplayLineCount(lineCountHolder, lineCount, options) {
    lineCountHolder.innerHTML += '<br>'
    for (var line = 1; line < lineCount; line++) {
            lineCountHolder.innerHTML += `<span>${line}.</br></span>`
    }
    lineCountHolder.innerHTML += '<br>'
    return
}

//function to replace the div tag with the code tag.
function ReplaceDIVWithCode(codeHolder, code) {
    codeHolder.innerHTML += `<div id="code"><code>${code.innerHTML}</code></div>`
    code.innerHTML = ''
    const codes = [...document.getElementsByClassName('code')]
    codes.forEach(code => {
        code.remove()
    })
}

//function to auto-scroll the linecount according to the scroll position of the code
function AutoScroll() {
    //get all the codes in the document
    const codes = document.getElementsByClassName('cspsh');
    for (var i = 0; i < codes.length; i++) {
        const codeHolder = codes[i];
        //get the linecount holder
        const lineCount = codeHolder.children[5];
        //add scroll event listener to the code holder (for #code)
        codeHolder.children[6].addEventListener('scroll', scroll => {
            //set the scroll position of linecount to the same as the scroll position of the code
            lineCount.scrollTop = codeHolder.children[6].scrollTop;
        })
    }
}

//function to set the parameters for other methods in the project
function SetParams(params) {
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
        copySvg: copySvg,
        lineCountHolder: lineCountHolder,
        lineCount: lineCount,
        code: code,
    }
    return params
}