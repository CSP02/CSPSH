import { CSPSH } from "./Source/CSPSH.js"

window.onload = function () {
    console.log('loaded')
    const cspsh = new CSPSH
    const options = {
        file: ['long code.java', 'ex.py'],
        highlightLine: [[1, 3, 5, 6, 20], [2, 3]],
        SourcePath: 'default'
    }
    cspsh.highlight(options)
}