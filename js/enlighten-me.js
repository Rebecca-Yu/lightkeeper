// ===============================
// GAME STATE
// ===============================
let questions = [];
let currentIndex = 0;
let gameData = null;
let answer = "";
let revealed = [];
let incorrectGuesses = 0;
const maxIncorrect = 9;
let score = 0;

// ===============================
// DOM ELEMENTS
// ===============================
const scoreEl = document.getElementById("score");
const questionIndexEl = document.getElementById("questionIndex");
const incorrectBar = document.getElementById("incorrectBar");
const clueBox = document.getElementById("clueBox");
const wordBox = document.getElementById("wordBox");
const message = document.getElementById("message");
const letters = document.getElementById("letters");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");

// enable tooltips
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


// ===============================
// RENDER FUNCTIONS
// ===============================
function renderWordBoxes() {
    wordBox.innerHTML = "";
    revealed.forEach(letter => {
        const box = document.createElement("input");
        box.type = "text";
        box.className = "form-control box bell-font text-center p-0";
        box.readOnly = true;
        box.value = letter;
        if (letter === " ") {
            box.classList.remove("box");
            box.classList.add("space");
        }
        wordBox.appendChild(box);
    });
}

function renderLetters() {
    letters.innerHTML = "";
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i);
        const btn = document.createElement("button");
        btn.textContent = letter.toUpperCase();
        btn.className = "btn btn-light fs-3 square-btn";
        btn.onclick = () => guessLetter(letter, btn);
        letters.appendChild(btn);
    }
}

function renderIncorrectTracker() {
    incorrectBar.innerHTML = "";
    for (let i = 0; i < maxIncorrect; i++) {
        const dot = document.createElement("i");
        dot.className = "bi bi-circle-fill p-1";
        if (i < incorrectGuesses) {
            dot.classList.add("text-danger");
        }
        else {
            dot.classList.add("text-secondary");
        }
        incorrectBar.appendChild(dot);
    }
}

function disableAllLetters() {
    letters.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

// ===============================
// GAME LOGIC
// =============================== 
function startGame() {
    gameData = questions[currentIndex];
    answer = gameData.answer.toLowerCase();
    revealed = Array(answer.length).fill("");
    incorrectGuesses = 0;

    // Reveal spaces in the answer
    for (let i = 0; i < answer.length; i++) {
        const letter = answer[i];
        if (letter === " ") {
            revealed[i] = " ";
        }
    }

    scoreEl.textContent = score;
    questionIndexEl.textContent = `${currentIndex + 1}`;
    message.textContent = "";
    nextBtn.disabled = true;

    clueBox.innerHTML = `<p class="fs-5">${gameData.clue1}</p>`;
    if (gameData.clue2Datatype === "text") {
        clueBox.innerHTML += `<p class="fs-2 fs-sm-4">${gameData.clue2}</p>`;
    }
    
    renderWordBoxes();
    renderLetters();
    renderIncorrectTracker();
}

function guessLetter(letter, btn) {
    if (incorrectGuesses >= maxIncorrect) return;

    let correct = false;
    const q = questions[currentIndex];

    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === letter) {
            revealed[i] = letter.toUpperCase();
            correct = true;
        }
    }

    renderWordBoxes();

    if (correct) {
        btn.classList.remove("btn-light");
        btn.classList.add("btn-success");
        btn.disabled = true;

        if (!revealed.includes("")) {
            message.classList.remove("text-danger");
            message.classList.add("text-success");
            message.textContent = "Correct! +" + (q.score || 0) + " points!";
            disableAllLetters();
            score += Number(q.score || 0);
            scoreEl.textContent = score;
            nextBtn.disabled = false;
        }
    } 
    else {
        btn.classList.remove("btn-light");
        btn.classList.add("btn-danger");
        btn.disabled = true;

        incorrectGuesses++;
        renderIncorrectTracker();

        if (incorrectGuesses >= maxIncorrect) {
            message.classList.remove("text-success");
            message.classList.add("text-danger");
            message.textContent = `Out of guesses! The answer was: ${answer.toUpperCase()}. -100 points!`;
            disableAllLetters();
            score -= 100;
            scoreEl.textContent = score;
            nextBtn.disabled = false;
        }
    }
}

function nextRound() {
    currentIndex++;
    if (currentIndex >= questions.length) {
        message.classList.remove("text-danger");
        message.classList.add("text-success");
        message.textContent = "No more questions available!";
        disableAllLetters();
        nextBtn.disabled = true;
        return;
    }
    startGame();
}

// ===============================
// XLSX LOADING
// ===============================
fetch("../assets/EnlightenMe.xlsx")
    .then(res => res.arrayBuffer())
    .then(buffer => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const header = rows[0];

        const idx = {
            score: header.indexOf("score"),
            clue1: header.indexOf("clue1"),
            clue2: header.indexOf("clue2"),
            clue2Datatype: header.indexOf("clue2-datatype"),
            answer: header.indexOf("answer")
        };

        questions = [];

        for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (!r[idx.answer]) continue;

            questions.push({
                score: r[idx.score],
                clue1: r[idx.clue1],
                clue2: r[idx.clue2],
                clue2Datatype: r[idx.clue2Datatype],
                answer: r[idx.answer]
            });
        }

        questions = shuffle(questions);
        currentIndex = 0;
        startGame();
    })
    .catch(err => console.error("XLSX LOAD ERROR:", err));

    
// ===============================
// BUTTON EVENTS
// ===============================
restartBtn.onclick = () => {
    score = 0;
    currentIndex = 0;
    questions = shuffle(questions);
    startGame();
};

nextBtn.onclick = nextRound;
