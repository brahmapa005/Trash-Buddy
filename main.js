//////////////// Getting the text of a button (used to identify chosen user buttons) ////////////////
const btnNameTxt = {
  "Dog Poop": "dogPoop",
  "Paper": "paper",
  "Plastic Bags": "plasticBags",
  "Batteries": "batteries",
  "Furniture": "furniture",
  "Chemical Waste": "chemicalWaste",
  "Plastic": "plastic",
  "Roadkill": "roadkill"
}

const localStorage = window.localStorage;
var btnNamesStorage = localStorage.getItem("btnNames");
var btnNames;
var btnOptions = document.querySelectorAll(".choose-btns-menu-btns");
// var scr = 0;

if(btnNamesStorage == null) {
  btnNames = []
} else {
  const btnNamesMainStr = localStorage.getItem("btnNames");
  btnNames = btnNamesMainStr.split(",");

  for(i = 0; i < btnNames.length; i++) {
    let currId = btnNameTxt[btnNames[i]]
    let blueBtn = document.querySelector("#"+currId);
    console.log("BLUE",blueBtn);
    blueBtn.classList.add("choose-btns-clicked");
  }
  
}

// var btnNames = []; // For getBtnTxt function

function getBtnTxt(currBtn) {
  console.log("BUTTON");
  let btnTxt = currBtn.textContent.trim();
  if (!btnNames.includes(btnTxt)) {
    btnNames.push(btnTxt);
  }
  console.log(btnNames);
}

function removeBtnText(currBtn) {
  console.log('here', currBtn)
  let btnTxt = currBtn.textContent.trim();
   
  if (btnNames.includes(btnTxt)) {
    index = btnNames.indexOf(btnTxt);
    // btnNames.splice(index, index + 1);
    btnNames.splice(index, 1);
  }
  console.log(btnNames);
}

//////////////// Next Button Event Listener ////////////////

var nextBtn = document.querySelector(".choose-btns-next-btn");

nextBtn.addEventListener("click", postUserBtns);

// const localStorage = window.localStorage;

function postUserBtns() {
  btnNamesStr = btnNames.join(",");

  console.log(btnNamesStr);

  // const localStorage = window.localStorage;

  localStorage.setItem("btnNames", btnNamesStr);
}


//////////////// Clicking Buttons ////////////////

// let btnOptions = document.querySelectorAll(".choose-btns-menu-btns");

btnOptions.forEach((button) => {
  button.addEventListener("click", function() {
    console.log("BLUE CLICKED");
    btnClicked(button);
  });
})

function btnClicked(button) {
  console.log("HERE");
  button.classList.toggle("choose-btns-clicked");

  if(button.classList.contains("choose-btns-clicked")) {
    getBtnTxt(button);
  } else {
    removeBtnText(button);
  }

  console.log(button.classList.contains("choose-btns-clicked"));
}
