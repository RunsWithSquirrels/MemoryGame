
/*
 * Create a list that holds all of your cards
 */


 let cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb'
            ];
function cardIcons(card) {            
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
    let currentIndex = array.length, temporaryValue, randomIndex;

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


//Game timer
 function showTimer() {
    let timer = document.querySelector('.gameTimer');
    timer.innerHTML = time;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
        timer.innerHTML = `0${minutes}:0${seconds}`;
    } else {
        timer.innerHTML = `${minutes}:${seconds}`;
    };
};

function startTimer() {
    timerID = setInterval(() => {
        time++;
        showTimer();
    }, 1000);
};


//Start game
function startGame() {
    let deck = document.querySelector('.deck');
    let cardInfo = shuffle(cards).map(function(card) {
        return cardIcons(card);
    });

    let moves = 0;
    deck.innerHTML = cardInfo.join('');
    
    deck.addEventListener('click', function(e) {  
        if(timerOff) {
            startTimer();
            timerOff = false; 
            };  
    });
};

startGame();


//Global variables
let everyCard = document.querySelectorAll('.card');
let cardShow = [];
let moves = 0;
let moveCounter = document.querySelector('.moves');
let time = 0;
let timerID;
let deck = document.querySelector('.deck');
let timer = document.querySelector('gameTimer');
let timerOff = true;
let matchCards = 0;
const TOTAL_MATCH_PAIRS = 8;


//Code for restart
let reset = document.querySelector('.restart');
reset.addEventListener('click', function (event) {
    document.location.reload();
});


//Game code
everyCard.forEach(function(card) {
    card.addEventListener('click', function(e) {
 
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            cardShow.push(card);
            card.classList.add('open', 'show');

            
            if (cardShow.length === 2) {
                if(cardShow[0].dataset.card === cardShow[1].dataset.card) {
                    cardShow[0].classList.add('match');
                    cardShow[0].classList.add('open');
                    cardShow[0].classList.add('show');
                    
                    cardShow[1].classList.add('match');
                    cardShow[1].classList.add('open');
                    cardShow[1].classList.add('show');
                    
                    seeMatched();
                    cardShow = [];
                } else {
                    setTimeout(function() {
                        cardShow.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                
                        cardShow = [];
                    }, 1000);
                };

                moves += 1;
                moveCounter.innerText = moves;
                starCheck();
            };
        };       
    });
});

showModal();


//Code for Modal
document.querySelector('.cancel').addEventListener('click', function(e) {
    showModal();
});

document.querySelector('.replay').addEventListener('click', function(e) {
    document.location.reload();
});

document.querySelector('.close').addEventListener('click', function(e) {
    showModal();
});


function showModal() {
    let modal = document.querySelector('.modal');
    modal.classList.toggle('disappear');
};

function needStars() {
    let stars = document.querySelectorAll('.stars li');
    let starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        };
    };
    return starCount;
};

function enterGameStats() {
    let timeModal = document.querySelector('.game_clock');
    let gameTime = document.querySelector('.gameTimer').innerHTML;
    let gameMoves = document.querySelector('.game_moves');
    let gameStars = document.querySelector('.game_stars');
    let starData = needStars();

    timeModal.innerHTML = `Time = ${gameTime}`;
    gameStars.innerHTML = `Stars = ${starData}`;
    gameMoves.innerHTML = `Moves = ${moves}`;
};


//Ending game
function stopTimer() {
    clearInterval(timerID);
};

function endGame() {
    enterGameStats();
    showModal();
    stopTimer();
};

function seeMatched() {
    if (cardShow[0].dataset.card === cardShow[1].dataset.card) {
    matchCards++;
};
    if (matchCards === TOTAL_MATCH_PAIRS) {
    endGame();
    };
};


 //Remove stars during the game
function removeStar() {
    let stars = document.querySelectorAll('.stars li');
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
};

function starCheck() {
    if (moves === 12 || moves === 22) {
        removeStar();
    };
};

 
 // Special thanks to Mike Wales for his help with my code, as well as to Matthew Cranford's "Journey to Greatness" blog (https://matthewcranford.com/memory-game-walkthrough/).