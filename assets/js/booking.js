import { initializeDropdown } from "./dropdown.js";
import { rooms } from "./room-types.js";

//EMAIL REGEX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accessing error dialogue elements
let errorCardContainer = document.querySelector(".error-container");
let closeErrorCardBtn = document.querySelector(".error-remove-btn");
let timeoutId;

let inputName = document.querySelector("#name");
let inputContact = document.querySelector("#contact");
let inputEmail = document.querySelector("#email");
let inputCheckIn = document.querySelector("#check-in");
let inputCheckOut = document.querySelector("#check-out");
let checkInDate, checkOutDate, stayPeriod;
let bookBtn = document.querySelector(".book-btn");
let noOfGuests = document.querySelector("#guest-number");
let roomCost = document.querySelector(".price-details");
let roomDropdownContainer = document.querySelector(".dropdown-options ul");

//Populating the dropdown
rooms.map((room) => {
   let li = document.createElement("li");
   li.innerHTML = `${room.type}`;
   roomDropdownContainer.appendChild(li);
});
// Initializing the dropdown logic
initializeDropdown(".dropdown-select-item");

let selectedOption = document.querySelector(".selected"); // Accesing the current selected option in dropdown
let myRoom = localStorage.getItem("room");
let roomPrice = localStorage.getItem("price");
selectedOption.innerHTML = myRoom;
roomCost.innerHTML = `${roomPrice} $`; // Updating room price according to selected room
function reservation(
   name,
   contact,
   email,
   checkin,
   checkout,
   noOfGuests,
   daysStaying
) {
   if (!emailRegex.test(inputEmail.value)) {
      showErrorCard(errorCardContainer, "Invalid Email");
   }

   console.log({
      Name: name.value,
      Contact: contact.value,
      Email: email.value,
      checkin: checkin,
      checkout: checkout,
      number: noOfGuests.value,
      daysStaying: daysStaying,
   });
   // console.log(checkOutDate);
}
function updatePricing(roomPrice) {
   let currentTime = new Date();
   currentTime.setHours(0, 0, 0, 0); // Normalize currentTime to midnight
   checkInDate = new Date(inputCheckIn.value);
   checkOutDate = new Date(inputCheckOut.value);
   checkOutDate.setHours(12, 0, 0, 0);
   let differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
   stayPeriod = Math.floor(differenceInTime / (1000 * 3600 * 24)); //Converts milliseconds to days;
   if (differenceInTime < 0 || checkInDate.getTime() < currentTime) {
      showErrorCard(errorCardContainer, "Invalid check-in date");
      roomCost.innerHTML = ` `;
   } else {
      roomCost.textContent = `${stayPeriod * roomPrice} $`;
   }
}

bookBtn.addEventListener("click", () =>
   reservation(
      inputName,
      inputContact,
      inputEmail,
      checkInDate,
      checkOutDate,
      noOfGuests,
      stayPeriod
   )
);
inputCheckIn.addEventListener("input", () => updatePricing(roomPrice));
inputCheckOut.addEventListener("input", () => updatePricing(roomPrice));
closeErrorCardBtn.addEventListener("click", () => {
   hideErrorCard(errorCardContainer, 1190);
});

function showErrorCard(errorCard, message) {
   let errorText = document.querySelector(".error-text");
   errorText.innerHTML = message;
   errorCard.style.display = "flex";
   errorCard.classList.add("visible");
   errorCard.classList.remove("hide");
   setTimeout(() => {
      hideErrorCard(errorCard);
   }, 3000);
}
function hideErrorCard(errorCard) {
   // console.log(errorCard);
   clearTimeout(timeoutId);
   errorCard.classList.add("hide");
   errorCard.classList.remove("visible");
   timeoutId = setTimeout(() => {
      errorCard.style.display = "none";
   }, 1190);
}
