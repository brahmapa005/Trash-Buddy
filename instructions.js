let btnTwo = document.querySelector("#instruct-scr-btn-two");
let btnFour = document.querySelector("#instruct-scr-btn-four");
let btnFive = document.querySelector("#instruct-scr-btn-five");

let instructions = document.querySelector(".instruct-scr-instruct");

let demoBtn = document.querySelector("#instruct-scr-demo-btn");

btnTwo.addEventListener("click", btnTwoFunc);
btnFour.addEventListener("click", btnFourFunc);
btnFive.addEventListener("click", btnFiveFunc);

demoBtn.addEventListener("click", demoBtnFunc);

function btnTwoFunc() {
    console.log("CLICKED");
    //Change second button to blue
    //Change first button to yellow
    //Change instructions text
    //Change position of div

}

function demoBtnFunc() {
    //Change third button to blue
    //Change second button to yellow
    //Change instructions text
    //Change position of div
    //Add plastic marker

}

function btnFourFunc() {
    //Change fourth button to blue
    //Change third button to yellow
    //Change instructions text
    //Change position of div

}

function btnFiveFunc() {
    //Change fifth button to blue
    //Change fourth button to yellow
    //Change instructions text
    //Change position of div
    //Add get started button

}
