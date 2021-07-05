//////////////// Getting button names from local storage ////////////////

const btnNamesStr = localStorage.getItem("btnNames");
var btnNames = btnNamesStr.split(",");

console.log("button names", btnNames);

function putUserBtns() {
  let userBtns = [...document.querySelectorAll(".main-scr-user-btns")];

  console.log(userBtns.length);
  console.log(btnNames.length);
  console.log(btnNames);
  for (i = 0; i < userBtns.length; i++) {
    userBtns[i].innerHTML = btnNames[i];
    console.log(i);
  }
  console.log(userBtns);
}

window.addEventListener("load", putUserBtns);

//////////////// Locating user when they click on button and adding marker ////////////////

let mainScrBtns = document.querySelectorAll(".main-scr-user-btns");
mainScrBtns.forEach((btn) => {
  btn.addEventListener("click", function() {
    findLocation(btn);
  });
});

function findLocation(button) {
  console.log("HERE");

  // Tracking user

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => { //This code is from Stack Overflow  https://stackoverflow.com/questions/54405968/how-to-get-the-current-location-of-the-user
      var latitude = position.coords.latitude;              
      var longitude = position.coords.longitude;

      // Adding a marker at user's location

      var marker1 = new mapboxgl.Marker() 
      .setLngLat([longitude, latitude])
      .addTo(map);
      console.log(latitude, longitude);

      // Adding data to Cloud Firestore
      
      db.collection("Trash").add({
        Coordinates: [latitude, longitude],
        Type: button.textContent
      })

    });
  }

}

function addMarker(longitude, latitude) {
  console.log("LONG", longitude);
  console.log("LAT", latitude);
  
  var el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage = 'url(https://placekitten.com/g/';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(longitude, latitude)
    .addTo(map);

  // var marker1 = new mapboxgl.Marker()
  // .setLngLat([longitude, latitude])
  // .addTo(map);
  // console.log(latitude, longitude);
}
