/**
* Copyright (c) 2019
* @author Ludovico Pinzari
* @summary this javascript file contains the main logic of the Memory game
* application. A card can assume three different states indicated by the
* class of the HTML Element:
*   status  classes
*---------------------------
* - close:  card
* - open:   card show open
* - match:  card match
* ---------------------------
* The game is over when all the cards are matched
*/


/******************************************************
*    Variables Declarations                           *
*******************************************************/

// Game status
let gameOver = false;

// Total guesses (pairs of cards flipped)
let movesCount = 0;

// Total pairs of cards matched (maximum: 8)
let correctPairs = 0;

// Elapsed time (seconds)
let secs = 0;

// Stars displayed (score)
let rating = 3;

// pair of open cards flipped
let openCards = [];

// Timer (Game clock)
let timerId = undefined;



//------------------ DOM variables -------------------- //

// score panel Elements (Stars icon, moves, current time, restart)
let stars = document.querySelector('.stars');
let moves = document.querySelector('.moves');
let time = document.querySelector('.time');
let restart = document.querySelector('.restart');

// deck Element and cards Elements
const deck = document.querySelector('.deck');
let cards = document.getElementsByClassName("card");

// modal Elements - (new game button, exit game button)
let okbutton = document.querySelector('#ok-Button');
let nobutton = document.querySelector('#no-Button');




/*********************************************
 *                   FUNCTIONS               *
 *********************************************/

//------- Initialization functions -------------/

/**
* @desc resetting game status
*/
function resetGame(){

    gameOver = false;
}

/**
* @desc resetting rating and stars icons displyed
*/
function resetRating(){

    rating = 3;
    let starlist = stars.children;
    for (let star of starlist) {
        star.innerHTML='<li><i class="fa fa-star"></i></li>';
    }

}

/**
* @desc resetting moves and move counter displayed
*/
function resetMoves(){

    movesCount = 0;
    moves.textContent = movesCount;

}
/**
* @desc resetting time and time displayed
* @see timeToDisplay(secs)
*/
function resetTime(){

    secs = 0;
    time.textContent = timeToDisplay(secs);
}

/**
* @desc shuffle cards and close the cards
* @see getCardsSymbols() shuffle(symbols) createDeck(symbols)
*/
function resetDeck(){

    correctPairs = 0;
    openCards = [];

    // retrieves the cards symnols
    symbols = getCardsSymbols();

    // shuffle cards symbols
    symbols = shuffle(symbols);

    // create new deck with the symbols card hidden
    createDeck(symbols);


}

/**
* @desc reset timer object
*/
function resetTimer(){

    timerId = undefined;

}

//----------Initialization  Supporting functions -------------------------- //

/**
* @desc returns an array containing the cards symbols in the initial deck
* @return {array} String
*/
function getCardsSymbols(){

    symbols = [];
    for(let card of cards){
        symbol = card.firstElementChild.classList.value
        symbols.push(symbol);
    }
    return symbols;
}


/**
* @desc remove classes to close the cards and assign symbols class to the cards
* @param {array} String
*/
function createDeck(symbols){

    i = 0;
    for(let card of cards){
        card.classList.remove('show','open','match');
        symbol = card.firstElementChild;
        classes = symbol.classList.value.split(' ');
        symbol.classList.remove(classes[0],classes[1]);
        classes = symbols[i].split(' ');
        symbol.classList.add(classes[0],classes[1]);
        i++;
    }
}

/**
* @desc shuffle an array of elements
* @param {array}
* @return {array}
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// ------ Game logic supporting functions ---------------------//

/**
* @desc set classes to open a closed card
* @param {Element} closed card
*/
function showCard(card) {

    card.classList.add('open','show');

}
/**
* @desc set class to show matched card
* @param {Element} opened card
*/
function matchCard(card) {

    card.classList.remove('open','show');
    card.classList.add('match');
}
/**
* @desc remove classes of opened card to flip it back
* @param {Element} opened card
*/
function flipBack(card) {

    setTimeout(() => {
       card.classList.remove('open', 'show');
   }, 650);

}
/**
* @desc add a card to the set of opened cards
* @param {Element} opened card
*/
function addCard(card) {

    openCards.push(card);
}
/**
* @desc increment the moves counter and display the updated moves
*       and update the star rating
* @see updateRating()
*/
function incrementMoves(){

    movesCount++;
    moves.textContent = movesCount;
    updateRating();
}
/**
* @desc update the star rating on the basis of the move counter
*       and display the update.
*/
function updateRating(){

    switch(movesCount){

        case 12:
            rating--;
            stars.lastElementChild.innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
            break;
        case 22:
            rating--;
            stars.firstElementChild.nextElementSibling.innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';

    }
}
/**
* @desc returns the number of cards opened
* @return {int}
*/
function selectedCards(){

    return openCards.length;
}

