class HTMLTOKENS {
    constructor() {
        this.keywords = ['html', 'head', 'title', 'body', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote',
            'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd',
            'del', 'details', 'dfn', 'dialog', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure',
            'footer', 'form', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend',
            'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup',
            'option', 'output', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp',
            'script', 'section', 'select', 'small', 'source', 'strong', 'style', 'sub', 'summary', 'sup', 'table',
            'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u',
            'ul', 'var', 'video', 'wbr', 'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
            'meta', 'param', 'source', 'track', 'wbr', 'command', 'keygen', 'menuitem']
        this.operators = ['/', '<', '>', '=']
        this.EOL = ['\n']
        this.unaryOperators = []
        this.ternaryOperators = []
        this.types = []
        this.func = ['(', ')']
        this.index = []
        this.curlyBraces = []
        this.string = ['"', "'", '`']
        this.inBuilt = ['id', 'class', 'type', 'rel', 'src', 'lang', 'theme', 'linecount', 'download',
            'href', 'style', 'title', 'alt', 'width', 'height', 'name', 'value', 'placeholder', 'required',
            'disabled', 'readonly', 'checked', 'selected', 'multiple', 'autocomplete', 'autofocus', 'pattern',
            'min', 'max', 'step', 'rows', 'cols', 'wrap', 'for', 'label', 'target', 'hidden', 'onclick',
            'ondblclick', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onkeydown',
            'onkeypress', 'onkeyup', 'onabort', 'onbeforeunload', 'onerror', 'onhashchange', 'onload',
            'onpageshow', 'onpagehide', 'onresize', 'onscroll', 'onunload', 'onblur', 'onchange', 'onfocus'
        ]
    }
}

export { HTMLTOKENS }