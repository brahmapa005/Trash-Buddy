//////////////// Getting button names from local storage ////////////////

const btnNamesStr = localStorage.getItem("btnNames");
var btnNames = btnNamesStr.split(",");
var mainScrBtns = document.querySelectorAll(".main-scr-user-btns");
console.log("button names", btnNames);

function putUserBtns() {
  let userBtns = [...mainScrBtns];

  console.log(userBtns.length);
  console.log(btnNames.length);
  console.log(btnNames);
  for (i = 0; i < userBtns.length; i++) {
    userBtns[i].innerHTML = btnNames[i];
    console.log(i);
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

            console.log("DOC", snapshot.size);

            var el = document.createElement("div");
            el.className = "marker";
            // console.log("KEY NAMES", btnNames[key]);
            el.classList.add(btnNameTxt[doc.data().Type]);

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
              .setLngLat([longitudeFin, latitudeFin])
              .addTo(map);
            // var marker1 = new mapboxgl.Marker()
            // .setLngLat([longitudeFin, latitudeFin])
            // .addTo(map);

            console.log("MAP");
          });
        });

      db.collection("Trash")
        .where("Latitude", "<=", latitudePos + 0.05)
        .where("Latitude", ">=", latitudePos - 0.05)
        .get()
        .then((snapshot) => {
          let collectionSize = snapshot.size;
          console.log("SNAPSHOT", snapshot.size);

          if (collectionSize >= 3) {
            console.log("TRASH", collectionSize);
            let callAlert = document.querySelector(".main-scr-call-alert")

            callAlert.style.display = "flex";
          }

          //   snapshot.docs.forEach(doc => {
          //     var latitudeFin = doc.data().Latitude;
          //     var longitudeFin = doc.data().Longitude;

          //     console.log("DOC", snapshot.size);

          //     var el = document.createElement('div');
          //     el.className = 'marker';
          //     // console.log("KEY NAMES", btnNames[key]);
          //     el.classList.add(btnNameTxt[doc.data().Type]);

          // // make a marker for each feature and add to the map
          //     new mapboxgl.Marker(el)
          //       .setLngLat([longitudeFin, latitudeFin])
          //       .addTo(map);
          //     // var marker1 = new mapboxgl.Marker()
          //     // .setLngLat([longitudeFin, latitudeFin])
          //     // .addTo(map);

          //     console.log("MAP");
          //   })
        });

      // Adding a marker at user's location

      // var marker1 = new mapboxgl.Marker()
      // .setLngLat([longitude, latitude])
      // .addTo(map);
      // console.log(latitude, longitude);

      // // Adding data to Cloud Firestore

      // db.collection("Trash").add({
      //   Coordinates: [latitude, longitude],
      //   Type: button.textContent
      // })
    });
  }
}

// function findTrashArea() {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       //This code is from Stack Overflow  https://stackoverflow.com/questions/54405968/how-to-get-the-current-location-of-the-user
//       var latitudePosArea = position.coords.latitude;
//       var longitudePosArea = position.coords.longitude;

//       // Getting data from database
//       db.collection("Trash")
//         .where("Latitude", "<=", latitudePosArea + 0.05)
//         .where("Latitude", ">=", latitudePosArea - 0.05)
//         .get()
//         .then((snapshot) => {
//           collectionSize = snapshot.size;

//           if (collectionSize >= 3) {
//             console.log("TRASH");
//           }

//           //   snapshot.docs.forEach(doc => {
//           //     var latitudeFin = doc.data().Latitude;
//           //     var longitudeFin = doc.data().Longitude;

//           //     console.log("DOC", snapshot.size);

//           //     var el = document.createElement('div');
//           //     el.className = 'marker';
//           //     // console.log("KEY NAMES", btnNames[key]);
//           //     el.classList.add(btnNameTxt[doc.data().Type]);

//           // // make a marker for each feature and add to the map
//           //     new mapboxgl.Marker(el)
//           //       .setLngLat([longitudeFin, latitudeFin])
//           //       .addTo(map);
//           //     // var marker1 = new mapboxgl.Marker()
//           //     // .setLngLat([longitudeFin, latitudeFin])
//           //     // .addTo(map);

//           //     console.log("MAP");
//           //   })
//         });

//       // Adding a marker at user's location

//       // var marker1 = new mapboxgl.Marker()
//       // .setLngLat([longitude, latitude])
//       // .addTo(map);
//       // console.log(latitude, longitude);

//       // // Adding data to Cloud Firestore

//       // db.collection("Trash").add({
//       //   Coordinates: [latitude, longitude],
//       //   Type: button.textContent
//       // })
//     });
//   }
// }

