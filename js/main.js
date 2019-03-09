'use strict';
//===========Elements===========
var allCards = document.querySelector('#game'), item;
var board = document.getElementById('board');
var cardsList = document.querySelectorAll('.card');
var cardA, cardB;
var spans = document.querySelectorAll('.card span');
// var numberOfOpen = [];
var newGameBtn = document.getElementById('new-game');
var seconds = document.getElementById('seconds');
var numberOfClicks = 0;
var totalClicks = 0;
var points = 0;
var user = localStorage.getItem('user');
//==========Main Functions============
document.getElementById('username').textContent = user;

var hideAllCards = function(){ 
    for(var y=0; y<spans.length; y++){
        spans[y].style.visibility = 'hidden';
    }
}
hideAllCards();

var timer = function () {     
    var countingTime = function () {          
        var currentTime = parseFloat(seconds.textContent);
        if (currentTime > 0 && points != 12) {
            seconds.textContent = currentTime - 1;
        } else {
            window.clearInterval(time);
            allCards.classList.toggle('disableClick');
            localStorage.clear();
            //==========Smaller Screens==========
            if(window.innerWidth < 1230){
                allCards.style.display = 'none';
                board.style.display = 'flex';
            }
            //==========Larger Screens==========
            //calculate the results bars: --Figure out calculations and the layout
                var bars = document.querySelectorAll('.bar');
                var score = document.getElementById('score');
                var rate = document.getElementById('rate');
                var finalTime = document.getElementById('time');
            
                for(var m = 0; m < bars.length; m++){
                    bars[m].style.visibility = 'visible';
                    score.style.height = (points * 8.3) + '%';
                    rate.style.height = points / ((totalClicks / 2) / 100) + '%';
                    finalTime.style.height = (59 - currentTime) +'%';
                }
            
        }
    };
    var time = window.setInterval(countingTime, 1000);
};  

var shuffleCards = function(){
    //shuffle
    for (item = allCards.children.length; item >= 0; item--) {
        allCards.appendChild(allCards.children[Math.random() * item | 0]); //this card | 0 uses bitwise operator to escape decimal numbers.
    }
    //hide cloak
    if(document.getElementById('cloak').style.display != 'none'){
        document.getElementById('cloak').style.display = 'none';
    }
    //disable new game button
    newGameBtn.disabled = true;
}

var onCardClick = function(clickedCard){
    var activeCard = clickedCard.target;

    var card = {
        tile: activeCard,
        span: activeCard.firstChild,
        value: activeCard.textContent,
        reveal: function(){
            this.span.style.visibility = 'visible';
            this.tile.classList.add('disableClick');
        },
        match: function(){
            this.tile.classList.add('match');
        },
        hide: function(){
            this.tile.classList.remove('match', 'disableClick');
            this.span.style.visibility = 'hidden';
        }
    }

    numberOfClicks++;
    totalClicks++;
     
    if(numberOfClicks === 1){
    cardA = Object.create(card);
    cardA.reveal();
    }

    function createB(){
        if(numberOfClicks === 2){
        cardB = Object.create(card);
        console.log('Closure works, if this cardA isn\'t undefiend= ' + cardA);
        cardB.reveal();

            if(cardA.value === cardB.value){
                cardA.match();
                cardB.match();
                points++;
            } else {
                allCards.classList.add('disableClick'); 
                setTimeout(function(){
                    cardA.hide();
                    cardB.hide();
                    allCards.classList.remove('disableClick'); 
                }, 400); 
            }
            numberOfClicks = 0;
        }
        
    } createB();
    
}

//==========Event Listeners==========
newGameBtn.addEventListener('click', function(){shuffleCards(); timer();});
for(var i = 0; i < cardsList.length; i++) {cardsList[i].addEventListener('click', onCardClick, false);}

