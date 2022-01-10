# SyntaxHylighlighter

![CSPSH-SyntaxHighlighter](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/CSPSH.png)
 A syantax highlighting library (or) package for highlight your codes in webpages.

 ![issues](https://img.shields.io/github/issues/Chandra-sekhar-pilla/CSPSH)
 ![forks](https://img.shields.io/github/forks/Chandra-sekhar-pilla/CSPSH)    
 ![stars](https://img.shields.io/github/stars/Chandra-sekhar-pilla/CSPSH)
 ![license](https://img.shields.io/github/license/Chandra-sekhar-pilla/CSPSH)    

# Steps to use:

- Download the package and include the script using script tag as shown in below

```html
<head>
    <script src='./Source/CSPSH.js'></script>
</head>
```

**NOTE: Make sure to place the Source folder in this repo to your directory where your main html file is present (or) paste the exact path of CSPSH.js. But I recommend to copy the source folder to your work folder because CSPSH.js will automatically adds the css files once it is loaded.**

- In HTML define a class name with ``CSPSH`` inorder to make CSPSH.js realise the code that is written in that element(I personally prefer div tag for that) and class to either ``dark`` or ``light`` to choose the theme scheme and lang is the language of the code that is written inside the tag(Only js language is available at this moment will release for all the languages soon). see the example below for better understanding.

```html
<div class="CSPSH dark" lang = 'js' name="fileName"></div><!--Filename is optional and it will be "file" if the field is empty-->
```

- Start typing your code inside this tag.
- In the previous version you have to seperate each word by spaces which is no longer required.
- Another impovement the strings. Yes now it can detect any kind of strings with spaces wothout spaces it just highlights(if you found any issue you can create a issue).
- It has basic formatting too(just realised it isn't fully fucntioning but will update it).

```html
<!--Example-1-->
<div class="CSPSH dark" lang = 'js' name="fileName">
    const toggler = new Toggler;
    toggler.toggleClass('myId', 'fromClass', 'toClass');
</div>
```

# Hotfix info:
- Fixed the bug where it highlighting everything as comment when using single line comments.
- Fixed a bug where a token is highlighted as a operator when it is placed between two operators(``}else{`` for example).

# Version info:

- No need to worry about string formatting as said in the previous version. Run index.html for more info,
- No more weird highlighting when there is something between two operators as stated in previous version(``}else{`` thingy),  
- CSPSH can highlight comments now,
- No need to use the spaces anymore,
- Works for for loops and strings.


**Other imrovements**

- Neat code and removed unnecessary code.
- Added comments for better readability.

**Example**

```html
<div class="CSPSH dark" lang = 'js' name="ValidCode">
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
**Normal Output:**
![output](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/Output.png)

**Output with different string notations:**
![StringOutput](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/StringOutputs.png)

**Comments output:**
![commentsOutput](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/commentsOutput.png)

**NOTE: The output is taken by alongating the the element for better view of output. The default height is 30% and in the picture it is 70% you can always change it if you want to.**

**NOTE: It is recommended that not to format the code in your html with the tab spaces its not necessary. But you must use new line(enter or a semicolon) to make it identify the new lines.**
