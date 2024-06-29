
document.addEventListener('DOMContentLoaded', () =>{

const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const attemptsDisplay = document.querySelector('.attempts');
const pauseButton =document.getElementById('pause-button');
const startButton =document.getElementById('start-game');
const dificuldadeSelect =document.getElementById('dificuldade');


const characters =[
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',

];



const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }
  
  let firstCard = '';
  let secondCard = '';
  let attempts =0;
  let isPaused= false;
  let loop;
  let numPairs = 10;
  
  const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
  
    if (disabledCards.length === numPairs * 2) {
      clearInterval(loop);
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} .Tentativas: ${attempts}`);
    }
  }
  
  const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
  
    if (firstCharacter === secondCharacter) {
  
      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');
  
      firstCard = '';
      secondCard = '';
  
      checkEndGame();
  
    } else {
      setTimeout(() => {
  
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
  
        firstCard = '';
        secondCard = '';
  
      }, 1000);
    }

    attempts++;
    attemptsDisplay.innerHTML =attempts;
  
  };
  
  const revealCard = ({ target }) => {
  
    if ( isPaused ||target.parentNode.className.includes('reveal-card')) {
      return;
    }
  
    if (firstCard === '') {  
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
  
    } else if (!secondCard) {
  
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;
  
      checkCards();
  
    }
  };
  
  const createCard = (character) => {
  
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
  
    front.style.backgroundImage = `url('../images/${character}.png')`;
  
    card.appendChild(front);
    card.appendChild(back);
  
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)
  
    return card;
  };
  
  const loadGame = () => {
    grid.innerHTML = '';
    const selectedCharacters = characters.slice(0, numPairs);
    const duplicateCharacters = [...selectedCharacters, ...selectedCharacters];  
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
  
    shuffledArray.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    });
  };
  
  const startTimer = () => {
    timer.innerHTML ='0';
  
    loop = setInterval(() => {
      if(!isPaused){
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
      }
    }, 1000);  
  };

  const togglePause = () => {
    isPaused = !isPaused;
    pauseButton.innerText = isPaused ? 'Retornar' : 'Pause';
  };

  const startGame = () => {
    clearInterval(loop);
    attempts =0;
    isPaused= false;
    attemptsDisplay.innerHTML = attempts;
    pauseButton.innerText ='pause';
    numPairs = parseInt(dificuldadeSelect.value, 10);
    startTimer();
    loadGame();
    dificuldadeSelect();
    attempts();

  }
  
  window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
 
  }

  pauseButton.addEventListener('click', togglePause);
  startButton.addEventListener('click', startGame);
  dificuldadeSelect.addEventListener('change', startGame);

  
});