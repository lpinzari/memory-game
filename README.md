# Memory Game App
Memory Game is a complete browser-based card matching game to test a user's memory.

## Table of Contents

* [Game Rules](#game-rules)
* [Game Screenshots](#game-Screenshots)
* [Game Functional Requirements](#game-functional-requirements)
* [Game Design](#game-design)
* [How to Run and Play the Game](#how-to-run-and-play-the-game)
* [Credits](#credits)
* [Technologies Used](#technologies-used)
* [Dependencies](#dependencies)
* [Acknowledgement](#acknowledgement)
* [Future features](#future-features)

### Game Rules
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the  corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.


### Game Screenshots
**Fig 1. Correct match**

![alt memory](/img/memory_game_1.GIF)

**Fig 2. Winning game**

![alt modal](/img/modal_popup.GIF)



### Game Functional Requirements
The functionalities to be implemented are:

1. Create a ***deck of cards*** that randomly shuffles when game is started.
2. Create a ***counter*** and ***timer*** to display the current number of moves a player has made and the running time of a play.
3. Create a ***star rating*** (from 1 to 3) to display the player's performance.
4. Create a ***restart button*** that allows the player to reset the game board, the timer and the star rating.
5. Create a ***pop-up modal*** when player wins game. It should tell the user how much time it took to win the game, and what the star rating was. It should also allow the user to start a new game or Quit. (see **Fig 2**)
6. Handle user ***click*** interactions to ***flip the cards***. This should reveal the "hidden" side of a card. Clicking on the first card should turn it over, show the symbol, and remain turned over. Clicking on a different card must also turn it over and show the symbol.
7. Control the ***matching logic***: If the two cards match they stay turned over. If the two cards do not match they turn back.
8. Add ***styling*** to the cards when they match. (see **Fig 1**).
9. ***Usability***: All application components are usable (***responsive***) across modern desktop, tablet and mobile browsers.

### Game Design
The application consists of the following files:

* **index.html**: The DOM has a container that includes the following components:
    * *Header section*: it shows  the Game Title.
    * *score-panel section*: it shows the star rating, counter, timer and restart button.
    * *deck*: it shows the game board (unordered list) and contains the card's symbol.
    * *modal*: it controls the opacity of the page to enable the appearance of the pop-up window.
    * *result*: it shows the pop-up message and buttons.
* **app.css**: it contains the styling of the components for the game and the responsive optimization. The deck responsive design has been implemented by using a flex container and media queries.[specs: 8-9]
* **app.js**: The game starts when the page is loaded:
```
430: document.body.onload = startGame();
```


### How to Run and Play the Game
- **Run:** Click [Here](https://lpinzari.github.io/memory-game/) to play the LivePreview of the Game hosted on GitHub. If you want to run the game *locally* on your computer,you can download the files from this repository or clone them.
    - **Download**: Click the <code>Clone or download</code> green button and you'll get the *Project Zip* file. When your download finishes, unzip the file and open the <code>index.html</code> on your browser.
    - **Clone**: type into your terminal the following <code> $ git clone https://github.com/lpinzari/memory-game.git</code>. When it finishes cloning, open the <code>index.html</code> file on your browser.

- **Play:** The application is usable on desktop and tablet touch screen and mobile browsers.
    - *Desktop*: To flip the cards use the left button of your mouse or trackpad.
    - *tablet/mobile*: To flip the cards just touch the secreen over the selected card.


### Credits
- For shuffling the cards  the *shuffle(array)* Javascript function was used from [http://stackoverflow.com/a/2450976](http://stackoverflow.com/a/2450976)
- For converting seconds into the format 00:00 (minutes:seconds) the *timeToDisplay(secs)* Javascript function was used from [https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript](https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript)

### Technologies Used
- **HTML** | **CSS** | **JS**

### Dependencies
- [Fontawsome 4.6.1](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css) to display the card's symbol.
- [Google Fonts](https://fonts.googleapis.com/css?family=Kalam) to display the Game's title.

### Acknowledgement
I'd like to thank the Udacity's mentors and instructors for the useful advices.

### Future features
- Add CSS animations when cards are clicked, unsuccessfully matched, and successfully matched.
- Add keyboard shortcuts for gameplay.

#### Author
Ludovico Pinzari

#### License
MIT
