let btn = document.querySelectorAll("button");
let display = document.getElementById("display");

let ans = "";
let text = "";
let cursorPos = 0;

// 🔥 Render display with blinking cursor
function renderDisplay() {
    let before = text.slice(0, cursorPos);
    let after = text.slice(cursorPos);

    display.innerHTML = before + '<span class="cursor"></span>' + after;
}

// 🔥 Insert text at cursor
function insertAtCursor(value) {
    text = text.slice(0, cursorPos) + value + text.slice(cursorPos);
    cursorPos += value.length;
}

// 🔥 Main logic
function handleInput(value) {

    if (value === "AC") {
        text = "";
        cursorPos = 0;
        ans = "";
    }

    else if (value === "⌫") {
        if (cursorPos > 0) {
            text = text.slice(0, cursorPos - 1) + text.slice(cursorPos);
            cursorPos--;
        }
    }

    else if (value === "Ans") {
        if (ans !== "") {
            insertAtCursor(ans.toString());
        }
    }

    else if (value === "=") {
        try {
            ans = eval(text);
            ans= Math.round(ans * Math.pow(10,20)) /Math.pow(10,20) ;
            text = ans.toString();
            cursorPos = text.length;
        } catch {
            text = "Error";
            cursorPos = text.length;
        }
    }

    else if (value === "left") {
        cursorPos = Math.max(0, cursorPos - 1);
    }

    else if (value === "right") {
        cursorPos = Math.min(text.length, cursorPos + 1);
    }

    else {
        let lastChar = text.slice(-1);
        let operators = ["+", "-", "*", "/"];

        if (operators.includes(value) && operators.includes(lastChar)) {
            return;
        }

        insertAtCursor(value);
    }

    renderDisplay(); // 🔥 VERY IMPORTANT
}

// 🔥 Button clicks (IMPORTANT FIX)
btn.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.dataset.value || button.textContent.trim());
    });
});

// 🔥 Keyboard support
document.addEventListener("keydown", (event) => {
    let key = event.key;

    if (key === "ArrowLeft") {
        handleInput("left");
        return;
    }

    if (key === "ArrowRight") {
        handleInput("right");
        return;
    }

    if (key === "Enter") {
        handleInput("=");
        return;
    }

    if (key === "Escape") {
        handleInput("AC");
        return;
    }

    if (key === "Backspace") {
        handleInput("⌫");
        return;
    }

    if (key.toLowerCase() === "a") {
        handleInput("Ans");
        return;
    }

    let allowedKeys = "0123456789+-*/.";

    if (allowedKeys.includes(key)) {
        handleInput(key);
    }
});

// 🔥 Initialize display
renderDisplay();
