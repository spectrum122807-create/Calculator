let btn=document.querySelectorAll("button");
let display=document.getElementById("display");


btn.forEach(button =>{
   button.addEventListener("click",() => {
     
       if(button.innerText==="C"){
         display.value ="";
         
       }
      else if(button.innerText === "="){
         display.value=eval(display.value);
      }
      else{
          display.value += button.innerText;
      }
   })
});