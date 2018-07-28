
/*
 * Create a list that holds all of your cards
 */


 var cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb'
            ];
function generateCard(card) {            
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function showTimer() {
    var timer = document.querySelector('.gameTimer');
    timer.innerHTML = time;
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    if (seconds < 10) {
        timer.innerHTML = `0${minutes}:0${seconds}`;
    } else {
        timer.innerHTML = `0${minutes}:${seconds}`;
    };
    if (minutes < 10) {
        timer.innetHTML = `0${minutes}:${seconds}`;
    } else {
        timer.innerHTM = `${minutes}:${seconds}`;
    };
};

function startTimer() {
    time = 0;
    let timerID = setInterval(() => {
        time++;
        showTimer();
    }, 1000);
};

function stopTimer() {
    clearInterval(timerID);
};


function initGame() {
    var deck = document.querySelector('.deck');
    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    moves = 0;
    deck.innerHTML = cardHTML.join('');
    
    deck.addEventListener('click', function(e) {  
        if(timerOff) {
            startTimer();
            timerOff = false; 
            };
    });
    
};

initGame();


//Code for restart
var reset = document.querySelector('.restart');
reset.addEventListener('click', function (event) {
    document.location.reload();
});

//Global variables
var allCards = document.querySelectorAll('.card');
var openCards = [];
var moves = 0;
var moveCounter = document.querySelector('.moves');
var time = 0;
var timerID;
var deck = document.querySelector('.deck');
var timer = document.querySelector('gameTimer');
var timerOff = true;



allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
 
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');
            
            if (openCards.length == 2) {
                if(openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');
                    
                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');
                    
                    openCards = [];
                } else {
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                
                        openCards = [];
                    }, 1000);
                }
                moves += 1;
                moveCounter.innerText = moves;
                starCheck();
            }
        }
    });
});

// Code for Modal
function openModal() {
    var popup = document.querySelector('.modal');
    popup.classList.toggle('disappear');
};

function enterGameStats() {
    var timeModal = document.querySelector('.game-clock');
    var gameTime = document.querySelector('.gameTimer').innerHTML;
    var gameMoves = document.querySelector('.game_score');
    var gameStars = document.querySelector('.game_stars');
    var starData = needStars();

    timeModal.innerHTML = `Time = ${gameTime}`;
    gameMoves.innerHTML = `Moves = ${moves}`;
    gameStars.innerHTL = `Stars = ${starData}`;
};

function needStars() {
    var stars = document.querySelector('.stars li');
    starsCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        };
    };
    console.log(starCount);
    return starCount;
};

document.querySelector('.cancel').addEventListener('click', function (event) {
    openModal();
});

document.querySelector('.replay').addEventListener('click', function (event) {
    openModal();
    document.location.reload();
});

document.querySelector('.close').addEventListener('click', function (event) {
    openModal();
});

 //Remove stars during the game
function removeStar() {
    var stars = document.querySelectorAll('.stars li');
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
};

function starCheck() {
    if (moves === 12 || moves ===22) {
        removeStar();
    };
};

//Ending game

function endGame() {
    if (allCards.classList.contains('match')) {
        stopTimer();
        enterGameStats();
        openModal();
    };
};
 
 // Special thanks to Mike Wales for his help with my code, as well as to Matthew Crawford (https://matthewcranford.com/memory-game-walkthrough/).