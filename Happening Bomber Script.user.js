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
var amount = 42;

// Touch event to be fired on bomb
var e = new MouseEvent('touchstart', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});

function checkBombs(){
	// Select all bombs
    var x = document.querySelectorAll("main > div > .b_ > canvas");
	// Get number of bombs
    var l = typeof x !== 'undefined' ? x.length : 0;
	// If bombs are visible, 
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
// Check bombs every 10 ms (100 times per second)
setInterval(checkBombs, 10);