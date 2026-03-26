let btn=document.querySelectorAll("button");
let display=document.getElementById("display");

let ans = "";
function handleInput(value) {

    if (value === "C") {
        display.value = "";
          ans = ""; 
    }
    else if(value === "back"){
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
    if (key === "Escape") key = "C";
    if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
        return;
    }
     let allowedKeys = "0123456789+-*/.=C";

    if (allowedKeys.includes(key)) {
        handleInput(key);
    }
    
});
