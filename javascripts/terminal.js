$(document).ready(function() {

	var makeLine = function(text) {
		// Print out text given, wraps at spaces if needed
		if (text.length > maxChars + 2) {
			var i = maxChars + 2;
			var subText = text.slice(0, i);
			while (subText[subText.length - 1] != " ") {
				i--;
				subText = text.slice(0, i);
			}
			makeLine(subText);
			makeLine(text.slice(i));

		} else {
			$(".terminal").append("<div class='terminalLine'><pre><span class='terminalText'>" + text + "</span></pre></div>");
		}
	};

	var makeInput = function() {
		// Make input line
		$(".terminal").append("<div class='terminalInput terminalText'>$ <input class='field' type='text' maxlength='" + maxChars +"' /></div>");
		$(".field").focus();
	};

	var makeHelp = function() {
		// Print help text
		var commands = ["whoami ", "ls ", "rget ", "clear ", "reset ", "help "];
		var helpTexts = [" display bio", " list skills", " open resume", " clear terminal", " reset terminal", " display this help text"];
		for (var i = 0; i < commands.length; i++) {
			makeLine((commands[i] + "..........").slice(0, 10) + helpTexts[i]);
		}
	};

	var makeBio = function() {
		// Print bio
		var now = moment();
		var birth = moment("07-30-1993", "MM-DD-YYYY");
		var age = now.diff(birth, "years");
		var bioText = "I'm a" + (String(age)[0] === "8" ? "n " : " " ) + age + "-year-old engineering student at Olin College in Needham, MA. "; 
		bioText += "I hail from the state of Iowa, play the trumpet, enjoy puzzles, and have an interest in 3D printing. ";
		bioText += "See more about me on the About page! ";
		makeLine(bioText);
	};

	var listSkills = function() {
		// Print skills
		var skills = ["Python", "JS", "jQuery", "Node.js", "Arduino C", "LaTeX", "MATLAB", "LTspice"];
		var skillText = "";
		for (var i = 0; i < skills.length; i++) {
			skillText += (skills[i] + "            ").slice(0, 12);
		}
		makeLine(skillText);
	};

	var initialText = "What would you like to do? (type 'help' for options)";
	var undefText = "That command is undefined; try something else. (type 'help' for options)";
	var maxLines = 9;
	var maxChars = 72;

	// Initialize terminal contents
	makeLine(initialText);
	makeInput();

	$(".terminal").click(function() {
		$(".field").focus();  // Put input field in focus if anywhere in terminal is clicked
	});

	// Take action when ENTER key is pressed
	$(document).keydown(function(key) {
		if (parseInt(key.which, 10) === 13) {
			var input = $.trim($(".field").val()).toLowerCase();
			$(".terminalInput").remove();
			makeLine("$ " + input);
			
			switch (input) {
				case "whoami":
					makeBio();
					break;
				case "ls":
					listSkills();
					break;
				case "rget":
					window.open("JacobKingeryResume.pdf");
					break;
				case "clear":
					$(".terminalLine").remove();
					break;
				case "help":
					makeHelp();
					break;
				case "reset":
					$(".terminalLine").remove();
					makeLine(initialText);
					break;
				default:
					makeLine(undefText);
					break;
			}

			while ($(".terminalLine").length > maxLines) {
				$(".terminal").children("div:first").remove();  // Make sure terminal doesn't overflow
			}

			makeInput();  // Make next input field
		}
	});
});
