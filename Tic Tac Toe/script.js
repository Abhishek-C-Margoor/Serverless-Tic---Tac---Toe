const board = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const backBtn = document.getElementById("backBtn"); // DEFINED BACK BUTTON
const turnIndicator = document.getElementById("turnIndicator");
const startBtn = document.getElementById("startBtn");
const playerInputs = document.getElementById("playerInputs");
const gameArea = document.getElementById("gameArea");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

let currentPlayer = "X";
let playerXName = "";
let playerOName = "";
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  playerXName = playerXInput.value.trim() || "Player X";
  playerOName = playerOInput.value.trim() || "Player O";

  playerInputs.style.display = "none";
  gameArea.style.display = "block";

  createBoard();
}

function createBoard() {
  gameState.fill("");
  board.innerHTML = "";
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "";
  turnIndicator.textContent = `${playerXName}'s (X) turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    const winnerName = currentPlayer === "X" ? playerXName : playerOName;
    statusText.textContent = `🎉 ${winnerName} wins!`;
    gameActive = false;
    turnIndicator.textContent = "";
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    turnIndicator.textContent = "";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnIndicator.textContent = currentPlayer === "X"
    ? `${playerXName}'s (X) turn`
    : `${playerOName}'s (O) turn`;
}

// Function to return to player name setup
function backToSetup() {
    gameArea.style.display = "none";
    playerInputs.style.display = "block";
    statusText.textContent = "";
    turnIndicator.textContent = "";
    board.innerHTML = "";
    gameActive = false;
}

// Event Listeners
resetBtn.addEventListener("click", createBoard);
startBtn.addEventListener("click", startGame);
backBtn.addEventListener("click", backToSetup); // LISTENER FOR BACK BUTTON