console.log(" Welcome to tic tac toe");
let turn = "X";
let isGameOver = false;
let turnCounter = 0;

// Initialise method
const initialise = () => {
  // initialise variables
  turn = "X";
  isGameOver = false;
  turnCounter = 0;

  // add 'click' event on boxes
  const boxes = document.getElementsByClassName('c-wrap-game__box');
  Array.from(boxes).forEach(box => {
    var boxtext = box.querySelector('.c-wrap-game__box--text');
    boxtext.innerText = '';
    box.style.cursor = 'pointer';
    box.classList.add('c-hover');
    box.addEventListener('click', listner, false);
  });

  // initialize message area
  const text = document.querySelector('.c-text');
  text.innerText = 'Turn ' + turn;

  const subText = document.querySelector('.c-sub-text');
  subText.innerText = '';

  // remove the start button
  const button = document.querySelector('.c-button');
  button.innerText = '';
  button.classList.remove('c-button__style');
};

// click event listner method
const listner = (event) => {
  const boxtext = event.currentTarget.childNodes[0];
  const box = event.currentTarget;
  if (boxtext.innerText === '') {
    turnCounter += 1;
    boxtext.innerText = turn;
    box.classList.remove('c-hover');
    box.style.cursor = 'text';
    checkForWin();
    turn = changeTurn();
    if (!isGameOver && turnCounter < 9) {
      const text = document.querySelector('.c-text');
      text.innerText = 'Turn ' + turn;
    } else {
      disableGame();
    }
  }
};

// add button listner method
const buttonEvent = (event) => {
  const type = event.currentTarget.firstChild.nodeValue;

  if(type === 'START') initialise();
  else if (type === 'RESET') onResetButtonClick();
};

// disable game in case 'isGameOver'
const disableGame = () => {
  const boxes = document.getElementsByClassName('c-wrap-game__box');
  Array.from(boxes).forEach(box => {
    box.classList.remove('c-hover');
    box.style.cursor = 'text';
    box.removeEventListener('click', listner, false);
  });
  showResetButton();
};

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Check for win method
const checkForWin = () => {
  const boxtexts = document.getElementsByClassName('c-wrap-game__box--text');
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  wins.forEach(elm => {
    if ((boxtexts[elm[0]].innerText !== '') &&
      (boxtexts[elm[0]].innerText === boxtexts[elm[1]].innerText) &&
      (boxtexts[elm[1]].innerText === boxtexts[elm[2]].innerText)) {
      isGameOver = true;
      showWinInfo();
    }
  });
};

// show reset button
const showResetButton = () => {
  const button = document.querySelector('.c-button');
  button.classList.add('c-button__style');
  button.innerText = 'RESET';

  const text = document.querySelector('.c-text');
  text.innerText = 'GAME OVER!';

  const subText = document.querySelector('.c-sub-text');
  subText.innerText = 'Please click the below button to RESTART the game.'
};

// show start button
const showStartButton = () => {
  const button = document.querySelector('.c-button');
  button.classList.add('c-button__style');
  button.innerText = 'START';
  button.addEventListener('click', buttonEvent, false);

  const text = document.querySelector('.c-text');
  text.innerText = 'START GAME!';

  const subText = document.querySelector('.c-sub-text');
  subText.innerText = 'Press the below button to START the game!!';
};

// on reset button click
const onResetButtonClick = () => {
  const boxes = document.getElementsByClassName('c-wrap-game__box');
  Array.from(boxes).forEach(box => {
    var boxtext = box.querySelector('.c-wrap-game__box--text');
    boxtext.innerText = '';
  });

  showStartButton();
  hideWinInfo();
};

// show WIN info
const showWinInfo = () => {
  const info = document.querySelector('.c-game-info');
  info.classList.remove('c-game-info__style--none');
  info.classList.add('c-game-info__style');

  const infoText = document.querySelector('.c-game-info__text');
  debugger
  infoText.innerText = turn + ' WON!!';
};

// hide WIN info
const hideWinInfo = () => {
  const info = document.querySelector('.c-game-info');
  info.classList.add('c-game-info__style--none');
  info.classList.remove('c-game-info__style');
};

// on mount
const onMount = () => {
  showStartButton();
  hideWinInfo();
};

onMount();







