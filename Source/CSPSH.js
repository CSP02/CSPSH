//importing all the tokens of each language
import { JSTOKENS } from './LangTokens/CSPSHJS.js'
import { CPPTOKENS } from './LangTokens/CSPSHCPP.js'
import { CTOKENS } from './LangTokens/CSPSHC.js'
import { JAVATOKENS } from './LangTokens/CSPSHJAVA.js'
import { SSTOKENS } from './LangTokens/CSPSHSS.js'
import { HTMLTOKENS } from './LangTokens/CSPSHHTML.js'
import { CSSTOKENS } from './LangTokens/CSPSHCSS.js'
import { PYTOKENS } from './LangTokens/CSPSHPY.js'

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

export class CSPSH {
    //Runs right after the page is loaded
    highlight(options) {
        try {
            let codes = document.getElementsByClassName('CSPSH');
            let sourcePath = options.SourcePath;
            let mode = options.mode;
            if (options.SourcePath === 'default')
                sourcePath = '/Source'
            document.head.innerHTML += `<link rel="stylesheet" href="${sourcePath}/ThemeStyles/CSPSHDARK.css">`
            document.head.innerHTML += `<link rel="stylesheet" href="${sourcePath}/ThemeStyles/DRAKULADARK.css">`
            document.head.innerHTML += `<link rel="stylesheet" href="${sourcePath}/ThemeStyles/MONOKAIDARK.css">`

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
                } else
                    theme = codeHolder.getAttribute('theme')
                if (!fileName) {
                    fileName = `file`//sets default file name to file
                }
                //push all the code content.
                content.push(codeHolder.textContent)
                codeContent = codeHolder.textContent
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
                    case 'html':
                        lang = new HTMLTOKENS();
                        lineCount = 0;
                        break
                    case 'py':
                        lang = new PYTOKENS();
                        lineCount = 0;
                        break
                    default:
                        lang = new CTOKENS();
                        lineCount = 0;
                }
                Start(options);
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
                    const clipboardText = button.parentElement.parentElement.lastChild.innerText
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
            const retroEffects = document.getElementsByClassName('retro_effect');
            [...retroEffects].forEach(retroEffect => {
                retroEffect.addEventListener('input', function () {
                    const cspshHolder = retroEffect.parentElement.parentElement.parentElement.parentElement;
                    cspshHolder.classList.toggle('retro')
                    const retroInputSib = retroEffect.nextSibling
                    const retroCircle = retroInputSib.firstChild
                    if(retroEffect.checked){
                        retroInputSib.style.backgroundColor = "green"
                        retroCircle.style.marginLeft = "1.8rem"
                    }else{
                        retroInputSib.style.backgroundColor = "#dcdcdc"
                        retroCircle.style.marginLeft = "0"
                    }
                })
            })
            //start of theme changing
            const themeSelectors = document.getElementsByClassName("theme_selectors");
            [...themeSelectors].forEach(themeSelector => {
                const theme = themeSelector.parentElement.parentElement.parentElement.getAttribute('theme');
                [...themeSelector.options].forEach(option => {
                    theme === option.value ? option.setAttribute('selected', 'true') : option.removeAttribute('selected');
                });
                themeSelector.addEventListener("change", changeData => {
                    const theme = themeSelector.parentElement.parentElement.parentElement.getAttribute('theme');
                    [...themeSelector.options].forEach(option => {
                        theme === option.value ? option.setAttribute('selected', 'true') : option.removeAttribute('selected');
                    })
                    themeSelector.parentElement.nextSibling.className = `themeusing${themeSelector.value}`;
                    themeSelector.parentElement.parentElement.className = `copyHolder-${themeSelector.value}`;
                    themeSelector.parentElement.parentElement.parentElement.classList.remove(theme.toUpperCase());
                    themeSelector.parentElement.parentElement.parentElement.classList.add(themeSelector.value.toUpperCase());
                    const cspshTags = [...themeSelector.parentElement.parentElement.parentElement.getElementsByTagName('cspsh')]
                    const divs = [...themeSelector.parentElement.parentElement.parentElement.getElementsByTagName('div')]
                    divs.forEach(div => {
                        div.className = div.className.replaceAll(`${theme}`, `${themeSelector.value}`);
                    })
                    cspshTags.forEach(cspsh => {
                        if (cspsh.className.split('-')[0] === 'sh')
                            cspsh.className = cspsh.className.replaceAll(`${theme}`, `${themeSelector.value}`);
                    })
                    const lineHighlights = [...themeSelector.parentElement.parentElement.parentElement.lastChild.getElementsByClassName(`sh-${theme}-lineHighlight`)];
                    lineHighlights.forEach(lineHighlight => {
                        lineHighlight.className = lineHighlight.className.replaceAll(`sh-${theme.toUpperCase()}-lineHighlight`, `sh-${themeSelector.value.toUpperCase()}-lineHighlight`);
                    })

                    const lineCountHolder = themeSelector.parentElement.parentElement.parentElement.lastChild.getElementsByClassName('linecount-holder')[0]
                    lineCountHolder.classList.remove(`lineCount-${theme.toUpperCase()}-done`)
                    lineCountHolder.classList.add(`lineCount-${themeSelector.value.toUpperCase()}-done`)
                    const mainHolder = themeSelector.parentElement.parentElement.parentElement;
                    mainHolder.setAttribute('theme', themeSelector.value);
                    themeSelector.parentElement.nextSibling.innerText = 'Current Theme: ' + themeSelector.value.toUpperCase()
                })
            })
            //end of theme changing
            //Build tabs if there are any
            BuildTabs(mode);
            //auto-scroll the linecount according to the scroll position of the code
            AutoScroll();
            //add titles so when user hovers on the tokens it shows the token name
            AddTitles();
        } catch (e) {
            codeHolder.lastChild.innerHTML += `
            <div id="CSPSH-errorMessage">!unable to highlight code due to some issue.
            <p style="color:white;">Here is the full details:</p>${e.stack.toString().split('\n').join('<br>')}
            <br>you can report the Error by clicking reporting an issue here:<br>
            <a href="https://github.com/Chandra-sekhar-pilla/CSPSH/issues">Report a bug</a><br>
            <p>Please use the issue template provided while reporting an issue.</div>`
        }
    }

    nullOptions() {
        const options = {
            file: null,
            highlightLine: null,
            SourcePath: null,
        }

        return options
    }

    defaultOptions() {
        const options = {
            file: '',
            highlightLine: '',
            SourcePath: '/Source',
        }

        return options;
    }
}

