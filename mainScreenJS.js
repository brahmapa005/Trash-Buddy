//////////////// Getting button names from local storage ////////////////

const btnNamesStr = localStorage.getItem("btnNames");
var btnNames = btnNamesStr.split(",");
var mainScrBtns = document.querySelectorAll(".main-scr-user-btns");
var btnNamesElement;
console.log("button names", btnNames);

function putUserBtns() {
  let userBtns = [...mainScrBtns];

  console.log(btnNames);
  for (i = 0; i < userBtns.length; i++) {
    btnNamesElement = btnNames[i];

    if(btnNamesElement === undefined) {
      userBtns[i].innerHTML = "";
    } else {
      userBtns[i].innerHTML = btnNames[i];
    }
  }
  console.log(userBtns);
}

// Collecting all trash data once screen loads

function getTrashData() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      //This code is from Stack Overflow  https://stackoverflow.com/questions/54405968/how-to-get-the-current-location-of-the-user
      var latitudePos = position.coords.latitude;
      var longitudePos = position.coords.longitude;

      // Getting data from database
      db.collection("Trash")
        .where("Latitude", "<=", latitudePos + 0.25)
        .where("Latitude", ">=", latitudePos - 0.25)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            var latitudeFin = doc.data().Latitude;
            var longitudeFin = doc.data().Longitude;

            var popupCollect = new mapboxgl.Popup({ offset: 25 }).setText(
              doc.data().Type
              );

            var el = document.createElement("div");
            el.className = "marker";
            el.classList.add(btnNameTxt[doc.data().Type]);

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
              .setLngLat([longitudeFin, latitudeFin])
              .setPopup(popupCollect) // sets a popup on this marker
              .addTo(map);

          });
        });

      db.collection("Trash")
        .where("Latitude", "<=", latitudePos + 0.05)
        .where("Latitude", ">=", latitudePos - 0.05)
        .get()
        .then((snapshot) => {
          let collectionSize = snapshot.size;

          if (collectionSize >= 3) {
            let callAlert = document.querySelector(".main-scr-call-alert")

            callAlert.style.display = "flex";
          }
        });
    });
  }
}


// Window loading events
window.addEventListener("load", featuresOnLoad);

function featuresOnLoad() {
  putUserBtns();
  // setInterval(getTrashData, 5000);
  getTrashData();
}

//////////////// Locating user when they click on button and adding marker ////////////////

mainScrBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    findLocation(btn, btn.textContent);
    addPoints(5);
  });
});

function findLocation(button, key) {

  // Tracking user

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      //This code is from Stack Overflow  https://stackoverflow.com/questions/54405968/how-to-get-the-current-location-of-the-user
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // create the popup
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(
          key
          // "HI"
      );

      // Adding a marker at user's location
      var el = document.createElement("div");
      el.className = "marker";
      el.classList.add(btnNameTxt[key]);

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat([longitude, latitude]).setPopup(popup).addTo(map);

      // Adding data to Cloud Firestore

      db.collection("Trash").add({
        Latitude: latitude,
        Longitude: longitude,
        Type: button.textContent,
      });
    });
  }
}

// Adding points to user when they click on their buttons

var score = 0;
var scoreTxt = document.querySelector(".main-scr-points-txt");

function addPoints(pts) {
  score += pts;
  scoreTxt.innerHTML = score;
}

// Click event on settings
let settings = document.querySelector(".main-scr-settings");


// Event listeners for call buttons
let btnOneMain = document.querySelector(".main-scr-call-alert-btn-one");
let btnTwoMain = document.querySelector(".main-scr-call-alert-btn-two");
let btnThreeMain = document.querySelector(".main-scr-call-alert-btn-three");

let callInstructions = document.querySelector(".main-scr-call-instruct");

let callBtnContainer = document.querySelector(".main-scr-call-btn-container");
let callAlertContainer = document.querySelector(".main-scr-call-alert");

let callBtn = document.querySelector("#main-scr-call-btn");
console.log('btn',callBtn)
let noCallBtn = document.querySelector("#main-scr-no-call-btn");

btnTwoMain.addEventListener("click", btnTwoMainFunc);

function btnTwoMainFunc() {
  
  btnOneMain.classList.toggle("main-scr-call-alert-curr-btn");
  btnTwoMain.classList.toggle("main-scr-call-alert-curr-btn");

  callInstructions.innerHTML = "Here's your nearest junk-line number: 1-877-311-0503";

  callBtnContainer.style.display = "flex";

  callBtn.style.display = "inline";
  noCallBtn.style.display = "inline";

  callBtn.addEventListener("click", callBtnFunc);
  noCallBtn.addEventListener("click", noCallBtnFunc);
}

function callBtnFunc() {
  console.log('iamgettingclicked')
  btnTwoMain.classList.toggle("main-scr-call-alert-curr-btn");
  btnThreeMain.classList.toggle("main-scr-call-alert-curr-btn");

  callInstructions.innerHTML = "Thanks for calling! You just helped in protecting the environment and for that, you get 25 points!";

  addPoints(25);
}

function noCallBtnFunc() {
  callAlertContainer.style.display = "none";
  callBtnContainer.style.display = "none";
}
