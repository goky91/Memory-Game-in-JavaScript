import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SingleCard from './components/SingleCard';

function App() {
  let LETTERS: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  LETTERS.forEach((letter: string, i: number) => {
      LETTERS.push(letter);

      const randomIndex: number = Math.floor(Math.random() * (i + 1));
      [LETTERS[i], LETTERS[randomIndex]] = [LETTERS[randomIndex], LETTERS[i]];
  })

  let cardsArray = LETTERS.map((letter, i) => {
    return <SingleCard letter={LETTERS[i]} />
  });


  return (
    <div className="App container">
      <div className="cloak d-none"></div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <div id="game-container" className="col-12 d-flex align-content-stretch flex-wrap">
            {cardsArray}
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div id="score-board">
            <div id="timer" className="container">
              <span>00:</span><span id="seconds">59</span>
            </div>
            <div id="board" className="container">
              <h1>Result:</h1>
              <div id="progress">
                <div className="bar"><div id="score"></div><p>Points</p></div>
                <div className="bar"><div id="rate"></div><p>Hit Rate</p></div>
                <div className="bar"><div id="time"></div><p>Time</p></div>
              </div>
            </div>
            <button id="new-game" className="container">New Game</button>
          </div>
        </div>

        <div className="col-12 col-lg-2">
          <span id="welcome">Welcome</span>
          <span id="username">Username</span>
        </div>
      </div>
    </div>
  );
}

export default App;