function Start(options) {
    lineCount = 0
    codeAndLineCount = HighLight(SetParams(params), options)
    code = codeAndLineCount.code;
    lineCount = codeAndLineCount.lineCount
    lineCountHolder = document.getElementsByClassName(`lineCount-${theme.toUpperCase()}`)[0]
    tempClassName = lineCountHolder.className
    lineCountHolder.className = `linecount-holder lineCount-${theme.toUpperCase()}-done`;
    if (codeHolder.getAttribute('linecount') == 'true')
        DisplayLineCount(lineCountHolder, lineCount, options)
    else
        lineCountHolder.style.display = 'none'
    ReplaceDIVWithCode(codeHolder, code);
    if (codeHolder.getAttribute("mode") === "simple" && codeHolder.parentElement.className !== "cspshBuildTabs") {
        [...codeHolder.children].filter(child => child.className.includes("copyHolder"))[0].remove();
        const breakpoints = [...codeHolder.children].filter(child => child.tagName === "BR")
        breakpoints.forEach(breakPoint => {
            breakPoint.remove();
        });
        codeHolder.classList.add("cspsh_simple_mode")
        codeHolder.getElementsByClassName("copyVector")[0].classList.add("simple_mode_copyVector")
        const copyVectorHolder = codeHolder.getElementsByClassName("copy_vector_holder")[0]
        copyVectorHolder.classList.add("simple_mode_copyVectorHolder")
    }
    code = null
    lineCount = null
    lang = null
}

//function to display line count id enabled
function DisplayLineCount(lineCountHolder, lineCount, options) {
    lineCountHolder.innerHTML += '<br>'
    for (var line = 1; line <= lineCount; line++) {
        lineCountHolder.innerHTML += `<cspsh>${line}.</br></cspsh>`
    }
    lineCountHolder.innerHTML += '<br>'
    return
}

//function to replace the div tag with the code tag.
function ReplaceDIVWithCode(codeHolder, code) {
    codeHolder.children[5].innerHTML += `<div id="code"><code>${code.innerHTML}</code></div>`
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
        const lineCount = codeHolder.lastChild.children[0];
        //add scroll event listener to the code holder (for #code)
        codeHolder.lastChild.children[1].addEventListener('scroll', scroll => {
            //set the scroll position of linecount to the same as the scroll position of the code
            lineCount.scrollTop = codeHolder.lastChild.children[1].scrollTop;
        })
    }
}

function AddTitles() {
    const cspshTags = document.getElementsByTagName('cspsh');
    for (var i = 0; i < cspshTags.length; i++) {
        const cspshTag = cspshTags[i];
        if (cspshTag.className.split('-')[2])
            cspshTag.title = cspshTag.className.split('-')[2];
        else
            cspshTag.title = cspshTag.className.split('-')[1];

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