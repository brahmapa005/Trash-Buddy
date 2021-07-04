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

let mainScrBtns = document.querySelectorAll(".main-scr-user-btns");
mainScrBtns.forEach((btn) => {
  btn.addEventListener("click", findLocation);
});

function findLocation() {
  console.log("HERE");
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      addMarker(longitude, latitude);
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
