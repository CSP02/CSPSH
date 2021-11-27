# SyntaxHylighlighter

![CSPSH-SyntaxHighlighter](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/CSPSH.png)
 A syantax highlighting library (or) package for highlight your codes in webpages.

# Remainder:

Note that CSPSH is not a perfect syntax highlighting package and this package is not fully functional(should work in some limitations stated below). So I request you to follow the below steps.

# Steps:

- Download the package and include the script using script tag as shown in below

```html
<head>
    <script src='./Source/CSPSH.js'></script>
</head>
```

**NOTE: Make sure to place the Source foler in this repo to your directory where your main html file is present (or) paste the exact path of CSPSH.js. But I recommend to copy the source folder to your work folder because CSPSH.js will automatically adds the css files once it is loaded.**

- In HTML define a class name with ``CSPSH`` inorder to make CSPSH.js realise the code that is written in that element(I personally prefer div tag for that) and class to either ``dark`` or ``light`` to choose the theme scheme and lang is the language of the code that is written inside the tag(Only js language is available at this moment will release for all the languages soon). see the example below for better understanding.

```html
<div class="CSPSH dark" lang = 'js' name="fileName"></div><!--Filename is optional and it will be "file" if the field is empty-->
```

- Start typing your code inside this tag.
- In the previous version you have to seperate each word by spaces which is no longer required.
- It has basic formatting too.

```html
<!--Example-1-->
<div class="CSPSH dark" lang = 'js' name="fileName">
    const toggler = new Toggler;
    toggler.toggleClass('myId', 'fromClass', 'toClass');
</div>
```

**NOTE: Detailed string notation have to follow**
**NOTE: Mostly the package doesnt work properly only in strings. Other than that it can detect tokens and highlight the code.**

Notation | valid/invalid
-------- | -------------
'string' | valid
'string hello world' | valid
' string '| invalid

- These are the main instructions you have to follow to make it work.

# Version info:
- Added formatting fucntionality to the code,
- Improved collor palette,
- Better copy to clipboard functionality
- Added an attribute ``name`` which is displayed as the file name.
- No need to use the spaces anymore

# Limitation yet to overcome
- The main thing I noticed is that you cannot place any word between two symbols. Like

```js
    ...
    }else{
    ...
``` 
this will make the else as a operator I am still working on it so will fix it soon.
- And the widths of these elements are bit messed up but you can edit them by accessing ``.CSPSH`` and ``#copyHolder`` in your own css. But I will try to fix that soon too and this thing is only occuring at different screen resolutions so will make it a responsive thing so it wont happen again.
- Won't work for for loops(because it contains ; and CSPSH reads it as a EOL character will avoid it in the later release)
- For better understanding see the file index.html. Here is the small example of the code

```html
<div class="CSPSH dark" lang = 'js' name="ValidCode">
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
**Output:**
![output](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/Output.png)

**NOTE: The output is taken by alongating the the element for better view of output. The default height is 30% and in the picture it is 70% you can always change it if you want to.**

**Within this all limitation CSPSH has a addition feature of styling the code area and a inbuilt copy to clipboard fucntionality(fully functional). Open the file index.html so you will understand how it actually looks and works.**


**NOTE: It is recommended that not to format the code in your html with the tab spaces its not necessary. But you must use new line(enter or a semicolon) to make it identify the new lines.**