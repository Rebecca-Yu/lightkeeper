// ===============================
// GAME STATE
// ===============================
let questions = [];
let currentIndex = 0;
let score = 0;

// ===============================
// DOM ELEMENTS 
// ===============================
const scoreEl = document.getElementById("score");
const questionIndexEl = document.getElementById("questionIndex");
const q1El = document.getElementById("questionText1");
const q2El = document.getElementById("questionText2");
const answerAreaEl = document.getElementById("answerArea");
const feedbackEl = document.getElementById("feedback");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const checkBtn = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");

// Get room from HTML tag
const room = document.documentElement.getAttribute("data-room") || "A";

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
// RESET GAME FUNCTIONS
// ===============================
function restartGame() {
    // Reset game state
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = score;

    // Reset each question's stored state
    questions.forEach(q => {
        q.status = "unanswered";
        q.lastAnswer = null;
        q.lastChoice = null;
    });

    // Clear UI
    feedbackEl.textContent = "";
    feedbackEl.className = "";
    answerAreaEl.innerHTML = "";
    q1El.textContent = "";
    q2El.innerHTML = "";

    // Re-render first question
    questions = shuffle(questions);
    renderQuestion();
}



// ===============================
// RENDER TEXT/PIN ANSWER
// ===============================
function renderTextAnswer(q) {
    const group = document.createElement("div");
    group.className = "d-flex flex-wrap gap-2 justify-content-center align-items-center";

    // prefix
    if (q.answerPrefix) {
        const prefixSpan = document.createElement("span");
        prefixSpan.className = "text-muted fs-0 bell-font";
        prefixSpan.textContent = q.answerPrefix;
        group.appendChild(prefixSpan);
    }

    const length = Number(q.answerLength || 1);
    for (let i = 0; i < length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.dataset.index = i;

        // digit-only enforcement
        const enforceDigits = () => {
            input.value = input.value.replace(/\D/g, "");
        };

        if (q.answerDatatype.toLowerCase() === "number") {
            input.maxLength = 1;
            input.className = "form-control answer-input bell-font text-center number-input";
            input.addEventListener("input", enforceDigits);
        }
        else if (q.answerDatatype.toLowerCase() === "coordinates") {
            input.maxLength = 2;
            input.className = "form-control answer-input bell-font text-center number-input";
        }
        else {
            input.className = "form-control answer-input bell-font text-center";
        }

        // Restore previous answer
        if (q.lastAnswer) {
            const chars = q.lastAnswer.split("");
            if (chars[i]) input.value = chars[i];
        }

        group.appendChild(input);
    }

    // suffix
    if (q.answerSuffix) {
        const suffixSpan = document.createElement("span");
        suffixSpan.className = "text-muted fs-0 bell-font";
        suffixSpan.textContent = q.answerSuffix;
        group.appendChild(suffixSpan);
    }

    answerAreaEl.appendChild(group);
    group.dataset.answerInputs = "true";
}



// ==================================================
// RENDER MULTIPLE  CHOICE (text/ image) ANSWER
// ==================================================
function renderMultipleChoice(q) {
    const wrapper = document.createElement("div");
    wrapper.className = "d-flex flex-wrap justify-content-center gap-3 my-3";

    ["A", "B", "C", "D"].forEach(letter => {
        const value = q.options[letter];
        if (!value) return;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-outline-dark choice-btn m-3";
        btn.dataset.choice = letter;

        // If answer-datatype is "image", treat value as image name/path
        if (q.answerDatatype.toLowerCase() === "image") {
            const img = document.createElement("img");
            img.src = `../images/challengeQA/${value}.png`; 
            img.alt = option;
            img.className = "img-fluid choice-img";
            btn.appendChild(img);
        } else {
            btn.textContent = value;
        }

        // Restore previous answer
        if (q.lastChoice && q.lastChoice === letter) {
            btn.classList.add("active");
        }

        // multiple choice selection
        btn.addEventListener("click", () => {
            if (q.status !== "correct") {
                // clear previous selection
                document.querySelectorAll(".choice-btn").forEach(b => {
                    b.classList.remove("active");
                });
                btn.classList.add("active");
            }
        });

        wrapper.appendChild(btn);
    });

    answerAreaEl.appendChild(wrapper);
}


