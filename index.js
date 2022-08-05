import { CSPSH } from "./Source/CSPSH.js"

window.onload = function () {
    console.log('loaded')
    const cspsh = new CSPSH
    const options = {
        file: 'long code.java',
        highlightLine: 12
    }
    cspsh.highlight(options)
}