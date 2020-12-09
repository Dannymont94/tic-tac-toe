const board = document.getElementById("board");
const cellEls = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart-button");
const winMessageContainerEl = document.getElementById("win-message-container");
const winMessageTextEl = document.getElementById("win-message-text");

const x_class = "x";
const o_class = "o";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

function startGame() {
  circleTurn = false;
  clearBoard();
  setBoardHoverClass();
  winMessageContainerEl.classList.remove("show");
}

function clearBoard() {
  cellEls.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(o_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function setBoardHoverClass() {
  if (circleTurn) {
    board.classList.remove(x_class);
    board.classList.add(o_class);
  } else {
    board.classList.remove(o_class);
    board.classList.add(x_class);
  }
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? o_class : x_class;
  placeToken(cell, currentClass);
  checkGameOver(currentClass);
}

function placeToken(cell, currentClass) {
  cell.classList.add(currentClass);
}

function checkGameOver(currentClass) {
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellEls[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winMessageTextEl.innerText = "Draw!";
  } else {
    winMessageTextEl.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winMessageContainerEl.classList.add("show");
}

function isDraw() {
  return [...cellEls].every((cell) => (cell.classList.contains(x_class) || cell.classList.contains(o_class)));
}

function swapTurns() {
  circleTurn = !circleTurn;
}

restartButton.addEventListener("click", startGame);
startGame();