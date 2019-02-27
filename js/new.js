'use strict';
//===========Elements===========
var allCards = document.querySelector('#game'), item;
var board = document.getElementById('board');
var cardsList = document.querySelectorAll('.card');
var spans = document.querySelectorAll('.card span');
var numberOfOpen = [];
var newGameBtn = document.getElementById('new-game');
var seconds = document.getElementById('seconds');
var numberOfClicks = 0;
var points = 0;
var user = localStorage.getItem('user');
//==========Main Functions============
document.getElementById('username').textContent = user;

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
                    rate.style.height = points / ((numberOfClicks / 2) / 100) + '%';
                    finalTime.style.height = (59 - currentTime) +'%';
                }
            
        }
    };
    var time = window.setInterval(countingTime, 1000);
};  

var hideAllCards = function(){ 
    for(var y=0; y<spans.length; y++){
        spans[y].style.visibility = 'hidden';
    }
}
hideAllCards();

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

var onCardClick = function(card){
    var clickedSpan = card.target.firstChild;
        numberOfClicks++
        if (clickedSpan.style.visibility = 'hidden'){
            clickedSpan.style.visibility = 'visible';
            clickedSpan.parentElement.classList.add('disableClick');
            numberOfOpen.push(clickedSpan);
            }

    console.log(numberOfOpen);
    
    checkCards();
}

var checkCards = function(){
    if (numberOfOpen.length === 2 && numberOfOpen[0].innerText != numberOfOpen[1].innerText){
        for(var z = 0; z < cardsList.length; z++){
        cardsList[z].classList.add('disableClick');
        setTimeout(hideUnmatchCards, 400);
        }        
    } else if (numberOfOpen.length === 2 && numberOfOpen[0].innerText === numberOfOpen[1].innerText){
        numberOfOpen[0].parentElement.classList.add('card', 'match');
        numberOfOpen[1].parentElement.classList.add('card', 'match');
        numberOfOpen.length = 0;
        points++;
    }
}

var hideUnmatchCards = function(){ 
    for(var y=0; y<spans.length; y++){
        if(spans[y].parentElement.classList.contains('match') === false){
        spans[y].style.visibility = 'hidden';
        spans[y].parentElement.classList.remove('disableClick');
        }
        numberOfOpen.length = 0;
    }
}

//==========Event Listeners==========
newGameBtn.addEventListener('click', function(){shuffleCards(); timer();});
for(var i = 0; i < cardsList.length; i++) {cardsList[i].addEventListener('click', onCardClick, false);}

