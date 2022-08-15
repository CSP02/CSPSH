class CSSTOKENS {
    constructor() {
        this.keywords = ['@charset', '@import', '@namespace',
            '@font-face', '@keyframes', '@media', '@page',
            '@supports', '@viewport', '@-ms-viewport',
            '@-webkit-viewport', '@-moz-viewport',
            '@-o-viewport', '@-webkit-keyframes',
            '@-moz-keyframes', '@-o-keyframes',
            '@-ms-keyframes', '@-webkit-font-face',
            '@-moz-font-face', '@-o-font-face', '@-ms-font-face',
            '@-webkit-document', '@-moz-document', '@-o-document',
            '@-ms-document', '@-webkit-view', '@-moz-view',
            '@-o-view', '@-ms-view', '@-webkit-region',
            '@-moz-region', '@-o-region', '@-ms-region',
            '@-webkit-grammar', '@-moz-grammar', '@-o-grammar',
            '@-ms-grammar', '@-webkit-mask', '@-moz-mask',
            '@-o-mask', '@-ms-mask', '@-webkit-mask-image',
            '@-moz-mask-image', '@-o-mask-image', '@-ms-mask-image',
            '@-webkit-mask-attachment', '@-moz-mask-attachment',
            '@-o-mask-attachment', '@-ms-mask-attachment',
            '@-webkit-mask-position', '@-moz-mask-position',
            '@-o-mask-position', '@-ms-mask-position',
            '@-webkit-mask-repeat', '@-moz-mask-repeat',
            '@-o-mask-repeat', '@-ms-mask-repeat',
            '@-webkit-mask-clip', '@-moz-mask-clip',
            '@-o-mask-clip', '@-ms-mask-clip', '@-webkit-mask-origin', '@-moz-mask'
        ]
        this.operators = [':', '::', '.']
        this.EOL = [';', '\n']
        this.unaryOperators = []
        this.ternaryOperators = []
        this.types = ['input', 'body', 'span', 'div']
        this.func = ['(', ')']
        this.index = ['[', ']']
        this.curlyBraces = ['{', '}']
        this.string = ['"', "'"]
        this.inBuilt = ['attr', 'calc']
        this.properties=[
            'background','background-color', 'color', 'max-width', 'width', 'height',
            'display', 'align', 'justify', 'flex-direction',
            'flex-wrap', 'flex-flow', 'flex-basis', 'flex-grow',
            'flex-shrink', 'flex-wrap', 'flex-flow', 'flex-basis',
            'flex-grow', 'flex-shrink', 'flex-wrap', 'flex-flow',
            'flex-basis', 'flex-grow', 'flex-shrink', 'flex-wrap',
            'flex-flow', 'flex-basis', 'flex-grow', 'flex-shrink',
            'border', 'border-width', 'border-style', 'border-color',
            'border-radius', 'border-top', 'border-right', 'border-bottom',
            'border-left', 'border-top-width', 'border-right-width',
            'border-bottom-width', 'border-left-width', 'border-top-style',
            'margin', 'margin-top', 'margin-right', 'margin-bottom',
            'margin-left', 'padding', 'padding-top', 'padding-right',
            'padding-bottom', 'padding-left', 'outline', 'outline-width',
            'outline-style', 'outline-color', 'outline-offset',
            'outline-top', 'outline-right', 'outline-bottom',
            'font', 'font-family', 'font-size', 'font-style', 'font-weight',
            'font-variant', 'font-stretch', 'font-size-adjust',
            'font-kerning', 'font-smoothing', 'font-feature-settings',
            'font-variant-caps', 'font-variant-numeric', 'red', 'blue', 'green',
        ]
        this.values = [
            'flex', 'grid', 'screen', 'solid'
        ]
    }
}

export { CSSTOKENS }