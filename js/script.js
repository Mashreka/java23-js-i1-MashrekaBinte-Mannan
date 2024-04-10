const nameForm = document.getElementById("name-form");
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const gameContainer = document.getElementById("game-container");

let player1Name, player2Name;

nameForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  player1Name = player1NameInput.value.trim();
  player2Name = player2NameInput.value.trim();

  if (player1Name !== "" && player2Name !== "") {
    startGame();
  } else {
    alert("Please enter both players' names.");
  }
});

function startGame() {
  // Hide name form and show game container
  nameForm.style.display = "none";
  gameContainer.style.display = "block";
  // Retrieve DOM elements
  const player1Heading = document.getElementById("player1-heading");
  const player2Heading = document.getElementById("player2-heading");
  const currentPlayerDisplay = document.getElementById("current-player");
  const player1TotalScore = document.getElementById("player1-total-score");
  const player2TotalScore = document.getElementById("player2-total-score");
  const roundScoreDisplay = document.getElementById("round-score");
  const roundCountDisplay = document.getElementById("round-count");
  const diceImage = document.getElementById("dice");
  const rollButton = document.getElementById("roll-btn");
  const freezeButton = document.getElementById("freeze-btn");
  const gameOverMessage = document.getElementById("game-over-message");

  // Set player names
  player1Heading.textContent = `Player 1: ${player1Name}`;
  player2Heading.textContent = `Player 2: ${player2Name}`;
  // Initialize game state variables
  let scores = [0, 0];
  let roundScore = 0;
  let roundCount = 0;
  let activePlayer = 0; // 0 for player 1, 1 for player 2
  let isGameOver = false;

  // Function to update UI
  function updateUI() {
    player1TotalScore.textContent = `${player1Name}: ${scores[0]}`;
    player2TotalScore.textContent = `${player2Name}: ${scores[1]}`;
    roundScoreDisplay.textContent = `Round Score: ${roundScore}`;
    roundCountDisplay.textContent = `Round Count: ${roundCount}`;
  }
  // Function to update UI with current player
  function updateCurrentPlayer() {
    currentPlayerDisplay.textContent = `Current Turn: ${
      activePlayer === 0 ? player1Name : player2Name
    }`;
  }

  // Function to switch players
  function switchPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
    updateUI();
    updateCurrentPlayer();
  }

  // Function to roll the dice
  rollButton.addEventListener("click", function () {
    if (!isGameOver) {
      const dice = Math.floor(Math.random() * 6) + 1;
      diceImage.src = `dice-${dice}.png`;
      diceImage.classList.remove("hidden");

      if (dice !== 1) {
        roundScore += dice;
        updateUI();
      } else {
        switchPlayer();
      }
    }
  });

  // Function to freeze the score
  freezeButton.addEventListener("click", function () {
    if (!isGameOver) {
      scores[activePlayer] += roundScore;
      if (scores[activePlayer] >= 100) {
        isGameOver = true;
        gameOverMessage.textContent = `${
          activePlayer === 0 ? player1Name : player2Name
        } wins after ${roundCount} rounds!`;
        gameOverMessage.style.display = "block";
        // Update the total score display for the winning player
        if (activePlayer === 0) {
          player1TotalScore.textContent = `${player1Name}: ${scores[0]}`;
        } else {
          player2TotalScore.textContent = `${player2Name}: ${scores[1]}`;
        }
      } else {
        roundCount++;
        switchPlayer();
      }
      updateUI();
    }
  });
  updateUI();
  updateCurrentPlayer();
}
