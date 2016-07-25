var inquirer = require('inquirer');
var lettersInWord = [];
var wordArray = ["taekwondo", "kungfu", "karate", "aikido", "kempo", "hapkido", "jiujitsu", "judo", "savate", "muaythai", "boxing", "kravmaga"];
var wordSelected = "";
var letterCount = "";
var wordDisplay = "";
var letterGuessed = "";
var guesses = 10;



function startGame() {

	wordSelected = new Word(wordArray[Math.floor(Math.random() * wordArray.length)]);
	wordSelected.lettersToBank();
	prompt();

};

function prompt() {
	console.log("Guesses remaining " + guesses);
	inquirer.prompt([{
		name: "guess",
		message: "Guess a letter!"
		}]).then(function(answer) {
				letterGuessed = new Letters(answer.guess);
				letterGuessed.checkLetters();

			})
	}

var Word = function (wrd) {
	this.word = wrd;
	this.wordBank = [];
	this.lettersToBank = function() {

		this.lettersInWord = this.word.split("");
		letterCount = this.lettersInWord.length;

		for (i = 0; i < this.lettersInWord.length; i++) {
			this.wordBank.push("_");
		}
		
		this.wordDisplay = this.wordBank.join(" ");
		console.log("Current word: " + this.wordDisplay);	
	}
};
	

var Letters = function(lttr) {	
	
	this.letter = lttr;
	this.checkLetters = function() {
		var letterFound = false;

		for (var i = 0; i < wordSelected.lettersInWord.length; i++) {

			if (this.letter == wordSelected.lettersInWord[i]) {
				letterCount--;
				letterFound = true;
			}
		}
		
		if (letterFound == true) {

			for(var i = 0; i < wordSelected.lettersInWord.length; i++) {
				if (wordSelected.lettersInWord[i] == this.letter)  {
					wordSelected.wordBank[i] = this.letter;
				}
			}
			wordSelected.wordDisplay = wordSelected.wordBank.join(" ");
			console.log("Current word: " + wordSelected.wordDisplay);
			console.log("Correct!");
		}

		else {

			wordSelected.wordDisplay = wordSelected.wordBank.join(" ");
			console.log("Current word " + wordSelected.wordDisplay);
			console.log("Incorrect!");
			guesses--
		}

		if (letterCount === 0) {
			console.log("You guessed every letter in the word. You win!");
		}

		else if (guesses === 0) {
			console.log("You have run out of guesses. Game over.");
		}

		else {
			prompt();
		}
	}

};

startGame();


