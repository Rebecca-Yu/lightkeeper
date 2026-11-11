// ===============================
// GAME STATE
// ===============================
const gameduration = 20; //min

let characters = [];
let order = [];
let index = -1;
let currentCharacter = null;
let clueNumber = 1;
let score = 0;
let round = 0;
let finished = false;
let gameTimerInterval;
let gameSeconds = gameduration * 60;

// ===============================
// DOM ELEMENTS 
// ===============================
const clueBox = document.getElementById("clueBox");
const clueHeader = document.getElementById("clueHeader");
const nextClueBtn = document.getElementById("nextClueBtn");
const nextCharacterBtn = document.getElementById("nextCharacterBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreEl = document.getElementById("score");
const roundEl = document.getElementById("round");
const cardGrid = document.getElementById("cardGrid");

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startBtn = document.getElementById("startBtn");
const gameTimerEl = document.getElementById("gameTimer");
const closeModal = document.getElementById("closeModal");
const timeModalHeader = document.getElementById("timeModalHeader");

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// ===============================
// UTILITY FUNCTIONS
// ===============================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function points(clueNumber) {
  return [500, 400, 300, 200, 100][clueNumber - 1] || 0;
}

// ===============================
// RENDER CHARACTER CARDS (6 ACROSS)
// ===============================
function renderCards() {
  cardGrid.innerHTML = "";

  characters.forEach(s => {
    const characterCell = document.createElement("button");
    characterCell.className = "btn btn-light character-card m-1"; // 6 cards per row

    const characterClass = s.character.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
    characterCell.classList.add(characterClass);

    characterCell.innerHTML = `
      <div class="" onclick="handleGuess('${s.character}')">
        <img src="../images/saints/${s.character}.png"
             class="card-img-top pt-2"
             onerror="this.src='../images/saints/person-fill-exclamation.svg'">

        <div class="card-body text-center">
          <p>
            <strong class="bell-font fs-6 lh-1">${s.character}</strong>
            <br>
            <small class="text-body-secondary chinese-font lh-1s">${s.chinese || ""}</small>
          </p>
        </div>
      </div>
    `;

    cardGrid.appendChild(characterCell);
  });
}

// ===============================
// GAME FLOW
// ===============================
function nextCharacter() {
  index++;

  if (index >= order.length) {
    return; 
  }

  currentCharacter = characters[order[index]];
  clueNumber = 1;
  round++;
  roundEl.textContent = round;
  finished = false;

  clueHeader.textContent = `CLUE #${clueNumber}`;
  clueBox.textContent = `${currentCharacter.clues[0]}`;
  nextClueBtn.disabled = false;
  nextCharacterBtn.disabled = true;

  const characterbtns = cardGrid.querySelectorAll("button");

  characterbtns.forEach(btn => {
    btn.classList.remove("btn-danger");
    btn.classList.remove("btn-success");
    btn.classList.add("btn-light");
  });
}

function nextClue() {
  if (clueNumber >= 5) {
    clueHeader.textContent = ``;
    clueBox.textContent = "No more clues...";
    return;
  }

  clueNumber++;
  clueHeader.textContent = `CLUE #${clueNumber}`;
  clueBox.textContent = `${currentCharacter.clues[clueNumber - 1]}`;
}

function handleGuess(guessName) {
  if (finished) return;

  const correct = currentCharacter.character.toLowerCase();
  const guess = guessName.toLowerCase();

  const characterClass = guess.replace(/\s+/g, '-').replace(/\./g, '');
  const guessBtn = document.querySelector(`.${characterClass}`);

  if (guess === correct) {
    const pts = points(clueNumber);
    score += pts;
    scoreEl.textContent = score;

    clueHeader.textContent = ``;
    finished = true;

    nextClueBtn.disabled = true;
    nextCharacterBtn.disabled = false;
    if (index >= order.length - 1) {
      clueBox.innerHTML = `<p>Correct! +${pts} points.</p><p>No more characters!</p>`;
      nextCharacterBtn.disabled = true;
      timeModalHeader.textContent = "No more characters!";
      endGame();
    }
    else {
      clueBox.innerHTML = `<p>Correct! +${pts} points.</p><p>Select "Next Round" <i class="bi bi-arrow-right"></i></p>`;
    }

    guessBtn.classList.remove("btn-light");
    guessBtn.classList.remove("btn-danger");
    guessBtn.classList.add("btn-success");
  } 
  else {
    score -= 100;
    scoreEl.textContent = score;
    clueHeader.textContent = ``;
    clueBox.textContent = "Incorrect guess. -100 points.";
    setTimeout(() => {
      clueHeader.textContent = `CLUE #${clueNumber}`;
      clueBox.textContent = `${currentCharacter.clues[clueNumber - 1]}`;
    }, 1500);

    guessBtn.classList.remove("btn-light");
    guessBtn.classList.remove("btn-success");
    guessBtn.classList.add("btn-danger");
  }
}

function restartGame() {
  score = 0;
  round = 0;
  scoreEl.textContent = score;
  roundEl.textContent = round;

  order = shuffle([...Array(characters.length).keys()]);
  index = -1;

  nextCharacter();

  // Reset timers
    clearInterval(gameTimerInterval);
    gameSeconds = gameduration * 60;
    gameTimerEl.textContent = `${gameduration}:00`;

    // return to start screen
    startScreen.hidden = false;
    gameScreen.hidden = true;
}

// ===============================
// LOADING
// ===============================
function loadQuestions() {
  characters = QUESTIONS.map(q => ({
      character: q.saint || "",
      chinese: q.chinese || "",
      clues: [
          q.clue1 || "",
          q.clue2 || "",
          q.clue3 || "",
          q.clue4 || "",
          q.clue5 || ""
      ]
  }));

  order = shuffle([...Array(characters.length).keys()]);
  renderCards();
  nextCharacter();
}


// ===============================
// TIMER FUNCTIONS
// ===============================
function updateGameTimerDisplay() {
    const mins = Math.floor(gameSeconds / 60);
    const secs = gameSeconds % 60;
    gameTimerEl.textContent =`${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}

function startGameTimer() {
    clearInterval(gameTimerInterval);
    gameSeconds = gameduration * 60;
    updateGameTimerDisplay();
    gameTimerInterval = setInterval(() => {
        gameSeconds--;
        updateGameTimerDisplay();
        if (gameSeconds <= 0) {
            timeModalHeader.textContent = "Time's Up!";
            endGame();
        }
    }, 1000); // 1 sec interval
}

function endGame() {
    clearInterval(gameTimerInterval);
    nextClueBtn.disabled = true;
    nextCharacterBtn.disabled = true;
    document.getElementById("finalScore").textContent = score;

    const modal = new bootstrap.Modal(document.getElementById("timeUpModal"));
    modal.show();
}


// ===============================
// BUTTON EVENTS
// ===============================
nextClueBtn.addEventListener("click", nextClue);
nextCharacterBtn.addEventListener("click", nextCharacter);
restartBtn.addEventListener("click", restartGame);
closeModal.addEventListener("click", restartGame);

startBtn.addEventListener("click", () => {
    startScreen.hidden = true;
    gameScreen.hidden = false;
    startGameTimer();
    loadQuestions();
});

