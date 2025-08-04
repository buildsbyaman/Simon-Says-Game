let currentLevel = 0;
let gameStarted = false;
let highestScoreCount = 0;

let computerSequence = [];
let userSequence = [];

const colors = ["red", "yellow", "blue", "green"];
const body = document.querySelector("body");
const colorButtons = document.querySelectorAll(".box");
const highestScore = document.querySelector(".highestScore");
const title = document.querySelector("h1");
const statusText = document.querySelector("h3");

const getRandomColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const flashButton = (button) => {
  button.classList.add("flash");
  setTimeout(() => {
    button.classList.remove("flash");
  }, 300);
};

const nextLevel = () => {
  currentLevel++;
  statusText.innerText = `Level ${currentLevel}`;
  const score = currentLevel * 10;
  if (score > highestScoreCount) {
    highestScoreCount = score;
    highestScore.innerText = `Your Highest Score is : ${highestScoreCount}`;
  }
  const randomColor = getRandomColor();
  const button = document.querySelector(`.${randomColor}`);
  computerSequence.push(randomColor);
  flashButton(button);
};

const startGame = () => {
  gameStarted = true;
  currentLevel = 0;
  computerSequence = [];
  userSequence = [];
  title.innerText = "Game Started!";
  nextLevel();
};

const validateInput = () => {
  const currentIndex = userSequence.length - 1;
  if (userSequence[currentIndex] === computerSequence[currentIndex]) {
    if (userSequence.length === computerSequence.length) {
      setTimeout(() => {
        userSequence = [];
        nextLevel();
      }, 500);
    }
  } else {
    body.classList.add("fail");
    setTimeout(() => {
      body.classList.remove("fail");
    }, 300);
    statusText.innerText = `You Lost the Game. Your score was ${
      currentLevel * 10
    }`;
    title.innerText = "Press any key or tap to restart.";
    resetGame();
  }
};

const resetGame = () => {
  gameStarted = false;
  currentLevel = 0;
  computerSequence = [];
  userSequence = [];
};

const handleUserClick = (event) => {
  if (!gameStarted) return;
  const button = event.currentTarget;
  const color = button.getAttribute("id");
  userSequence.push(color);
  flashButton(button);
  validateInput();
};

const initializeGame = () => {
  if (!gameStarted) {
    startGame();
  }
};

const setupInputListeners = () => {
  colorButtons.forEach((button) => {
    button.addEventListener("click", handleUserClick);
  });

  if (screen.width <= 768) {
    document.addEventListener("touchstart", initializeGame, { once: true });
    statusText.innerText = "Tap anywhere to start the game.";
  } else {
    document.addEventListener("keydown", initializeGame, { once: true });
    statusText.innerText = "Press any key to start the game.";
  }
};

setupInputListeners();
