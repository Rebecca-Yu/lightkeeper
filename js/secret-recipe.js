// ===============================
// GAME STATE
// ===============================
let allQuestions = [];
let levelQuestions = {
    1: [],
    2: [],
    3: []
};
let currentLevel = null;
let currentIndexByLevel = { 1: 0, 2: 0, 3: 0 };
let answeredByLevel = { 1: new Set(), 2: new Set(), 3: new Set() };
let totalScore = 0;

const methods = ["steam", "mix", "fry", "boil", "stir-fry", "assemble", "blend", "bake"];

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// ===============================
// DOM ELEMENTS
// ===============================
const scoreDisplay = document.getElementById("scoreDisplay");
const level1Btn = document.getElementById("level1Btn");
const level2Btn = document.getElementById("level2Btn");
const level3Btn = document.getElementById("level3Btn");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const dishNameEl = document.getElementById("dishName");
const ingredientPlaceholdersEl = document.getElementById("ingredientPlaceholders");
const ingredientSectionEl = document.getElementById("ingredientSection");
const ingredientOptionsEl = document.getElementById("ingredientOptions");
const methodPlaceholdersEl = document.getElementById("methodPlaceholders");
const methodSectionEl = document.getElementById("methodSection");
const methodOptionsEl = document.getElementById("methodOptions");
const checkBtn = document.getElementById("checkBtn");
const feedbackEl = document.getElementById("feedback");
const restartBtn = document.getElementById("restartBtn");

// ===============================
// UTILITIES
// ===============================
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getClassName(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
}

function updateScore(delta) {
    totalScore += delta;
    scoreDisplay.textContent = totalScore;
}

function clearQuestionUI() {
    ingredientPlaceholdersEl.innerHTML = "";
    ingredientSectionEl.classList.add("d-none");
    ingredientOptionsEl.innerHTML = "";
    methodOptionsEl.innerHTML = "";
    methodSectionEl.classList.add("d-none");
    feedbackEl.textContent = "";
    checkBtn.disabled = true;
}

function applyLevel(btn) {
    btn.classList.remove("btn-outline-dark");
    btn.classList.add("btn-dark");
    for (const b of [level1Btn, level2Btn, level3Btn]) {
        if (b !== btn) {
            b.classList.remove("btn-dark");
            b.classList.add("btn-outline-dark");
        }
    }
}

function setPlaceholderText(box){
    if (box.dataset.slotType === "method"){
        box.textContent = "click/ drop method here"
    }
    else if (currentLevel === 1 && box.dataset.slotType === "ingredient") {
        box.textContent = "click/ drop ingredient here"
    }
    else if (box.dataset.slotIndex === "0" && box.dataset.slotType === "ingredient") {
        box.textContent = "click/ drop ingredients here"
    }
    else {
        box.textContent = "click/ drop item here";
    }
}

// ===============================
// RENDERING
// ===============================
function renderQuestion(level) {
    clearQuestionUI();

    const questions = levelQuestions[level];
    const answeredSet = answeredByLevel[level];

    let idx = currentIndexByLevel[level];
    while (idx < questions.length && answeredSet.has(idx)) {
        idx++;
    }

    if (idx >= questions.length) {
        dishNameEl.textContent = "No more questions in this level.";
        nextQuestionBtn.disabled = true;
        checkBtn.disabled = true;
        return;
    }

    currentIndexByLevel[level] = idx;
    const q = questions[idx];

    dishNameEl.textContent = q.dishName;

    // Ingredient placeholders + setup drag click behaviour
    if (level === 1) {
        const row = document.createElement("div");
        row.className = "d-flex flex-wrap";
        q.correctIngredients.forEach((_, i) => {
            const box = document.createElement("div");
            box.className = "placeholder-box single-placeholder m-1 responsive-text";
            box.dataset.slotType = "ingredient";
            box.dataset.slotIndex = String(i);
            setPlaceholderText(box)
            setupPlaceholderDragDrop(box);
            row.appendChild(box);
        });
        ingredientPlaceholdersEl.appendChild(row);
    } 
    else {
        const row = document.createElement("div");
        const box = document.createElement("div");
        box.className = "placeholder-box m-1 responsive-text";
        box.dataset.slotType = "ingredient";
        box.dataset.slotIndex = "0";
        setPlaceholderText(box)
        setupPlaceholderDragDrop(box);
        row.appendChild(box);
        ingredientPlaceholdersEl.appendChild(row);
    }

    // Method options + setup drag click behaviour (level 3)
    if (level === 3) {
        setupPlaceholderDragDrop(methodPlaceholdersEl);
        methodSectionEl.classList.remove("d-none");
        methods.forEach((m, i) => {
            const card = createOptionCard("method", m.toLowerCase());
            methodOptionsEl.appendChild(card);
        });
    }

    // Ingredient options
    q.ingredients.forEach((ing, i) => {
        const card = createOptionCard("ingredient", ing.toLowerCase());
        ingredientOptionsEl.appendChild(card);
    });
    ingredientSectionEl.classList.remove("d-none");

    checkBtn.disabled = false;
    nextQuestionBtn.disabled = false;
}

