let btnOne = document.querySelector(".instruct-scr-call-alert-btn-one")
let btnTwo = document.querySelector(".instruct-scr-call-alert-btn-two");
let btnThree = document.querySelector(".instruct-scr-call-alert-btn-three");
let btnFour = document.querySelector(".instruct-scr-call-alert-btn-four");
let btnFive = document.querySelector(".instruct-scr-call-alert-btn-five");

let instructionsDiv = document.querySelector(".instruct-scr-instruct-div");

let instructions = document.querySelector(".instruct-scr-instruct");

let demoBtn = document.querySelector("#instruct-scr-demo-btn");

let instructWelcomeBtn = document.querySelector(".instruct-scr-get-started-btn");

window.addEventListener("load", firstInstruction);

btnTwo.addEventListener("click", btnTwoFunc);
btnFour.addEventListener("click", btnFourFunc);
btnFive.addEventListener("click", btnFiveFunc);

demoBtn.addEventListener("click", demoBtnFunc);

function firstInstruction() {
    instructionsDiv.style.display = "flex";
}

function btnTwoFunc() {
    btnOne.classList.toggle("instruct-scr-call-alert-curr-btn");
    btnTwo.classList.toggle("instruct-scr-call-alert-curr-btn");

    instructions.innerHTML = "See plastic? Just click the corresponding button. Give it a try!";

    instructionsDiv.style.marginTop = "200px";
}

function demoBtnFunc() {
    btnTwo.classList.toggle("instruct-scr-call-alert-curr-btn");
    btnThree.classList.toggle("instruct-scr-call-alert-curr-btn");

    instructions.innerHTML = "Now, you've put plastic on the map so  others around you can be aware of it!";

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            //This code is from Stack Overflow  https://stackoverflow.com/questions/54405968/how-to-get-the-current-location-of-the-user
            var latitudeInstructPos = position.coords.latitude;
            var longitudeInstructPos = position.coords.longitude;
      
            var instructMarker = document.createElement("div");
            instructMarker.className = "instructMarker";
      
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(instructMarker)
                .setLngLat([longitudeInstructPos, latitudeInstructPos])
                .addTo(map);
      
        });
    }
}

function btnFourFunc() {
    btnThree.classList.toggle("instruct-scr-call-alert-curr-btn");
    btnFour.classList.toggle("instruct-scr-call-alert-curr-btn");

    instructions.innerHTML = "When you enter an area with a lot of trash, you'll be prompted to call the junk line. If you do, you get points for future rewards!";

    instructionsDiv.style.height = "200px";
}

function btnFiveFunc() {
    btnFour.classList.toggle("instruct-scr-call-alert-curr-btn");
    btnFive.classList.toggle("instruct-scr-call-alert-curr-btn");

    instructions.innerHTML = "Now, you're all set to mark trash as you go. Remember to keep clicking for more rewards!";

    instructionsDiv.style.height = "150px";

    instructWelcomeBtn.style.display = "flex";
}
