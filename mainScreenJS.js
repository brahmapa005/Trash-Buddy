//////////////// Global Variables ////////////////

// let welcomeBtn = document.querySelector(".welcome-btn")

// //////////////// First screen to next screen ////////////////
// welcomeBtn.addEventListener("click", getChooseBtnNext);

// function getChooseBtnNext() {
//     let chooseBtnNext = document.querySelector("choose-btns-next-btn");
//     chooseBtnNext.addEventListener("click", putUserBtns);
// }

const btnNamesStr = localStorage.getItem("btnNames");

// var btnNames = [...btnNamesStr];
var btnNames = btnNamesStr.split();

// localStorage.removeItem("key");

// localStorage.clear();

// const numberOfKeyValuePairsStored = localStorage.length;

// const key = localStorage.key(0);

function putUserBtns() {
  let userBtns = [...document.querySelectorAll(".main-scr-user-btns")];

  console.log(userBtns.length);
  console.log(btnNames.length);
  console.log(btnNames);
  for (i = 0; i < userBtns.length; i++) {
    for (j = 0; j < btnNames.length; j++) {
      userBtns[i].innerHTML = btnNames[j];
      console.log(i, j);
    }
  }
  console.log(userBtns);
}

window.addEventListener("load", putUserBtns);
