
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


//Game timer
 function showTimer() {
    var timer = document.querySelector('.gameTimer');
    timer.innerHTML = time;
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    if (seconds < 10) {
        timer.innerHTML = `${minutes}:0${seconds}`;
    } else {
        timer.innerHTML = `${minutes}:${seconds}`;
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
    if(everyCard.classList.contains('match')) {
        clearInterval(timerID);
        timerOff = true;
    };
};


//Start game
function startGame() {
    var deck = document.querySelector('.deck');
    var cardInfo = shuffle(cards).map(function(card) {
        return cardIcons(card);
    });

    moves = 0;
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
var everyCard = document.querySelectorAll('.card');
var cardShow = [];
var moves = 0;
var moveCounter = document.querySelector('.moves');
var time = 0;
var timerID;
var deck = document.querySelector('.deck');
var timer = document.querySelector('gameTimer');
var timerOff = true;



//Code for Modal
function showModal() {
    var popup = document.querySelector('.modal');
    popup.classList.toggle('disappear');
};

function needStars() {
    var stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        };
    };
    console.log(starCount);
    return starCount;
};

function enterGameStats() {
    var timeModal = document.querySelector('.game_clock');
    var gameTime = document.querySelector('.gameTimer').innerHTML;
    var gameMoves = document.querySelector('.game_moves');
    var gameStars = document.querySelector('.game_stars');
    var starData = needStars();

    timeModal.innerHTML = `Time = ${gameTime}`;
    gameMoves.innerHTML = `Moves = ${moves}`;
    gameStars.innerHTML = `Stars = ${starData}`;
};


document.querySelector('.cancel').addEventListener('click', function (event) {
    showModal();
});
document.querySelector('.replay').addEventListener('click', function (event) {
    showModal();
    document.location.reload();
});
document.querySelector('.close').addEventListener('click', function (event) {
    showModal();
});


//Ending game
function endGame() {
    stopTimer();
    enterGameStats();
    showModal();
};


//Code for restart
var reset = document.querySelector('.restart');
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
                if(cardShow[0].dataset.card == cardShow[1].dataset.card) {
                    cardShow[0].classList.add('match');
                    cardShow[0].classList.add('open');
                    cardShow[0].classList.add('show');
                    
                    cardShow[1].classList.add('match');
                    cardShow[1].classList.add('open');
                    cardShow[1].classList.add('show');
                    
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

if (everyCard.classList.contains('match')) {
    endGame();
};    

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
    if (moves === 12 || moves === 22) {
        removeStar();
    };
};

 
 // Special thanks to Mike Wales for his help with my code, as well as to Matthew Crawford (https://matthewcranford.com/memory-game-walkthrough/).