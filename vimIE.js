/*
 * vimIE - using CrossRider for compilation.
 * Anyone want to do this in straight BHO, nope? :P
 * Check out github.com/crowell/vimIE for latest updates!
 * (C) Jeffrey Crowell 2012, <YOUR NAME HERE, HELP OUT!!>
 * 
 */


//start some state variables here
var state = 0;      // start on state 0 = 'normal'
                    // state 1 can be 'tooltips'
                    // state 2 can be 'tooltips' in new tab
					//state 3 can be 'insert' mode
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

var closeWindow = function(keyPress)
{
	if(state === 0)
	{
		switch(keyPress)
		{
			case "x":
				window.close();
				prevKey = "";
				break;
		}
	}
	else
	{
		prevKey = prevKey.concat(keyPress);
	}
};

var goGo = function(keyPress)
{
	if(state === 0)
	{
		switch(keyPress)
		{
			case "G": //big G, go directly to bottom
				window.scrollTo(0, document.body.scrollHeight);
				break;
			case "g": //little g, check for gg
				switch(prevKey)
				{
					case "g":
						window.scrollTo(0,0); //go directly to the top 
						break;
					case "": //empty string, start capturing next one
						prevKey = prevKey.concat(keyPress);
						break;
					default:
						//reset the prevKey
						prevKey = "";
						prevKey = prevKey.concat(keyPress);
						break;
				}
		}
	}
	else
	{
		prevKey = prevKey.concat(keyPress);
	}
};

var resetNormal = function()
{
	state = 0; //go back to normal mode;
	prevKey = ""; //reset all previous keystrokes
	
	//@TODO: close out of tips for quick links
}

var insertMode = function()
{
	state = 3; //go to insert mode
	prevKey = ""; //reset all previous keystrokes
}

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
	//x closes the current tab
	appAPI.shortcut.add("x", function() 
	{
		closeWindow("x");
	}, 
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}
	);
	//esc, get out to "normal" mode, reset all vars
	appAPI.shortcut.add("esc", function()
	{
		resetNormal();
	},
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}	
	);
	//i - for insert mode.  We don't really have any plans for "insert"
	//so just disable all "normal" mode activities.
	appAPI.shortcut.add("i", function()
	{
		insertMode();
	},
		{
			type: 'keydown',
			propagate: true,
			disable_in_input: true,
			target: document
		}	
	);
});
