// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 };

 // your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt(str) {
   str = input.question("Let's play some scrabble!\n\nEnter a word: ");
   return str;
}

let simpleScore = function(word){
  word = word.toUpperCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i ++){
    letterPoints += 1;
  }
  return letterPoints;
};
//console.log(simpleScore(initialPrompt()))
let vowelBonusScore = function(word){
  word = word.toUpperCase();
  let letterPoints = 0;
  let vowels = ["A", "E", "I", "O", "U"];
  for (let i = 0; i < word.length; i ++){
    if (vowels.includes(word[i])){
      letterPoints += 3;
    } else{
      letterPoints += 1;
    }
  }
  return letterPoints;
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScore(word){
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i ++){
    for(const letter in newPointStructure){
      if (letter === word[i]){
        letterPoints += parseInt(newPointStructure[letter])
      }
    }

  }
  return letterPoints;
}

const scoringAlgorithms = [
  {
    "name": "Simple Score",
    "description": "Each letter is worth one point.",
    scoringFunction: simpleScore
  },
  {
    "name": "Bonus Vowels",
    "description": "Vowels are 3 pts, Consonants are 1 pt..",
    scoringFunction: vowelBonusScore
  },
  {
    "name": "Scrabble",
    "description": "The traditional scoring algorithm",
    scoringFunction: oldScrabbleScorer
  }
];

scoringAlgorithms.splice(2, 1, {"name": "Scrabble", "description": "The traditional scoring algorithm", scoringFunction: scrabbleScore})

function scorerPrompt() {
   str = input.question("Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2:  ")
   return str;
};

function transform(obj){
  let newPointStructure = {}
  for (key in oldPointStructure){
    for (let i = 0; i < oldPointStructure[key].length; i ++){
      newPointStructure[oldPointStructure[key][i]] = key;
    }
    }
    return newPointStructure;
};

function runProgram() {
  let word = initialPrompt();
  let score = scorerPrompt();
  console.log(`Score for ${word}: ${scoringAlgorithms[score].scoringFunction(word)}`)
}
   
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};
