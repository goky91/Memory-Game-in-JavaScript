
    //main
    console.log('JS CONNECTED');
    let cardClosed = document.querySelectorAll(".card");
    let cardsValues = [];
    let cardsSpans = [];
    let currentScore = [];
    let newGameButton = document.getElementById('new-game');
    //shuffle cards at the beginning
      let list = document.querySelector('#game'), star;
      let randomizeCards = function(){
          for (star = list.children.length; star >= 0; star--) {
              list.appendChild(list.children[Math.random() * star | 0]);
          }
      }
      randomizeCards();
      // clicking the cards on the board
      function onCardClick() {                    
        if (this.classList.contains("card")) {
          
            this.classList.add("open");
            this.classList.remove("card");

            cardsValues.push(this.innerHTML);
            cardsSpans.push(this);
            console.log(cardsValues);

        } else if (this.classList.contains('match')) {
                console.log('these are already matched');
            } else {
                  this.classList.add("card");
                  this.classList.remove("open");
                  cardsValues.pop(this.innerHTML);
                  cardsSpans.pop(this);
            }

            if (cardsValues.length === 2) {
              console.log('two cards are selected');
              if (cardsValues[0] === cardsValues[1]) {
                console.log(`we have a match ${cardsValues[0]}, ${cardsValues[1]}`);
                
                cardsSpans[0].classList.add('match');
                cardsSpans[0].classList.remove('open');
                cardsSpans[1].classList.add('match');
                cardsSpans[1].classList.remove('open');

                cardsValues = [];
                cardsSpans = [];

              // current score is counting when we have a match
                currentScore.push(1);
                console.log(`Current score is ${currentScore.length}`);

              //quick clicking problem 
                } else if (cardsValues.length > 2) {
                  console.log('more than two cards are selected, reseting...');
                    } 
              //quick clicking problem 
                    else {
                      setTimeout(reseting, 500);
                      function reseting() {
                        cardsSpans[0].classList.add('card');
                        cardsSpans[0].classList.remove('open');
                        cardsSpans[1].classList.add('card');
                        cardsSpans[1].classList.remove('open');
                        cardsValues = [];
                        cardsSpans = [];
                        console.log('different cards are reseted');
                        }
                    } 
            }
      }    
      // Timer 
      let countdown = document.getElementById('countdown');
      console.log(countdown);
      newGameButton.disabled = true;  
      
      let timerEngine = function () {     
            newGameButton.disabled = true;
            
        let countingTime = function () {          
          let currentTime = parseFloat(countdown.textContent);
          if (currentTime > 0) {
            countdown.textContent = currentTime - 1;
          } else {
            window.clearInterval(timer);
            // scoreboard activates when the timer hits 0
            let playerName = document.createElement('LI');
            // let nameInput = prompt(`You scored ${currentScore.length} points! \n Enter your name:`);
            let scoreBoard = document.getElementById('score');
            // let newPlayer = scoreBoard.appendChild(playerName);
            // newPlayer.textContent = nameInput;
            newGameButton.disabled = false;
          }

        };
        let timer = window.setInterval(countingTime, 1000);
        
      };  
      timerEngine();

      // New Game Button that shufles cards and resets the timer.  
      newGameButton.onclick = function () {
        document.getElementById('cloak').style.display = 'none';
        countdown.textContent = 50;

        let allCards = document.querySelectorAll('.card, .open, .match');
                  
        for(let k=0; k<allCards.length; k++) {
            allCards[k].classList.remove('card');
            allCards[k].classList.remove('open');
            allCards[k].classList.remove('match');
            allCards[k].classList.add('card');
        }
        
        console.log('New game. Reseting cards and timer...');
        timerEngine(); 
        randomizeCards();
      }


      // Activate onCardClick function
      for (var i = 0; i < cardClosed.length; i++) {
          cardClosed[i].addEventListener('click', onCardClick, false);
      }


     
      