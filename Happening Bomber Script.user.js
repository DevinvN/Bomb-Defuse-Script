// ==UserScript==
// @name         Happening Bomber Script
// @namespace    happening.im Bomb Defuse Auto Script
// @version      0.1
// @description  Script to automate Bomb Defuse game on happening.im
// @author       Devin van Nieuwenhoven
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @match        https://happening.im/
// @grant        none
// ==/UserScript==

// Desired amount of defused bombs
var setAmount = 0;
var amount = 0;

//Starting
var shown = false;

// Touch event to be fired on bomb
var e = new MouseEvent('touchstart', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});


function started()
{
    var s = document.querySelectorAll("main > div.b_ > div.b_ > div.startButton");
    var n = typeof s !== 'undefined' ? s.length : 0;
    
    console.log("Shown: "+shown+"\nAmount: "+n);
    
    if (shown === false && n > 0)
    {
        shown = true;
    }
    else
    {
        if (shown === true && n === 0)
        {
            shown = false;
            return true;
        }
    }    
    return false;
}

function onBombDefuse()
{
    // Select all bombs
    var x = document.querySelectorAll("main > div.b_ > div.b_ > canvas");
	// Get number of bombs
    var l = typeof x !== 'undefined' ? x.length : 0;
	// If bombs are visible, 
    return (l === 16);
}

function checkBombs(){
    // Select all bombs
    var x = document.querySelectorAll("main > div.b_ > div.b_ > canvas");
	// Get number of bombs
    var l = typeof x !== 'undefined' ? x.length : 0;
	// If bombs are visible 
    if (l === 16 && amount > 0)
    {
		// Loop over all bombs
        for (var i = 0; i < l; i++) {
            var h = x[i].style.height;           
			// Nasty way of checking if bomb is "red"
            if (h == "146px")
            { 
				// Dispatch touch event
				x[i].dispatchEvent(e);  
                amount--;
                console.log(i+" is red. Amount left: "+amount);                                          
            }
        }
    }
}

function runScript()
{
    if (!onBombDefuse())
        return;
    if (started())
    {
        var amountStr = prompt("Please enter the desired amount of defused bombs", ""+setAmount);
        setAmount = parseInt(amountStr);
        amount = setAmount;
    }    
    checkBombs();
}

// Run script every 10 ms (100 times per second)
setInterval(runScript, 10);