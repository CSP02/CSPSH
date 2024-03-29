# CSPSH

![CSPSH-SyntaxHighlighter](https://github.com/CSP02/CSPSH/blob/main/Resources/CSPSH.png)
 A syantax highlighting library (or) package for highlighting your codes in webpages.

 ![issues](https://img.shields.io/github/issues/CSP02/CSPSH)
 ![forks](https://img.shields.io/github/forks/CSP02/CSPSH)
 ![stars](https://img.shields.io/github/stars/CSP02/CSPSH)
 ![license](https://img.shields.io/github/license/CSP02/CSPSH)
 ![version](https://img.shields.io/badge/Version-5.1.1-green)

- Yo help me in adding feature. Well simply comment which feature you want I will try to add. Because *cough* I can't get any feature ideas. Thank you 🙏

# Steps to use:

- Download the library and include the script using script tag as shown below or import into your js file

```html
<head>
    <!--you can see the CSPSH.js file in Source folder which you downloaded.-->
    <script src='path to the CSPSH.js' type='module'></script>
</head>
```

or

```js
import {CSPSH} from 'path to the CSPSH.js file'
```

- It is recommended to place the script tag at the end of your ``body`` tag in html.
**NOTE: Make sure to place the Source folder of this repo into your directory where your main html file is present (or) paste the exact path of CSPSH.js. But I recommend to copy the source folder to your work folder because CSPSH.js will automatically add all the required css files once the page is loaded.**

- In HTML define a class name with ``CSPSH`` in order to make CSPSH.js realise the code that is written in that element(I personally prefer div tag for that) and theme attribute to either ``monokai`` or ``drakula`` or default theme ``cspsh`` to choose the theme scheme and lang is the language of the code that is written inside the tag/element. see the example below for better understanding.

```html
<div class="CSPSH" lang = 'js' name="fileName" theme="monokai" linecount = 'true' mode="simple"></div><!--Filename is optional and it will be "file" if the field is empty, mode is also optional but has two values which are simple and default-->
```

- Start typing your code inside this tag.

```html
<!--Example-1-->
<div class="CSPSH" lang = 'js' name="fileName" theme="monokai" linecount = 'true'>
    const toggler = new Toggler;
    toggler.toggleClass('myId', 'fromClass', 'toClass');
</div>
```

- After typing your code go to your JS file and create a ``window.onload`` event and inside ``window.onload`` create an object for ``CSPSH`` class. In previous versions this is not required becasue this package don't take any user options from the JS file but as two new features were added options are compulsory.
- For more information about the options please visit the [CSPSH documentation](https://csp02/The-Atelier/Pages/CSPSH/cspshDocs.html).
- Now run the highlight method inside CSPSH object using the ``.highlight(options)`` method where options can be user defined as shown in docs.

# Major Version info:
1. Added support for python(but python code cannot be formatted by cspsh itself user have to format but for other languages cspsh can format)
2. Added support for css.
3. Fixed some known bugs
4. Changed the theme palette for cspsh theme

# Minor version info
1. Added simple mode which will *yeet* i mean remove all the fancy stuff and shows code in simple way.
2. Added multiple file multiple linehighlight...sounds confusing yes well lemme elaborate. In the previous versions users can't highlight specific lines for multiple files. But it is no more in this update I added this new feature.
3. Optimized some code.

# Optimizations:
- Accurate copy to clipboard functionality
- Accurate line count functionality
- Improved scrolling and fixed a bug where the scroll bar of whole document changes. Now the scrollbar changes only for CSPSH code.

**Planned improvements**
- Add some more themes.
- Add more language support. well done by giving c lang highlighting for any other langs.

**Example**

```html
<div class="CSPSH" lang = 'js' name="ValidCode" theme="drakula" linecount='true'>
    //single line comments
    /*multi
    line
    comments*/
    const toggler = new Toggler
    toggler.toggleClass ('myId', 'fromClass', 'toClass')
    var a = 1
    var b = 2
    console.log(biggest(a, b))
    function biggest(a, b) {
        if (a < b){
            return b
        } else {
            return a
        }
    }
</div>
```
**Note:**
- User must define the window.onload event in the JS file and create an object for CSPSH and run ``highlight(options)`` method. If user doesn't define the window.onload event in the JS file then the code will not get highlighted.
> script.js
```js
window.onload = function(){
    //code that user wants to perform
    const cspsh = new CSPSH
    const options = {
        file: ['file.extension'],
        highlightLine: [[12, 20, 22]],
        SourcePath: '/Source'
    }
    cspsh.highlight(options)
}
```
- This will automatically highlight the code which has CSPSH as class name for more info visit [docs](https://csp02/The-Atelier/Pages/CSPSH/cspshDocs.html).
**Link for story script(extention is sts)**
- StoryScript is created and developed by @lines-of-codes using python. [Learn more](https://github.com/StoryScriptorg/StoryScript/tree/main/storyscript).

- Join our discord server for any queries [the-atelier](https://discord.gg/6Mcy5NpSpH)

**NOTE: It is not recommended to format your HTML Code with tab spaces(unless it's python code) as its not necessary. But you must use new line(enter or a semicolon) to make it identify the new lines.**