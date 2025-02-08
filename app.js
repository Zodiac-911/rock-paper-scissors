const dialog = document.getElementById("dialog");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const scoreElement = document.getElementById("score");
const playAGinButton = document.getElementById("playAgain");
const openDialog = document.getElementById("openDialog");
const closeDialog = document.getElementById("closeDialog");
const options = {
  paper: `<button id="paperButton" class="paper button">
          <div><img src="images/icon-paper.svg" alt="Paper" /></div>
        </button>`,
  rock: `<button id="rockButton" class="rock button">
          <div><img src="images/icon-rock.svg" alt="Rock" /></div>
        </button>`,
  scissors: `<button id="scissorsButton" class="scissors button">
          <div><img src="images/icon-scissors.svg" alt="Scissors" /></div>
        </button>`,
};

const paperButton = document.getElementById("paperButton");
const rockButton = document.getElementById("rockButton");
const scissorsButton = document.getElementById("scissorsButton");

const playerPick = document.getElementById("playerPick");
const AIpick = document.getElementById("AIpick");
const placeHolder = `<div class="place-holder"><div></div></div>`;
const resultBox = document.getElementById("resultBox");
const result = document.getElementById("result");
const steps = [step1, step2];
let playerScore = 0;
let AIScore = 0;
let playerSelected = "";
let AIselected = "";
scoreElement.innerText = playerScore + "/" + AIScore;
goToStep(0);
paperButton.addEventListener("click", () => {
  playerSelected = "paper";
  goToStep(1);
});

rockButton.addEventListener("click", () => {
  playerSelected = "rock";
  goToStep(1);
});

scissorsButton.addEventListener("click", () => {
  playerSelected = "scissors";
  goToStep(1);
});
playAGinButton.addEventListener("click", () => {
  goToStep(0);
});

function goToStep(step) {
  if (step == 0) {
    steps[0].classList.add("show");
    steps[0].classList.remove("hidden");
    steps[1].classList.add("hidden");
    steps[1].classList.remove("show");
  }
  if (step == 1) {
    steps[0].classList.remove("show");
    steps[0].classList.add("hidden");
    steps[1].classList.remove("hidden");
    steps[1].classList.add("show");
    steps[1].classList.remove("step-4");
    steps[1].classList.add("step-2");
    resultBox.classList.remove("show");
    resultBox.classList.add("hidden");
    playerPick.innerHTML = "<p>YOU PICKED </p>" + options[playerSelected];
    AIpick.innerHTML = "<p>The House Picked</p>" + placeHolder;
    AIselect();
    setTimeout(() => {
      AIpick.innerHTML = "<p>The House Picked</p>" + options[AIselected];
      goToResult();
    }, 500);
  }
  if (step == 2) {
    steps[0].classList.remove("show");
    steps[0].classList.add("hidden");
    steps[1].classList.remove("hidden");
    steps[1].classList.add("show");
    steps[1].classList.remove("step-2");
    steps[1].classList.add("step-4");
    resultBox.classList.remove("hidden");
    resultBox.classList.add("show");
    const outcome = getResult();
    if (outcome == "YOU LOSE") AIScore++;
    if (outcome == "YOU WIN") playerScore++;
    result.innerText = outcome;
    scoreElement.innerText = playerScore + "/" + AIScore;
    playerPick.innerHTML = "<p>YOU PICKED </p>" + options[playerSelected];
    AIpick.innerHTML = "<p>The House Picked</p>" + options[AIselected];
  }
}
function AIselect() {
  const randomNumber = Math.floor(Math.random() * 3);
  if (randomNumber == 0) {
    AIselected = "paper";
  } else if (randomNumber == 1) {
    AIselected = "rock";
  } else {
    AIselected = "scissors";
  }
}
function goToResult() {
  setTimeout(() => {
    goToStep(2);
  }, 500);
}

function getResult() {
  if (playerSelected == "paper") {
    if (AIselected == "paper") return "DRAW";
    if (AIselected == "rock") return "YOU WIN";
    if (AIselected == "scissors") return "YOU LOSE";
  } else if (playerSelected == "rock") {
    if (AIselected == "paper") return "YOU LOSE";
    if (AIselected == "rock") return "DRAW";
    if (AIselected == "scissors") return "YOU WIN";
  } else if (playerSelected == "scissors") {
    if (AIselected == "paper") return "YOU WIN";
    if (AIselected == "rock") return "YOU LOSE";
    if (AIselected == "scissors") return "DRAW";
  }
}

openDialog.addEventListener("click", () => {
  dialog.style.display = "flex";
});
closeDialog.addEventListener("click", () => {
  dialog.style.display = "none";
});
