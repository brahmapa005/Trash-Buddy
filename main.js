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

if(btnNamesStorage == null) {
  btnNames = []
} else {
  const btnNamesMainStr = localStorage.getItem("btnNames");
  btnNames = btnNamesMainStr.split(",");

  for(i = 0; i < btnNames.length; i++) {
    let currId = btnNameTxt[btnNames[i]]
    let blueBtn = document.querySelector("#"+currId);

    blueBtn.classList.add("choose-btns-clicked");
  }
  
}

function getBtnTxt(currBtn) {
  let btnTxt = currBtn.textContent.trim();
  if (!btnNames.includes(btnTxt)) {
    btnNames.push(btnTxt);
  }
}

function removeBtnText(currBtn) {
  let btnTxt = currBtn.textContent.trim();
   
  if (btnNames.includes(btnTxt)) {
    index = btnNames.indexOf(btnTxt);
    
    btnNames.splice(index, 1);
  }
}

//////////////// Next Button Event Listener ////////////////

var nextBtn = document.querySelector(".choose-btns-next-btn");

nextBtn.addEventListener("click", postUserBtns);


function postUserBtns() {
  btnNamesStr = btnNames.join(",");

  localStorage.setItem("btnNames", btnNamesStr);
}


//////////////// Clicking Buttons ////////////////

btnOptions.forEach((button) => {
  button.addEventListener("click", function() {
    btnClicked(button);
  });
})

function btnClicked(button) {
  button.classList.toggle("choose-btns-clicked");

  if(button.classList.contains("choose-btns-clicked")) {
    getBtnTxt(button);
  } else {
    removeBtnText(button);
  }
}
