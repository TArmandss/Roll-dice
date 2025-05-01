
'use strict';


gsap.from('.landing-page',{opacity:0, duration:.5,y:-50, ease:'Power2.easeInOut'});
gsap.from('.bottom-page',{opacity:0, duration:.5,y:-50, ease:'Power2.easeInOut'});

const boxes = document.querySelectorAll('#box');
const overlay = document.querySelector('.overlay');
const player1Name = document.getElementById('player1__name');
const player2Name = document.getElementById('player2__name');
const submitButton = document.querySelector('#submitButton');


boxes.forEach(box => {
  box.addEventListener('click', function () {
    removePanel();
    box.classList.toggle('active');
  });
});

const removePanel = () => {
  boxes.forEach(box => {
    box.classList.remove('active');
  });
};

submitButton.addEventListener('click', function(event){
  event.preventDefault();

  if(player1Name.value !== "" && player2Name.value !== ""){
    gsap.to('.overlay',{opacity:0, duration:.5,x:-1550, ease:'Power2.easeInOut'});
    onSubmitNames()
  }else{
    alert("You have to fill up all forms")
  }

});



const scoreEl01 = document.querySelector('__person-0-score');
const scoreEl02 = document.querySelector('__person-1-score');
const diceEl = document.querySelector('.diceEl');
const diceBg = document.querySelector('.dice-bg');
const person0currentEl = document.querySelector('.__person-0-current-score');
const person1CurrentEl = document.querySelector('.__person-1-current-score');

const holdScore = document.getElementById('hold-score');
const rollDice = document.getElementById('roll-dice');
const restartGame = document.getElementById('restart-game');

const person0 = document.querySelector('.left-side');
const person1 = document.querySelector('.right-side');

const person0Hint = document.querySelector('.__person-0-name')
const person1Hint = document.querySelector('.__person-1-name')
const headerSection = document.querySelector('.header')
const input = document.querySelector('input');

person0currentEl.textContent = 0;
person1CurrentEl.textContent = 0;

let currentScore = 0;
let activePlayer = 0;
let currentPlayer;
const scores = [0, 0];
let playingState = true;

diceEl.classList.add('hidden');
diceBg.classList.add('hidden');

const onSubmitNames = ()=>{
  person0Hint.textContent= player1Name.value
  person1Hint.textContent= player2Name.value

}

const determinePlayersTurn = function () {
  currentPlayer = activePlayer == 0 ? `${player1Name.value}'s turn` : `${player2Name.value}'s turn`;
  headerSection.textContent = currentPlayer;

};

const switchPlayers = function () {
  document.querySelector(
    `.__person-${activePlayer}-current-score`
  ).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  determinePlayersTurn();
  person1.classList.toggle('player--active');
  person0.classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
 

  //1.Generate a random dice number
  if (playingState) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceBg.classList.remove('hidden');

    diceEl.src = `./img/image-${diceNumber}.png`;

    determinePlayersTurn();
    if (diceNumber !== 1) {
      // add to current score
      currentScore += diceNumber;
      document.querySelector(
        `.__person-${activePlayer}-current-score`
      ).textContent = currentScore;
    } else {
      //Switch to another player
      switchPlayers();
    }
  }
});

holdScore.addEventListener('click', function () {
  if (playingState) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.__person-${activePlayer}-score`).textContent =
      scores[activePlayer];

    currentScore = scores[activePlayer];
    if (currentScore >= 100) {
      document
        .getElementById(`__person-${activePlayer}`)
        .classList.add('winner-player');
      playingState = false;
      diceEl.classList.add('hidden');
      diceBg.classList.add('hidden');
    } else {
      switchPlayers();
    }
  }
});

restartGame.addEventListener('click', function () {
  currentScore = 0;
  diceEl.classList.add('hidden');
  diceBg.classList.add('hidden');

  for (let i = 0; i < scores.length; i++) {
    document.querySelector(`.__person-${i}-current-score`).textContent =
      currentScore;
    document.querySelector(`.__person-${i}-score`).textContent = currentScore;
    scores[i] = 0;
  }
  person1.classList.add('player--active');
  person0.classList.remove('player--active');
  activePlayer = 0;
  headerSection.textContent = 'START THE GAME';

  //+ remove winner player
});

const transformText = document.querySelector(".transformText")
const displayRulles = document.querySelector(".displayRulles")
const rulles = document.querySelector(".rulles")
const text = document.querySelector(".text")

rulles.addEventListener('click',()=>{
  displayRulles.classList.remove('hidden');
  transformText.classList.add('hidden');
})

text.addEventListener('click',()=>{
  displayRulles.classList.add('hidden');
  transformText.classList.remove('hidden');
})