/**
* @desc check if an Element attached to the click event is
*       an opened cards
* @return {boolean}
*/

function isClosedCard(event){

    let element = event.target;
    let classes = element.classList;

     if (classes.contains('card') && classes.length == 1)
        return true;

    return false;
}


/**
* @desc returns the game status
* @return {boolean}
*/
function isGameOver(){

    return gameOver;
}

/**
* @desc compare two open cards and diplayed the matched cards or close if unmatched.
*       update the move counter and correct pairs.
* @see incrementMoves() matchCard(card) flipBack(card)
*/
function checkCards() {


    if (openCards.length == 2) {

        incrementMoves();

        let symbol1 = openCards[0].children[0].classList.toString();
        let symbol2 = openCards[1].children[0].classList.toString();


        if (symbol1 === symbol2){

            matchCard(openCards[0]);
            matchCard(openCards[1]);
            correctPairs++;

        } else {

            flipBack(openCards[0]);
            flipBack(openCards[1]);
        }

    openCards = [];

    }
}

/**
* @desc update the game status based on the number of matched pairs
*/
function checkGame() {

    if (correctPairs == 8){

        gameOver = true;
    }
}

/**
* @desc display the results of the pop-up screen victory
* @see displayRating()
*/
function displayResult() {

    modal.style.display = 'block';
    result.style.display = 'block';

    h1Res.innerHTML = 'Congratulations!';

    starRating = displayRating();
    finalText = 'Do you want to start a New Game? '
    //pRes.innerHTML = 'You have scored ' + starRating + ' out of 3 in ' + secs + ' seconds. '+ 'Click [Play] to play again.';
    pRes.innerHTML = 'You\' ve completed the game in ' + secs + ' seconds and scored  ' + starRating + ' out of 3. <br>'+ finalText;
}

/**
* @desc returns a string represting the HTML of the star rating icons
* @return {string}
*/
function displayRating(){

    s = '';
    for(let i=0; i<rating; i++){
        s+= '<i class="fa fa-star"></i>';
    }

    return s;
}

/**
* @desc returns a string represting the number of seconds in the time format 00:00
* @return {string}
*/

// function from stackoverflow
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript

function timeToDisplay(seconds) {
        //var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
}

/**
* @desc starts the timer of the game and loop until the game is over.
* @see timeToDisplay(secs)
*/
function startTimer(){

    // base case
    if (isGameOver()) {
        // stop the time out and the function as well
        clearTimeout(timerId);
        timerId = null;
        return;
    }

    secs++;
    time.textContent = timeToDisplay(secs);


    //recurring function - update time every second
    timerId = setTimeout(function(){startTimer();},1000);
}


/**********************************************
*             MAIN GAME                       *
***********************************************/

// start a new game when the page is loaded
document.body.onload = startGame();

/**
* @desc start a new game
*/
function startGame(){

    resetGame();
    resetRating();
    resetMoves();
    resetTime();
    resetDeck();
    resetTimer();
    startTimer();
}

// reload the page
function restartGame(){

    location.reload();
}


 /********************************************
 *         Click Event Listener              *
 *********************************************/


// Set up an event listener for a click on card
deck.addEventListener('click',flipCard);

// Set up an event listener for a click on the restart icon
restart.addEventListener('click',restartGame);

// Set up an event listener for a click on the Yes button of the modal
okbutton.addEventListener('click',startNewGame);

// Set up an event listener for a click on the No button of the modal
nobutton.addEventListener('click',exitGame);




/*---Functions attached to the click Event listeners ---*/

/**
* @desc Check if the cards open (flipped) have the same symbol and update the game status
* @param {Element} element clicked on the deck (game board)
*/
function flipCard(event){

    // See if the deck has no more than one card selected and check if the element clicked is a closed card.
    if (selectedCards() < 2 && isClosedCard(event)){

        var card = event.target;
        showCard(card);//element
        addCard(card);//element
        checkCards();
        checkGame();

        if (isGameOver()) {

            displayResult();
        }

     }

}

/**
* @desc close the pop up victory screen and reload the page
*/
function startNewGame () {

    modal.style.display = 'none';
    result.style.display = 'none';
    location.reload();

}

/**
* @desc close the pop up victory screen
*/
function exitGame (){

    modal.style.display = 'none';
    result.style.display = 'none';
}
