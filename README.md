# CSPSH

![CSPSH-SyntaxHighlighter](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/CSPSH.png)
 A syantax highlighting library (or) package for highlighting your codes in webpages.

 ![issues](https://img.shields.io/github/issues/Chandra-sekhar-pilla/CSPSH)
 ![forks](https://img.shields.io/github/forks/Chandra-sekhar-pilla/CSPSH)
 ![stars](https://img.shields.io/github/stars/Chandra-sekhar-pilla/CSPSH)
 ![license](https://img.shields.io/github/license/Chandra-sekhar-pilla/CSPSH)
 ![version](https://img.shields.io/badge/Version-3.5.7-green)

# Steps to use:

- Download the package and include the script using script tag as shown below

```html
<head>
    <script src='./Source/CSPSH.js' type='module'></script>
</head>
```
- It is recommended to place the script tag at the end of your ``body`` tag in html.
**NOTE: Make sure to place the Source folder of this repo into your directory where your main html file is present (or) paste the exact path of CSPSH.js. But I recommend to copy the source folder to your work folder because CSPSH.js will automatically add all the required css files once the page is loaded.**

- In HTML define a class name with ``CSPSH`` in order to make CSPSH.js realise the code that is written in that element(I personally prefer div tag for that) and theme attribute to either ``monokai`` or ``drakula`` or default theme ``cspsh`` to choose the theme scheme and lang is the language of the code that is written inside the tag/element. see the example below for better understanding.

```html
<div class="CSPSH" lang = 'js' name="fileName" theme="monokai" linecount = 'true'></div><!--Filename is optional and it will be "file" if the field is empty-->
```

- Start typing your code inside this tag.
- In the previous version you have to seperate each word by spaces which is no longer required.
- Another impovement, the strings. Yes, now it can detect all kind of strings with spaces, without spaces... it just highlights(if you found any issue you can create a issue).
- It has basic formatting too.

```html
<!--Example-1-->
<div class="CSPSH" lang = 'js' name="fileName" theme="monokai" linecount = 'true'>
    const toggler = new Toggler;
    toggler.toggleClass('myId', 'fromClass', 'toClass');
</div>
```

# Hotfix info:
- Fixed some css.
- Organized code.

# Minor Version info:

- Created CSPSH class. visit [docs](https://the-atelier.ml/Pages/CSPSH/cspsh.html) for more info.  
- Added lineCount (Not responsive for now will make it responsive soon).
- Now user can decided if their code should show the line count or not just by defining an attribute ``linecount = true`` to make them visible and not mentioning the attribute for hiding the line count.
- Now the code will get changed into code tag.
- Improved CSS, Copy to clipboard system.

# Major Version info:

- Added linecount again
- Added theme switching mechanism
- Added transitions
- Cleared most of the bugs


**Planned improvements**
- Add some more themes.
- (optional) Add light mode if requested by any.
- Add tabs system.

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
- When user uses ``window.onload`` event in their scripts they might face some problems in functionality. To avoid that problem use the code shown below in ``window.onload`` in user's script:
> script.js
```js
window.onload = function(){
    //code that user wants to perform
    const cspsh = new CSPSH
    cspsh.highlight()
}
```
- This will automatically highlight the code which has CSPSH as class name for more info visit [docs](https://theatelier.ga/Pages/CSPSH/cspsh.html).
**Link for story script(extention is sts)**
- StoryScript is created and developed by @lines-of-codes using python. [Learn more](https://github.com/StoryScriptorg/StoryScript/tree/main/storyscript).

- Join our discord server for any queries [the-atelier](https://discord.gg/6Mcy5NpSpH)

**NOTE: It is not recommended to format your HTML Code with tab spaces as its not necessary. But you must use new line(enter or a semicolon) to make it identify the new lines.**