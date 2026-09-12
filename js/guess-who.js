// ===============================
// GAME STATE
// ===============================
let characters = [];
let order = [];
let index = -1;
let currentCharacter = null;
let clueNumber = 1;
let score = 0;
let round = 0;
let finished = false;

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
    const characterCell = document.createElement("div");
    characterCell.className = "col-lg-2 col-md-3 col-sm-4 col-6"; // 6 cards per row

    characterCell.innerHTML = `
      <div class="card character-card" onclick="handleGuess('${s.character}')">
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
    order = shuffle([...Array(characters.length).keys()]);
    index = 0;
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

  if (guess === correct) {
    const pts = points(clueNumber);
    score += pts;
    scoreEl.textContent = score;

    clueHeader.textContent = ``;
    clueBox.textContent = `Correct! +${pts} points.`;
    finished = true;

    nextClueBtn.disabled = true;
    nextCharacterBtn.disabled = false;
    setTimeout(() => {
      clueBox.textContent = `Select "Next Character".`;
    }, 1500);
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
}

// ===============================
// LOAD EXCEL FILE
// ===============================
fetch("../assets/GuessWho.xlsx")
  .then(res => res.arrayBuffer())
  .then(buffer => {
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const header = rows[0];
    const characterIndex = header.indexOf("saint");
    const chineseIndex = header.indexOf("chinese");
    const clueIndexes = [
      header.indexOf("clue1"),
      header.indexOf("clue2"),
      header.indexOf("clue3"),
      header.indexOf("clue4"),
      header.indexOf("clue5")
    ];

    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      characters.push({
        character: r[characterIndex],
        chinese: r[chineseIndex],
        clues: clueIndexes.map(c => r[c] || "")
      });
    }

    order = shuffle([...Array(characters.length).keys()]);
    renderCards();
    nextCharacter();
  })
  .catch(err => {
    console.error("XLSX LOAD ERROR:", err);
    clueBox.textContent = "Error loading GuessWho.xlsx";
  });

// ===============================
// BUTTON EVENTS
// ===============================
nextClueBtn.addEventListener("click", nextClue);
nextCharacterBtn.addEventListener("click", nextCharacter);
restartBtn.addEventListener("click", restartGame);
