# SyntaxHylighlighter

![CSPSH-SyntaxHighlighter](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/CSPSH.png)
 A syantax highlighting library (or) package for highlight your codes in webpages.

 ![issues](https://img.shields.io/github/issues/Chandra-sekhar-pilla/CSPSH)
 ![forks](https://img.shields.io/github/forks/Chandra-sekhar-pilla/CSPSH)
 ![stars](https://img.shields.io/github/stars/Chandra-sekhar-pilla/CSPSH)
 ![license](https://img.shields.io/github/license/Chandra-sekhar-pilla/CSPSH)
 ![version](https://img.shields.io/badge/Version-2.1.2-green)

# Steps to use:

- Download the package and include the script using script tag as shown in below

```html
<head>
    <script src='./Source/CSPSH.js'></script>
</head>
```

**NOTE: Make sure to place the Source folder in this repo to your directory where your main html file is present (or) paste the exact path of CSPSH.js. But I recommend to copy the source folder to your work folder because CSPSH.js will automatically adds the css files once it is loaded.**

- In HTML define a class name with ``CSPSH`` inorder to make CSPSH.js realise the code that is written in that element(I personally prefer div tag for that) and mode attribute to either ``dark`` or ``light`` to choose the theme scheme and lang is the language of the code that is written inside the tag(Only js language is available at this moment will release for all the languages soon). see the example below for better understanding.

```html
<div class="CSPSH" lang = 'js' name="fileName" mode="dark"></div><!--Filename is optional and it will be "file" if the field is empty-->
```

- Start typing your code inside this tag.
- In the previous version you have to seperate each word by spaces which is no longer required.
- Another impovement the strings. Yes now it can detect any kind of strings with spaces wothout spaces it just highlights(if you found any issue you can create a issue).
- It has basic formatting too.

```html
<!--Example-1-->
<div class="CSPSH dark" lang = 'js' name="fileName" mode="dark">
    const toggler = new Toggler;
    toggler.toggleClass('myId', 'fromClass', 'toClass');
</div>
```

# Hotfix info:
- Fixed a bug in CPP highlighting.
- Fixed the bug where copy to clipboard isn't working.
- Fixed a bug where CSPSH is adding spaces for some operators like ``<=``, ``>=``,.. etc.
- Fixed a bug where the ``.`` in a float value is being considered as an operator. Now it will be considered as a number.

# Major Version info:

- Added language suppport as said these are the language that were added but there are some keywords, types, etc I didn't add. Because I don't know all those things. And you are welcomed to help me in adding those things.
    1. JavaScript
    2. Java
    3. C language
    4. C++
    5. StoryScript
- Optimized css. Previously there is a seperate css for every lang but I combined the styles(colors) for same colors (ex: types for all langs use same color). 
- Added light theme.
- This update covers all the previous beta and alpha update so consider this update as the latest stable update.

# Minor Version info:

- Fixed a bug where cspsh adds the ``dark.css`` or ``light.css`` multiple times.
- Fixed the bug where the tick mark appearing at the 1st CSPSH element while clicked.
- Decreased font-size, fixed height and width, added highlighting preprocessing statements in light mode.
- Now you can override the default css. 

**Other imrovements**

- Neat code and removed unnecessary code.
- Added comments for better readability.
- Changed the style of copy-to-clipboard button(Previously I used 2 div elements now it's svg)

**Planned improvements**
- Add the theme attribute to select different theme(mode is different from theme).

**Example**

```html
<div class="CSPSH" lang = 'js' name="ValidCode" mode="dark">
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

**Link for story script(extention is sts)**
- StoryScript is created and developed by @lines-of-codes using python. [Learn more](https://github.com/StoryScriptorg/StoryScript/tree/main/storyscript).

**NOTE: It is recommended that not to format the code in your html with the tab spaces its not necessary. But you must use new line(enter or a semicolon) to make it identify the new lines.**
