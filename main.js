const letters = 'abcdefghijklmnopqrstuvwxyz';
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector('.letters');

lettersArray.forEach(letter => {
    let span = document.createElement('span');
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "java", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
let allKeys = Object.keys(words);

let randomNumber = Math.floor(Math.random() * allKeys.length);
let randomCategore = allKeys[randomNumber];
let randomValues = words[randomCategore];

let randomValueNumber = Math.floor(Math.random() * randomValues.length);
let randomValue = randomValues[randomValueNumber];

document.querySelector('.game-info .category span').innerHTML = randomCategore;


let letterGuessContainer = document.querySelector('.letters-guess');
let lettersAndSpace = Array.from(randomValue);
lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement('span');
    if (letter === ' ') {
        emptySpan.className = 'has-space';
    }
    letterGuessContainer.append(emptySpan);
});

let guessSpans = document.querySelectorAll('.letters-guess span');

let wrongAttemps = 0;
let theDraw = document.querySelector('.hangman-draw');

document.addEventListener('click', (e) => {
    let theStatus = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add('clicked');
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        let theChosenWord = Array.from(randomValue.toLowerCase());

        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (theClickedLetter == wordLetter) {
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
        if (theStatus !== true) {
            wrongAttemps++;
            theDraw.classList.add(`wrong-${wrongAttemps}`);
            if (wrongAttemps === 8) {
                lettersContainer.classList.add('finished');
                endGame();
            }
        }
    }
});

function endGame() {

    let div = document.createElement('div');
    let divText = document.createTextNode(`Game Over , The Word Is ${randomValue}`);

    div.appendChild(divText);
    div.classList.add('popup');

    document.body.appendChild(div);
}


