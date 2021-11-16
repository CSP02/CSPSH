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
<div class="CSPSH dark" lang = 'js' name="fileName"></div><!--Filename is optional and it will be undefined if the field is empty-->
```

- Start typing your code inside this tag with spaces between each word and symbol(right now this package can only detect basic syntax that is the main reason of requesting to seperate every word and symbol with a space except for strings. See the below example for better understanding).

```html
<!--Example-1 as you can see every character and words are seperated with spaces except the strings-->
<div class="CSPSH dark" lang = 'js' name="fileName">
    const toggler = new Toggler;
    toggler.toggleClass ('myId' , 'fromClass' , 'toClass');
</div>
```

**NOTE: Detailed string notation have to follow**
**NOTE: Mostly the package doesnt work properly only in the presense of strings. Other than that it can detect tokens and highlight the code. By seperating them with space CSPSH can identify as a seperate token and can highlight the code**

Notation | valid/invalid
-------- | -------------
'string' | valid
'string hello world' | valid
' string '| invalid

- These are the main instructions you have to follow to make it work(I will make it ez without any seperations in future updates because I have already completed the whole project but it was deleted so I coded it again. But in previous which is deleted I used if else ladders to recognize the tokens but now I am using switch case statements so it will be faster and better).

# Version info:
- Added formatting fucntionality to the code,
- Improved collor palette,
- Better copy to clipboard functionality
- Added an attribute ``name`` which is displayed as the file name.

# Limitation yet to overcome
- Still you have to seperate symbols with spaces,
- Won't work for for loops(because it contains ; and CSPSH reads it as a EOL character will avoid it in the next release)
- For better understanding see the file index.html. Here is the small example of the code

```html
<div class="CSPSH dark" lang = 'js' name="ValidCode">
    const toggler = new Toggler
    toggler.toggleClass ('myId' , 'fromClass' , 'toClass')
    var a = 1
    var b = 2
    console.log ( biggest(a , b) )
    function biggest (a , b) {
        if ( a < b) {
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


**NOTE: As I said this is the pre release of this package so everything is not perfect but it can detect only if the spaces are provided. I hope you can understand and use it as mentioned above**