function createOptionCard(type, value) {
    const card = document.createElement("button");
    const img = document.createElement("img");
    const text = document.createElement("div");
    text.textContent = value;
    text.className = "responsive-text";
    img.src = `../images/recipes/${type}s/${value.toLowerCase()}.png`;
    img.className = "card-img-top pt-2";
    cardClass = getClassName(value);
    card.className = `btn btn-outline-dark m-1 option-card ${cardClass}`;
    card.draggable = true;
    card.dataset.optionType = type;
    card.dataset.value = value;
    setupOptionCard(card);
    card.appendChild(img);
    card.appendChild(text);
    return card;
}

// ===============================
// DRAG & CLICK BEHAVIOUR
// ===============================
function selectOption(type, value) {
    const cardClass = getClassName(value);
    const optionCard = document.querySelector(`.${cardClass}:not([data-is-placeholder])`);
    if (optionCard) {
        optionCard.classList.remove("btn-outline-dark");
        optionCard.classList.add("btn-dark", "text-light");
    }
}

function unselectOption(type, value) {
    const cardClass = getClassName(value);
    const optionCard = document.querySelector(`.${cardClass}:not([data-is-placeholder])`);
    if (optionCard) {
        optionCard.classList.remove("btn-dark", "text-light");
        optionCard.classList.add("btn-outline-dark");
    }
}

function setupOptionCard(card) {
    // Drag listener
    card.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", JSON.stringify({
            type: card.dataset.optionType,
            value: card.dataset.value
        }));
    });

    // card.addEventListener("dragend", () => {
    // });

    // Click to toggle in/out of placeholders
    card.addEventListener("click", () => {
        const type = card.dataset.optionType;
        const value = card.dataset.value;

        // If already selected in some placeholder, remove it
        if (card.classList.contains("btn-dark")) {
            // Find the placeholder box containing this value
            const box = document.querySelector(`.placeholder-box[data-slot-type='${type}'][data-values*='${value}']`);
            // Find the actual card inside the placeholder
            const placeholderCard = box?.querySelector(`.option-card[data-value='${value}']`);
            removeValueFromPlaceholders(type, value, box, placeholderCard);
        } 
        else {
            addValueToPlaceholders(type, value);
        }
    });
}

function setupPlaceholderDragDrop(box) {
    box.addEventListener("dragover", e => {
        e.preventDefault(); // Allow drop
        box.classList.add("hovering"); // Add visual feedback for drag over
    });

    box.addEventListener("dragleave", () => {
        if (!box.dataset.values) {
            box.classList.remove("hovering"); // Remove visual feedback if no values hovering over
        }
    });

    box.addEventListener("drop", e => {
        e.preventDefault(); //Allow drop
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        const type = data.type;
        const value = data.value;

        box.classList.remove("hovering");

        // Find the respective option card and mark it selected
        selectOption(type, value);
        addValueToSpecificPlaceholder(box, type, value);
    });

    // Click to clear this placeholder
    box.addEventListener("click", e => {
        // If user clicked a card, do nothing here.
        // Card has its own click handler.
        if (e.target !== box) return;

        // LEVEL 1: clicking empty placeholder should do nothing
        if (currentLevel === 1) return;

        // LEVEL 2 & 3: clicking empty placeholder clears everything
        box.dataset.values = "";
        box.innerHTML = "";
        box.classList.remove("filled");
        setPlaceholderText(box);

        // Unselect all cards of this type
        const cards = document.querySelectorAll(`.option-card[data-option-type='${box.dataset.slotType}']`);
        cards.forEach(card => {
            unselectOption(box.dataset.slotType, card.dataset.value);
        });
    });
}