// Window loading events

//window.addEventListener("load", putUserBtns);
window.addEventListener("load", featuresOnLoad);
// window.addEventListener("load", getTrashData);
//window.addEventListener("load", setInterval(getTrashData, 5000));
// window.addEventListener("load", setTimeout(findTrashArea, 5000));
// setInterval(findTrashArea, 1000);
function featuresOnLoad() {
  putUserBtns();
  setInterval(getTrashData, 5000);
}

//////////////// Locating user when they click on button and adding marker ////////////////

//var mainScrBtns = document.querySelectorAll(".main-scr-user-btns");
mainScrBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log("CONTENT", btn.textContent);
    console.log(btnNameTxt);
    findLocation(btn, btn.textContent);
    addPoints(5);
  });
});

function findLocation(button, key) {
  console.log("HERE");

  // Tracking user

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      //This code is from Stack Overflow  https://stackoverflow.com/questions/54405968/how-to-get-the-current-location-of-the-user
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // Adding a marker at user's location
      var el = document.createElement("div");
      el.className = "marker";
      // console.log("KEY NAMES", btnNames[key]);
      el.classList.add(btnNameTxt[key]);

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map);

      // var marker1 = new mapboxgl.Marker()
      // .setLngLat([longitude, latitude])
      // .addTo(map);
      // console.log(latitude, longitude);

      // Adding data to Cloud Firestore

      db.collection("Trash").add({
        Latitude: latitude,
        Longitude: longitude,
        Type: button.textContent,
      });
    });
  }
}

// function addMarker(longitude, latitude) {
//   console.log("LONG", longitude);
//   console.log("LAT", latitude);

//   var el = document.createElement('div');
//   el.className = 'marker';
//   el.style.backgroundImage = 'url(https://placekitten.com/g/';

//   // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el)
//     .setLngLat(longitude, latitude)
//     .addTo(map);

//   // var marker1 = new mapboxgl.Marker()
//   // .setLngLat([longitude, latitude])
//   // .addTo(map);
//   // console.log(latitude, longitude);
// }

// Adding points to user when they click on their buttons

var score = 0;
var scoreTxt = document.querySelector(".main-scr-points-txt");

console.log("SCORE", scoreTxt);

// mainScrBtns.forEach((btn) => {
//   btn.addEventListener("click", function() {
//     console.log("SCORE", scoreTxt);
//     addPoints(5);
//   });
// });

function addPoints(pts) {
  console.log("IN POINTS");
  score += pts;
  scoreTxt.innerHTML = score;
}

// Click event on settings
let settings = document.querySelector(".main-scr-settings");

settings.addEventListener("click", reselectBtns);

function reselectBtns() {
  console.log(btnNames);
}

// Event listeners for call buttons
let btnOneMain = document.querySelector(".main-scr-call-alert-btn-one");
let btnTwoMain = document.querySelector(".main-scr-call-alert-btn-two");
let btnThreeMain = document.querySelector(".main-scr-call-alert-btn-three");

let callInstructions = document.querySelector(".main-scr-call-instruct");

let callBtnContainer = document.querySelector(".main-scr-call-btn-container")

let callBtn = document.querySelector("#main-scr-call-btn");
let noCallBtn = document.querySelector("#main-scr-no-call-btn");

btnTwoMain.addEventListener("click", btnTwoMainFunc);
btnThreeMain.addEventListener("click", btnThreeMainFunc);

callBtn.addEventListener("click", callBtnFunc);
noCallBtn.addEventListener("click", noCallBtnFunc);

function btnTwoMainFunc() {
  console.log("CLICKED BTN 2");
  btnOneMain.classList.toggle("main-scr-call-alert-curr-btn");
  btnTwoMain.classList.toggle("main-scr-call-alert-curr-btn");

  callInstructions.innerHTML = "Here's your nearest junk-line number: 1-877-311-0503";

  callBtnContainer.style.display = "flex";
  //Change second button to blue
  //Change first button to yellow
  //Change instructions text
  //Change position of div
  //Display call button options
}

function callBtnFunc() {
  console.log("CLICKED CALL BTN");
  btnTwoMain.classList.toggle("main-scr-call-alert-curr-btn");
  btnThreeMain.classList.toggle("main-scr-call-alert-curr-btn");

  callInstructions.innerHTML = "Thanks for calling! You just helped in protecting the environment and for that, you get 25 points!";

  //Change third button to blue
  //Change second button to yellow
  //Change instructions text
  //Change position of div
  //Remove div
}

function noCallBtnFunc() {
  callBtnContainer.style.display = "none";
  //Remove div
}
