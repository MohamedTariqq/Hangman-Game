// Letters
const Letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From letters
let lettersArray = Array.from(Letters);
console.log(lettersArray);

// Select Letters container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Creat span
  let span = document.createElement("span");

  //   Creat letter Text Node
  let theLetter = document.createTextNode(letter);

  //Append Letter to span
  span.appendChild(theLetter);

  //   Add Class on span
  span.className = "letter-box";

  //   Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words and Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random Property
let allKeys = Object.keys(words); //['programming', 'movies', 'people', 'countries']
// Random Number Depend on key Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropNumber]; //random of ['programming', 'movies', 'people', 'countries']
// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend on Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chossen Word
let randomValueValue = randomPropValue[randomValueNumber];

//Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");

// Convert Chossen word to Arrray
let letterAndSpace = Array.from(randomValueValue);

// Creat Spans Depends On Word
letterAndSpace.forEach((letter) => {
  // Creat Empty Span
  let emptySpan = document.createElement("span");

  //   If letter is space
  if (letter === " ") {
    // Add Class To Span
    emptySpan.className = "with-space";
  }
  //   Append spans to the letter Guess Container
  letterGuessContainer.appendChild(emptySpan);
});

// Select Guess SPan
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set wrong Attemps
let wrongAttemps = 0;

// Select The Draw Elements
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking on letters
document.addEventListener("click", (e) => {
  // Set The Chose status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chossen Word
    let theChodenWord = Array.from(randomValueValue.toLowerCase());

    theChodenWord.forEach((wordLetter, wordIndex) => {
      // If Clicked Letter = To one Of Chossen Word Letter
      if (theClickedLetter === wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop in all guess span
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    //Outside Loop

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase Wrong Attempts
      wrongAttemps++;

      //   Add class wrong on draaw element
      theDraw.classList.add(`wrong-${wrongAttemps}`);

      //   play fail sound
      document.getElementById("fail").play();

      if (wrongAttemps === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      //   play sucess sound
      document.getElementById("success").play();
    }
  }
});
// End Game Function
function endGame() {
  // Creat popup Div
  let div = document.createElement("div");

  // Creat Text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );

  //   Append Text To Div
  div.appendChild(divText);

  // Add Class on Div
  div.className = "popup";

  //   Append To The body
  document.body.appendChild(div);
}
