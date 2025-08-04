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
  const index = Math.floor(Math.random() * 4);
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

  if (currentLevel * 10 > highestScoreCount) {
    highestScoreCount = currentLevel * 10;
    highestScore.innerText = `Your Highest Score is : ${highestScoreCount}`;
  }

  const randomColor = getRandomColor();
  const button = document.querySelector(`.${randomColor}`);
  computerSequence.push(randomColor);
  flashButton(button);
};

const startGame = () => {
  if (!gameStarted) {
    gameStarted = true;
    currentLevel = 0;
    computerSequence = [];
    userSequence = [];
    title.innerText = "Game Started!";
    nextLevel();
  }
};

const validateInput = () => {
  const currentIndex = userSequence.length - 1;

  if (userSequence[currentIndex] === computerSequence[currentIndex]) {
    if (userSequence.length === computerSequence.length) {
      setTimeout(() => {
        userSequence = [];
        nextLevel();
      }, 300);
    }
  } else {
    body.classList.add("fail");
    setTimeout(() => {
      body.classList.remove("fail");
    }, 300);
    statusText.innerText = `You Lost the Game. Your current score is ${
      currentLevel * 10
    }`;
    title.innerText = "Press any key to restart";
    computerSequence = [];
    userSequence = [];
    currentLevel = 0;
    gameStarted = false;
  }
};

const handleUserClick = (event) => {
  const button = event.currentTarget;
  const color = button.getAttribute("id");
  userSequence.push(color);
  flashButton(button);
  validateInput();
};

document.addEventListener("keypress", () => {
  startGame();
  colorButtons.forEach((button) => {
    button.addEventListener("click", handleUserClick);
  });
});
