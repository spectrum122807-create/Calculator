let btn=document.querySelectorAll("button");
let display=document.getElementById("display");

let ans = "";
function handleInput(value) {

    if (value === "AC") {
        display.value = "";
          ans = ""; 
    }
    else if(value === "⌫"){
        display.value= display.value.slice(0, -1);
    }

    else if (value === "=") {
        try {
            ans= eval(display.value);
         display.value =ans;
        } catch {
            display.value = "Error";
        }
    }

    else if (value === "Ans") {
        display.value += ans; // use stored value
    }

    else {
        // Prevent duplicate operators
        let lastChar = display.value.slice(-1);
        let operators = ["+", "-", "*", "/"];

        if (operators.includes(value) && operators.includes(lastChar)) {
            return; // stop invalid input like ++
        }

        display.value += value;
    }
}
btn.forEach(button =>{
   button.addEventListener("click",() => {
     
        handleInput(button.innerText);
   })
});
document.addEventListener("keydown", (event) => {
    let key = event.key;

    if (key === "Enter") key = "=";
    if (key === "Escape") key = "AC";
    if (key === "Backspace") key ="⌫"; {
        display.value = display.value.slice(0, -1);
        return;
    }
     let allowedKeys = "0123456789+-*/.=AC";

    if (allowedKeys.includes(key)) {
        handleInput(key);
    }
    
});
