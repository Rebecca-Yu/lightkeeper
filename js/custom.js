
// PIN FUNCTION
// INPUT BUTTONS
let btns = document.getElementsByClassName("pinpad-btn");
let pinInput = document.getElementById("pinpad-input");
for (let i = 0; i < btns.length; i++) {
    let btn = btns.item(i);
    if (btn.id && (btn.id === "submit-btn" || btn.id === "delete-btn"))
        continue;

    // Add onclick event listener to Every button from 0 - 9
    btn.addEventListener("click", (event) => {
        if (pinInput.value.length < 4)
            pinInput.value += event.target.value;
    });
}

// OK BUTTON
let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click",() => {
        var page = "index";
        switch(pinInput.value) {
            case "111":
                page = "enlighten-me";
                break;
            case "222":
                page = "secret-recipe";
                break;
            case "3331":
                page = "across-the-wallA";
                break;
            case "3332":
                page = "across-the-wallZ";
                break;
            case "444":
                page = "guess-who";
                break;
            default:
                page = "error404";
        }
        window.location = "./pages/" + page + ".html";
        // Reset the input
        pinInput.value = "";
    }
);

// DELETE BUTTON
let delBtn = document.getElementById("delete-btn");
delBtn.addEventListener("click", () => {
    if (pinInput.value)
        pinInput.value = pinInput.value.substr(0, pinInput.value.length - 1);
});