// ===============================
// RENDER CURRENT QUESTION
// ===============================
function renderQuestion() {
    const q = questions[currentIndex];

    questionIndexEl.textContent = currentIndex + 1;
    q1El.textContent = q.q1 || "";
    q2El.innerHTML = ""; // clear

    if (q.q2Datatype.toLowerCase() === "image" && q.q2) {
        const img = document.createElement("img");
        img.src = `../images/challengeQA/${q.q2}.png`; // adjust path if needed
        img.alt = "question image";
        img.className = "img-fluid question-img";
        q2El.appendChild(img);
        q2El.className = "mb-5 text-center bell-font";
    } 
    else {        
        if (q.q2Datatype.toLowerCase() === "sequence" && q.q2) {
            q2El.textContent = q.q2 || "";
            q2El.className = "mb-5 text-center bell-font fs-0";
        }
        else if (q.q2Datatype.toLowerCase() === "list" && q.q2) {
            const items = q.q2.split(",").map(s => s.trim()).filter(Boolean);
            const wrapper = document.createElement("div");
            wrapper.className = "row justify-content-center mb-4";

            // Decide column count
            const useTwoColumns = items.length > 6;
            const colClass = useTwoColumns ? "col-12 col-md-3" : "col-12";

            // Build columns
            const col1 = document.createElement("div");
            col1.className = colClass + " d-flex justify-content-center";

            const col2 = document.createElement("div");
            col2.className = colClass + " d-flex justify-content-center";

            // UL lists
            const ul1 = document.createElement("ul");
            ul1.className = "list-group text-start";

            const ul2 = document.createElement("ul");
            ul2.className = "list-group text-start";

            // Fill columns
            items.forEach((item, index) => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.textContent = item;

                if (useTwoColumns && index >= Math.ceil(items.length / 2)) {
                    ul2.appendChild(li);
                } 
                else {
                    ul1.appendChild(li);
                }
            });

            col1.appendChild(ul1);
            if (useTwoColumns) col2.appendChild(ul2);
            wrapper.appendChild(col1);
            if (useTwoColumns) wrapper.appendChild(col2);

            q2El.appendChild(wrapper);
            q2El.className = "mb-5 text-center bell-font fs-3";
        }

    }

    feedbackEl.textContent = "";
    answerAreaEl.innerHTML = "";

    // Decide UI based on answer-type
    const type = q.answerType.toLowerCase();

    if (type === "pin" || type === "short-answer") {
        renderTextAnswer(q);
    } else if (type === "multiple-choice") {
        renderMultipleChoice(q);
    } else {
        // fallback: text input
        renderTextAnswer(q);
    }

    // Restore last feedback
    if (q.status === "correct") {
        feedbackEl.innerHTML = `<i class="bi bi-check-circle-fill"></i> Correct!`;
        feedbackEl.className = "mt-3 text-center bell-font fs-3 text-success";
        checkBtn.disabled = true;
    }
    else if (q.status === "incorrect") {
        feedbackEl.innerHTML = `<i class="bi bi-x-circle-fill"></i> Incorrect. Try again.`;
        feedbackEl.className = "mt-3 text-center bell-font fs-3 text-danger";
        checkBtn.disabled = false;
    }
    else {
        feedbackEl.textContent = "";
        feedbackEl.className = "";
        checkBtn.disabled = false;
    }

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= questions.length - 1;

    // Disable check button if question already correct
    if (questions[currentIndex].status === "correct") {
        checkBtn.disabled = true;
    } else {
        checkBtn.disabled = false;
    }
}


// ===============================
// ANSWER COMPARISON
// ===============================
function compareAnswer(user, correct, q) {
    const dt = q.answerDatatype.toLowerCase();

    //number 
    if (dt === "number") {
        return Number(user) === Number(correct);
    }

    // multiple-choice 
    if (q.answerType.toLowerCase() === "multiple-choice") {
        return user.toUpperCase() === correct.toUpperCase();
    }

    // alphanumeric / text
    return user.toLowerCase() === correct.toLowerCase();
}

