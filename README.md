# SyntaxHylighlighter

![CSPSH-SyntaxHighlighter](https://github.com/Chandra-sekhar-pilla/CSPSH/blob/main/Resources/CSPSH.png)
 A syantax highlighting library (or) package for webpages

# Remainder:
Note that CSPSH is a pre release and this package is not fully functional. So I request you to follow the below steps.

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
<div id="CSPSH" class="Dark" lang = 'js'></div>
```

- Start typing your code inbetween this tag with spaces between each word and symbol(right now this package can only detect basic syntax that is the main reason of requesting to seperate every word and symbol with a space except for strings and ``;`` for line breaks. See the below example for better understanding).
```html
<!--Example-1 as you can see every character and words are seperated with spaces except the strings-->
<div id="CSPSH" class="Dark" lang = 'js'>
    const toggler = new Toggler;
    toggler.toggleClass ('myId' , 'fromClass' , 'toClass');
</div>
```
**NOTE: Detailed string notation have to follow**
Notation | valid/invalid
-------- | -------------
'string' | valid
'string hello world' | valid
' string '| invalid

- These are the main instructions you have to follow to make it work(I will make it ez without any seperations in future updates because I have already completed the whole project but it was deleted so I coded it again. But in previous which is deleted I used if else ladders to recognize the tokens but now I am using switch case statements so it will be faster and better).

**NOTE: As I said this is the pre release of this package so everything is not perfect but it can detect only if the spaces are provided. I hope you can understand and use it as mentioned above**