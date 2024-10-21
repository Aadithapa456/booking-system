import { initializeDropdown } from "./dropdown.js";
import { rooms } from "./room-types.js";

//EMAIL REGEX
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// return emailRegex.test(email);

let inputName = document.querySelector("#name");
let inputContact = document.querySelector("#contact");
let inputEmail = document.querySelector("#email");
let inputCheckIn = document.querySelector("#check-in");
let inputCheckOut = document.querySelector("#check-out");
let bookBtn = document.querySelector(".book-btn");
let noOfGuests = document.querySelector("#guest-number");
//Result Popup
let resultPopUp = document.querySelector(".pop-up");
let closePopUpBtn = document.querySelector("#close-btn");
let resultInfo = document.querySelector(".result-info");
let resultTitle = document.querySelector(".result-title");
let roomCost = document.querySelector(".price-details");
bookBtn.addEventListener("click", () => {
   let checkInDate = new Date(inputCheckIn.value);
   let checkOutDate = new Date(inputCheckOut.value);
   console.log(checkInDate.getTime());
   if (checkInDate.getTime() >= checkOutDate.getTime()) {
      // Check-in date is before check-out date
      console.log("Error");
   } else {
      console.log({
         Name: inputName.value,
         Contact: inputContact.value,
         Email: inputEmail.value,
         checkin: checkInDate,
         checkout: checkOutDate.toLocaleDateString(),
         number: noOfGuests.value,
      });
   }
});

let roomDropdownContainer = document.querySelector(".dropdown-options ul");
rooms.map((room) => {
   let li = document.createElement("li");
   li.innerHTML = `${room.type}`;
   roomDropdownContainer.appendChild(li);
});
initializeDropdown(".dropdown-select-item");
let selectedOption = document.querySelector(".selected");
// console.log(selectedOption);
let myRoom = localStorage.getItem("room");
let roomPrice = localStorage.getItem("price");
selectedOption.innerHTML = myRoom;
roomCost.innerHTML = `${roomPrice} $`;
// console.log(roomCost);

//Popup logic
function showPopUp() {
   setTimeout(() => {
      resultPopUp.style.display = "flex";
      resultPopUp.classList.add("fly-in");
      resultPopUp.classList.remove("fly-out");
   }, 600);
}
closePopUpBtn.addEventListener("click", () => {
   resultPopUp.classList.remove("fly-in");
   resultPopUp.classList.add("fly-out");
   setTimeout(() => {
      resultPopUp.style.display = "none";
   }, 300); //Added 300ms delay for smoother animation
});