// ===============================
// VALIDATE ANSWER
// ===============================
validateAnswer
function validateAnswer() {
    if (!questions.length) return;

    const q = questions[currentIndex];
    const correctRaw = String(q.correct).trim();

    // If already correct → do nothing
    if (q.status === "correct") return;

    let userAnswer = "";

    if (q.answerType.toLowerCase() === "multiple-choice") {
        const active = document.querySelector(".choice-btn.active");
        if (!active) {
            feedbackEl.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> Select an option.`;
            feedbackEl.className = "mt-3 text-center bell-font fs-3 text-warning";
            return;
        }
        userAnswer = active.dataset.choice; // compare to A/B/C/D or to value
        q.lastChoice = active ? active.dataset.choice : null;
    } 
    else {
        const inputGroup = answerAreaEl.querySelector('[data-answer-inputs="true"]');
        const inputs = inputGroup ? Array.from(inputGroup.querySelectorAll("input")) : [];

        const rawValues = inputs.map(i => i.value.trim()).filter(v => v !== "");

        if (!rawValues.length) {
            feedbackEl.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> Enter an answer.`;
            feedbackEl.className = "mt-3 text-center bell-font fs-3 text-warning";
            return;
        }

        userAnswer = rawValues.join("");
        q.lastAnswer = userAnswer;
    }

    const isCorrect = compareAnswer(userAnswer, correctRaw, q);

    if (isCorrect) {
        q.status = "correct";
        score += Number(q.score || 0);
        scoreEl.textContent = score;
        feedbackEl.innerHTML = `<i class="bi bi-check-circle-fill"></i> Correct!`;
        feedbackEl.className = "mt-3 text-center bell-font fs-3 text-success";
        checkBtn.disabled = true;
        } 
    else {
        q.status = "incorrect";
        score -= 50; 
        scoreEl.textContent = score;
        feedbackEl.innerHTML = `<i class="bi bi-x-circle-fill"></i> Incorrect. Try again.`;
        feedbackEl.className = "mt-3 text-center bell-font fs-3 text-danger";
        checkBtn.disabled = false;
    }
}



// ===============================
// LOAD EXCEL FILE
// ===============================
fetch("../assets/AcrossTheWall.xlsx")
    .then(res => res.arrayBuffer())
    .then(buffer => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const header = rows[0];
        const idx = {
            room: header.indexOf("question-room"),
            score: header.indexOf("score"),
            q1: header.indexOf("question1"),
            q2: header.indexOf("question2"),
            q2Datatype: header.indexOf("question2-datatype"),
            answerType: header.indexOf("answer-type"),
            answerDatatype: header.indexOf("answer-datatype"),
            answerPrefix: header.indexOf("answer-prefix"),
            answerSuffix: header.indexOf("answer-suffix"),
            answerLength: header.indexOf("answer-length"),
            correct: header.indexOf("correct-answer"),
            A: header.indexOf("A"),
            B: header.indexOf("B"),
            C: header.indexOf("C"),
            D: header.indexOf("D")
        };

        for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (!r[idx.room]) continue;

            if (r[idx.room].trim().toUpperCase() === room.toUpperCase()) {
                questions.push({
                    room: r[idx.room],
                    score: Number(r[idx.score] || 0),
                    q1: r[idx.q1] || "",
                    q2: r[idx.q2] || "",
                    q2Datatype: r[idx.q2Datatype] || "",
                    answerType: r[idx.answerType] || "",
                    answerDatatype: r[idx.answerDatatype] || "",
                    answerPrefix: r[idx.answerPrefix] || "",
                    answerSuffix: r[idx.answerSuffix] || "",
                    answerLength: r[idx.answerLength] || "",
                    correct: r[idx.correct] || "",
                    status: "unanswered",
                    options: {
                        A: r[idx.A] || "",
                        B: r[idx.B] || "",
                        C: r[idx.C] || "",
                        D: r[idx.D] || ""
                    },
                    lastAnswer: null,
                    lastChoice: null
                });
            }
        }

        questions = shuffle(questions);
        if (questions.length === 0) {
            feedbackEl.textContent = "No questions found for this room.";
            checkBtn.disabled = true;
            return;
        }

        renderQuestion();
    })
    .catch(err => {
        console.error("XLSX load error", err);
        feedbackEl.textContent = "Error loading questions.";
        checkBtn.disabled = true;
    });



// ===============================
// BUTTON EVENTS
// ===============================
restartBtn.addEventListener("click", restartGame);
checkBtn.addEventListener("click", validateAnswer);

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    }
});
