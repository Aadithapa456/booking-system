import { initializeDropdown } from "./dropdown.js";
// Accessing the room data from localstorage
let room = JSON.parse(localStorage.getItem("rooms"));
// Accessing the selected room
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");
const price = urlParams.get("price");

// REGEX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(98|97|96|01|02|03|04|05|06|07|08|09)\d{8}$/;
// Accessing error dialog elements
let errorDialogContainer = document.querySelector(".error-container");
let closeErrorDialogButton = document.querySelector(".error-remove-btn");
let errorDialogTimeoutId;
// Accessing success dialog elements
let successDialogContainer = document.querySelector(
  ".success-dialog-container"
);
// Accessing the form input fields
let closeSuccessDialogBtn = document.querySelector(".success-close-btn");
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
// let selectedRoom;
let selectedRoomEntry;
let selectedRoomId;
//Populating the dropdown
Object.entries(room).map(([roomId, room]) => {
  let li = document.createElement("li");
  li.setAttribute("data-price", room.price);
  li.setAttribute("room-id", roomId);
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
    selectedRoomId = option.getAttribute("room-id");
    roomPriceDisplay.innerHTML = `${selectedRate} <span>$</span`;
    currentRate = selectedRate;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let selectedOption = document.querySelector(".selected"); // Accesing the current selected option in dropdown
  selectedRoomEntry = Object.entries(room).find(([id, room]) => {
    return id == roomId;
  }); // Returns the array of room data having the selected room's ID
  selectedOption.innerHTML = selectedRoomEntry[1].type;
  console.log(selectedRoomEntry[1]);
  let selectedRoomPrice = price; // Directly accesses the price from url param
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
  if (!emailRegex.test(email.value) && !phoneRegex.test(contact.value)) {
    showErrorDialog(errorDialogContainer, "Invalid email & contact");
  } else if (!phoneRegex.test(contact.value)) {
    showErrorDialog(errorDialogContainer, "Invalid contact");
  } else if (!emailRegex.test(email.value)) {
    showErrorDialog(errorDialogContainer, "Invalid email");
  } else {
    showSuccessDialog(successDialogContainer);
  }
  let userData = {
    name: name.value,
    contact: contact.value,
    email: email.value,
    checkin: checkin,
    checkout: checkout,
    "Guest Number": noOfGuestsInputField.value,
    daysStaying: daysStaying,
    type: document.querySelector(".selected").innerHTML,
    rate: currentRate,
    id: selectedRoomId,
  };
  saveUserData(userData);
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
    showErrorDialog(errorDialogContainer, "Invalid check-in date");
  } else {
    // If user hasn't entered both check-in and out date then else part will be executed
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

function showErrorDialog(errorCard, message) {
  let errorText = document.querySelector(".error-text");
  errorText.innerHTML = message;
  errorCard.style.display = "flex";
  errorCard.classList.add("visible");
  errorCard.classList.remove("hide");
  setTimeout(() => {
    hideErrorCard(errorCard);
  }, 3200);
}
function hideErrorCard(errorCard) {
  clearTimeout(errorDialogTimeoutId);
  errorCard.classList.add("hide");
  errorCard.classList.remove("visible");
  errorDialogTimeoutId = setTimeout(() => {
    errorCard.style.display = "none";
  }, 1190);
}

function showSuccessDialog(successDialog) {
  successDialog.classList.add("visible");
  // successDialog.style.display = "flex";
}
closeSuccessDialogBtn.addEventListener("click", () => {
  hideSuccessDialog(successDialogContainer);
});
function hideSuccessDialog(successDialog) {
  successDialog.classList.add("hide");
  successDialog.classList.remove("visible");
  // resetForm();
}
function resetForm() {
  // showBookingSummary(
  //   nameInputField.value,
  //   contactInputField.value,
  //   emailInputField.value,
  //   checkin
  // );
  nameInputField.value = "";
  contactInputField.value = "";
  emailInputField.value = "";
  checkinInputField.value = "";
  checkoutInputField.value = "";
  roomPriceDisplay.innerHTML = "";
}
// function showBookingSummary(name, contact, email, checkin, checkout) {
//   const summaryDialog = document.createElement("div");
//   summaryDialog.classList.add("summary-dialog");
//   summaryDialog.innerHTML = `
//        <h2>Booking Summary</h2>
//        <p><strong>Name:</strong> ${name}</p>
//        <p><strong>Contact:</strong> ${contact}</p>
//        <p><strong>Email:</strong> ${email}</p>
//        <p><strong>Check-in Date:</strong> ${checkin}</p>
//        <p><strong>Check-out Date:</strong> ${checkout}</p>
//        <button onclick="closeSummary()">Close</button>
//    `;
//   document.body.appendChild(summaryDialog);
// }

// function addRoom() {}
function saveUserData(userData) {
  let newUserDat = JSON.parse(localStorage.getItem("user-info"));
  newUserDat.push(userData);
  localStorage.setItem("user-info", JSON.stringify(newUserDat));
}