function addValueToPlaceholders(type, value) {
    if (type === "method") {
        // Only one method placeholder
        if (methodPlaceholdersEl) {
            addValueToSpecificPlaceholder(methodPlaceholdersEl, type, value);
        }
    } 
    else {
        // Ingredient: add to first ingredient placeholder that has room
        const boxes = ingredientPlaceholdersEl.querySelectorAll(".placeholder-box");
        if (boxes.length === 0) return;

        if (currentLevel === 1) { // Level 1: one value per box
            for (const box of boxes) {
                const vals = (box.dataset.values || "").split("|").filter(v => v);
                if (vals.length === 0) { //if single placeholder box empty
                    addValueToSpecificPlaceholder(box, type, value);
                    return;
                }
            }
        } 
        else { // Level 2 & 3: single big box (index 0)
            const box = boxes[0];
            addValueToSpecificPlaceholder(box, type, value);
        }
    }
}

function addValueToSpecificPlaceholder(box, type, value) {
    const slotType = box.dataset.slotType;
    if (slotType !== type) return;

    // Prevent duplicates across ALL ingredient boxes
    if (type === "ingredient") {
        const allBoxes = ingredientPlaceholdersEl.querySelectorAll(".placeholder-box[data-slot-type='ingredient']");
        for (const b of allBoxes) {
            const vals = (b.dataset.values || "").split("|").filter(v => v);
            if (vals.includes(value)) {
                // restore placeholder text if box is empty
                if (!box.dataset.values || box.dataset.values === "") {
                    box.classList.remove("filled","hovering");
                    setPlaceholderText(box);
                }
                return;
            }
        }
    }

    let vals = (box.dataset.values || "").split("|").filter(v => v);

    // Level 1 or method → only one card allowed
    if (type === "method" || currentLevel === 1) {
        const previousValue = vals[0]; // old value
        // Unselect previous option card BEFORE replacing
        if (previousValue && previousValue !== value) {
            unselectOption(type, previousValue);
        }

        vals = [value]; //replace with new value
        box.innerHTML = "";
    } 
    else {
        // only add if value not in placeholder
        if (vals.includes(value)) return;
        vals.push(value);

        // Remove placeholder text when first card is added
        if (vals.length === 1) {
            box.innerHTML = "";
        }
    }

    // Update dataset
    box.dataset.values = vals.join("|");
    box.classList.add("filled");

    // Create actual card element INSIDE placeholder
    const card = createOptionCard(type, value);
    card.dataset.isPlaceholder = "true";

    card.addEventListener("click", () => {
        removeValueFromPlaceholders(type, value, box, card);
    });

    // Select the option card in the options list
    selectOption(type, value);
    box.appendChild(card);
}

function removeValueFromPlaceholders(type, value, box, card) {
    // Remove the card element directly
    card.remove();

    // Update dataset
    let vals = (box.dataset.values || "").split("|").filter(v => v);
    const newVals = vals.filter(v => v !== value);
    box.dataset.values = newVals.length ? newVals.join("|") : "";

    // Restore placeholder text only if empty
    if (newVals.length === 0) {
        box.classList.remove("filled","hovering");
        setPlaceholderText(box);
    }

    // Unselect the option card in the options list
    unselectOption(type, value);
}


// ===============================
// CHECK ANSWER
// ===============================
function getUserSelection(level) {
    //extract user selection based on what is in placeholder box for ingredients
    const ingredientBoxes = ingredientPlaceholdersEl.querySelectorAll(".placeholder-box[data-slot-type='ingredient']");
    let selectedIngredients = [];
    ingredientBoxes.forEach(box => {
        const vals = (box.dataset.values || "").split("|").filter(v => v);
        selectedIngredients = selectedIngredients.concat(vals);
    });

    //extract user selection based on what is in placeholder box for method
    let selectedMethod = null;
    if (level === 3) {
        if (methodPlaceholdersEl) {
            const vals = (methodPlaceholdersEl.dataset.values || "").split("|").filter(v => v);
            if (vals.length > 0) selectedMethod = vals[0];
        }
    }

    return { selectedIngredients, selectedMethod };
}

