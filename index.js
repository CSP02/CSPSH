import { CSPSH } from "./Source/CSPSH.js"

window.onload = function () {
    console.log('loaded')
    const cspsh = new CSPSH
    const options = {
        file: 'long code.java',
        highlightLine: [1, 2, 6, 7, 8, 10]
    }
    cspsh.highlight(options)
}