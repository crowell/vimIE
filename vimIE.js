/*
 * vimIE - using CrossRider for compilation.
 * Anyone want to do this in straight BHO, nope? :P
 * Check out github.com/crowell/vimIE for latest updates!
 * (C) Jeffrey Crowell 2012, <YOUR NAME HERE, HELP OUT!!>
 * 
 */

 //features in first commit
//HJKL for nav

//start some state variables here
var state = 0;      // start on state 0 = 'normal'
                    // state 1 can be 'tooltips'
                    // state 2 can be 'tooltips' in new tab
var prevKey = "";   // the previous key press, for multiple presses

//end state variables
var pressedHJKL = function(keyPress)
{
	if(state === 0)
    {
		switch(keyPress)
		{
			case "h":
				window.scrollBy(-15,0); //scroll left
				prevKey = ""; //don't care anymore
				break;
			case "j":
				window.scrollBy(0,15); //scroll down
				prevKey = ""; //don't care anymore
				break;
			case "k":
				window.scrollBy(0,-15); //scroll up
				prevKey = ""; //don't care anymore
				break;
			case "l":
				window.scrollBy(15,0); //scroll right
				prevKey = ""; //don't care anymore
				break;
			case "H":
				history.go(-1); //go back in history 1
				prevKey = "";
				break;
			case "L":
				history.forward(); //go forward in history 1
				prevKey = "";
				break;
		}
    }
    else
    {
        prevKey = prevKey.concat(keyPress);
    }
};



//start up the appAPI (thanks crossrider)
appAPI.ready(function($){

	//start Left/Down/Up/Righ nav
	//"h" for left
	appAPI.shortcut.add("h", function() 
	{
		pressedHJKL("h");
	}, 
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}
	);
	//"j" for down
	appAPI.shortcut.add("j", function() 
	{
		pressedHJKL("j");
	}, 
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}
	);
	//"k" for up
	appAPI.shortcut.add("k", function() 
	{
		pressedHJKL("k");
	}, 
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}
	);
	//"l" for right
	appAPI.shortcut.add("l", function() 
	{
		pressedHJKL("l");
	}, 
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}
	);
	//end the moving the page
	//now start with History/Tab switching
	//Shift + H go back 1 in history
	appAPI.shortcut.add("Shift+H", function() 
	{
		pressedHJKL("H");
	}, 
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}
	);
	//Shift + L to go forward 1 in history
	appAPI.shortcut.add("Shift+L", function() 
	{
		pressedHJKL("L");
	}, 
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}
	);
   
});