function checkAnswer() {
    if (!currentLevel) return;

    // retrieve current question
    const questions = levelQuestions[currentLevel];
    const idx = currentIndexByLevel[currentLevel];
    const q = questions[idx];

    // retrieve user answer
    const { selectedIngredients, selectedMethod } = getUserSelection(currentLevel);

    // map to set (order doesn't matter, ignore duplicates)
    const correctSet = new Set(q.correctIngredients.map(s => s.toLowerCase()));
    const userSet = new Set(selectedIngredients.map(s => s.toLowerCase()));

    // check same num of ingredients and every ingredient selection is correct
    let ingredientsCorrect =
        correctSet.size === userSet.size &&
        [...correctSet].every(v => userSet.has(v));

    // check method selection is correct
    let methodCorrect = true;
    if (currentLevel === 3) {
        methodCorrect =
            selectedMethod &&
            selectedMethod.toLowerCase() === q.correctMethod.toLowerCase();
    }

    // set feedback
    if (ingredientsCorrect && methodCorrect) {
        feedbackEl.textContent = "Correct! +" + q.score;
        feedbackEl.style.color = "green";
        updateScore(q.score);
        // Mark question as answered + disable submit
        answeredByLevel[currentLevel].add(idx);
        checkBtn.disabled = true;
    } 
    else {
        feedbackEl.textContent = "Incorrect. -100";
        feedbackEl.style.color = "red";
        updateScore(-100);
    }

    // check if at least one question in this level is not answered
    const questionsLeft = levelQuestions[currentLevel].some(
        (_, i) => !answeredByLevel[currentLevel].has(i)
    );
    // If no more questions, disable next
    if (!questionsLeft) {
        nextQuestionBtn.disabled = true;
    }
}



// ===============================
// XLSX LOAD
// ===============================
fetch("../assets/SecretRecipe.xlsx")
    .then(res => res.arrayBuffer())
    .then(buffer => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const header = rows[0];
        const idx = {
            score: header.indexOf("score"),
            dishName: header.indexOf("dish-name"),
            correctMethod: header.indexOf("correct-method"),
            correctIngredients: header.indexOf("correct-ingredients"),
            ingredient1: header.indexOf("ingredient1"),
            ingredient2: header.indexOf("ingredient2"),
            ingredient3: header.indexOf("ingredient3"),
            ingredient4: header.indexOf("ingredient4"),
            ingredient5: header.indexOf("ingredient5"),
            ingredient6: header.indexOf("ingredient6"),
            ingredient7: header.indexOf("ingredient7"),
            ingredient8: header.indexOf("ingredient8"),
            ingredient9: header.indexOf("ingredient9"),
            ingredient10: header.indexOf("ingredient10")
        };

        for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (!r[idx.score] || !r[idx.dishName]) continue;

            const ingredients = [];
            for (let k = 1; k <= 10; k++) {
                const colIndex = idx["ingredient" + k];
                if (colIndex !== -1 && r[colIndex]) {
                    ingredients.push(String(r[colIndex]).trim());
                }
            }

            allQuestions.push({
                score: Number(r[idx.score]),
                dishName: String(r[idx.dishName]).trim(),
                correctMethod: r[idx.correctMethod] 
                                ? String(r[idx.correctMethod]).trim() 
                                : "",
                correctIngredients: (r[idx.correctIngredients]
                                    ? String(r[idx.correctIngredients]).trim()
                                    : "")
                                    .split(",")
                                    .map(s => s.trim())
                                    .filter(s => s.length > 0),
                ingredients: ingredients
            });
        }

        // Divide into levels
        levelQuestions[1] = shuffle(allQuestions.filter(q => q.score === 100));
        levelQuestions[2] = shuffle(allQuestions.filter(q => q.score === 300));
        levelQuestions[3] = shuffle(allQuestions.filter(q => q.score === 500));
    })
    .catch(err => {
        console.error("XLSX LOAD ERROR:", err);
        dishNameEl.textContent = "Error loading questions.";
    });


// ===============================
// EVENTS
// ===============================

level1Btn.onclick = () => {
    if (currentLevel === 1) return; // Already in level 1
    currentLevel = 1;
    applyLevel(level1Btn);
    renderQuestion(1);
};

level2Btn.onclick = () => {
    if (currentLevel === 2) return; // Already in level 2 
    currentLevel = 2;
    applyLevel(level2Btn);
    renderQuestion(2);
};

level3Btn.onclick = () => {
    if (currentLevel === 3) return; // Already in level 3
    currentLevel = 3;
    applyLevel(level3Btn);
    renderQuestion(3);
};

nextQuestionBtn.onclick = () => {
    if (!currentLevel) return;
    currentIndexByLevel[currentLevel]++;
    renderQuestion(currentLevel);
};

checkBtn.onclick = () => {
    checkAnswer();
};

restartBtn.onclick = () => {
    // Reset game state
    currentLevel = null;
    currentIndexByLevel = { 1: 0, 2: 0, 3: 0 };
    answeredByLevel = { 1: new Set(), 2: new Set(), 3: new Set() };
    totalScore = 0;
    scoreDisplay.textContent = totalScore;
    clearQuestionUI();
    dishNameEl.textContent = "Choose a level to begin.";
    for (const b of [level1Btn, level2Btn, level3Btn]) {
        b.classList.remove("btn-dark");
        b.classList.add("btn-outline-dark");
    }
}