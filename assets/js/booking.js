import { initializeDropdown } from "./dropdown.js";
import { rooms } from "./room-types.js";

// REGEX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(98|97|96|01|02|03|04|05|06|07|08|09)\d{8}$/;
// Accessing error dialogue elements
let errorDialogContainer = document.querySelector(".error-container");
let closeErrorDialogButton = document.querySelector(".error-remove-btn");
let errorDialogTimeoutId;

let nameInputField = document.querySelector("#name");
let contactInputField = document.querySelector("#contact");
let emailInputField = document.querySelector("#email");
let checkinInputField = document.querySelector("#check-in");
let checkoutInputField = document.querySelector("#check-out");
let checkInDate, checkOutDate, stayPeriod;
let bookBtn = document.querySelector(".book-btn");
let noOfGuestsInputField = document.querySelector("#guest-number");
let roomPriceDisplay = document.querySelector(".price-details");
let roomDropdownContainer = document.querySelector(".dropdown-options ul");
// let pricing = [];
//Populating the dropdown
rooms.map((room, index) => {
   let li = document.createElement("li");
   li.setAttribute("data-price", room.price);
   li.innerHTML = `${room.type}`;
   roomDropdownContainer.appendChild(li);
});
// Initializing the dropdown logic
initializeDropdown(".dropdown-select-item", roomPriceDisplay);

// Getting rate of selected room
let currentRate;
let optionsContainer = document.querySelectorAll("#option li");
optionsContainer.forEach((option) => {
   option.addEventListener("click", () => {
      let selectedRate = option.getAttribute("data-price");
      roomPriceDisplay.innerHTML = `${selectedRate} <span>$</span`;
      currentRate = selectedRate;
   });
});
document.addEventListener("DOMContentLoaded", () => {
   let selectedOption = document.querySelector(".selected"); // Accesing the current selected option in dropdown
   let myRoom = localStorage.getItem("room");
   let selectedRoomPrice = localStorage.getItem("price");
   // let selectedRoomPrice = "200";
   selectedOption.innerHTML = myRoom;
   roomPriceDisplay.innerHTML = `${selectedRoomPrice} <span>$</span>`; // Updating room price according to selected room
});

function reservation(
   name,
   contact,
   email,
   checkin,
   checkout,
   noOfGuestsInputField,
   daysStaying
) {
   if (!emailRegex.test(email.value) || !phoneRegex.test(contact.value)) {
      showErrorCard(errorDialogContainer, "Invalid Info");
   }

   console.log({
      Name: name.value,
      Contact: contact.value,
      Email: email.value,
      checkin: checkin,
      checkout: checkout,
      "Guest Number": noOfGuestsInputField.value,
      daysStaying: daysStaying,
   });
}
function updatePricing() {
   let currentTime = new Date();
   currentTime.setHours(0, 0, 0, 0); // Normalize currentTime to midnight
   checkInDate = new Date(checkinInputField.value);
   checkOutDate = new Date(checkoutInputField.value);
   checkOutDate.setHours(12, 0, 0, 0);
   let differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
   stayPeriod = Math.floor(differenceInTime / (1000 * 3600 * 24)); //Converts milliseconds to days;

   if (differenceInTime < 0 || checkInDate.getTime() < currentTime) {
      showErrorCard(errorDialogContainer, "Invalid check-in date");
   } else {
      if (
         !isNaN(checkInDate.getTime()) &&
         !isNaN(checkOutDate.getTime()) &&
         stayPeriod > 0
      ) {
         let totalPrice = stayPeriod * currentRate;
         roomPriceDisplay.innerHTML = `${totalPrice} <span>$</span>`;
      } else {
         roomPriceDisplay.innerHTML = `${currentRate}<span>$</span>`;
      }
   }
}

bookBtn.addEventListener("click", () =>
   reservation(
      nameInputField,
      contactInputField,
      emailInputField,
      checkInDate,
      checkOutDate,
      noOfGuestsInputField,
      stayPeriod
   )
);
checkinInputField.addEventListener("input", () => updatePricing());
checkoutInputField.addEventListener("input", () => updatePricing());
closeErrorDialogButton.addEventListener("click", () => {
   hideErrorCard(errorDialogContainer, 1190);
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
   clearTimeout(errorDialogTimeoutId);
   errorCard.classList.add("hide");
   errorCard.classList.remove("visible");
   errorDialogTimeoutId = setTimeout(() => {
      errorCard.style.display = "none";
   }, 1190);
}
