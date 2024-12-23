import { initializeDropdown } from "./dropdown.js";

// Dynamically adds header to the page
fetch("../components/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".header-placeholder").innerHTML = data;
  })
  .catch((err) => console.error("Error loading header:", err));
// Accessing the room data from localstorage
let room = JSON.parse(localStorage.getItem("rooms"));

// Accessing the selected room
const urlParams = new URLSearchParams(window.location.search);
const userRequestRoomId = urlParams.get("roomId");

// REGEX
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(98|97|96|01|02|03|04|05|06|07|08|09)\d{8}$/;

// Accessing error dialog elements
let errorDialogContainer = document.querySelector(".error-container");
let closeErrorDialogButton = document.querySelector(".error-remove-btn");
let errorDialogTimeoutId;

// Accessing success dialog elements

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
// let selectedRoomEntry;
let selectedRoomId = userRequestRoomId;

//Populating the dropdown
Object.entries(room).map(([roomId, room]) => {
  let li = document.createElement("li");
  li.setAttribute("room-id", roomId);
  li.innerHTML = `${room.type}`;
  roomDropdownContainer.appendChild(li);
});

// Initializing the dropdown logic
initializeDropdown(".dropdown-select-item", roomPriceDisplay);

// Getting rate of selected room
let currentRate;
let totalPrice;
let optionsContainer = document.querySelectorAll("#option li");
// Changes the rate when any other rooms are selected from dropdown
optionsContainer.forEach((option) => {
  option.addEventListener("click", () => {
    // let selectedRate = option.getAttribute("data-price");
    selectedRoomId = option.getAttribute("room-id");
    let selectedRate = getPriceOfSelectedRoom(selectedRoomId).price;
    roomPriceDisplay.innerHTML = `${selectedRate} <span>$</span`;
    currentRate = selectedRate;
  });
});

// Changes the room rate and display room id corresponding to the room id, provided from the room selected by user
document.addEventListener("DOMContentLoaded", () => {
  // Accesing the current selected option in dropdown
  let selectedOption = document.querySelector(".selected");
  let currentRoom = getPriceOfSelectedRoom(userRequestRoomId);
  selectedOption.innerHTML = currentRoom.type || [];
  let selectedRoomPrice = currentRoom.price || "200";
  currentRate = selectedRoomPrice;
  // Updating room price according to selected room
  roomPriceDisplay.innerHTML = `${selectedRoomPrice} <span>$</span>`;
});

function getPriceOfSelectedRoom(roomId) {
  // Finds the room data from localstorage having the given roomId
  let selectedRoomEntry = Object.entries(room).find(([id, room]) => {
    return id == roomId;
  });
  return selectedRoomEntry[1]; // Actual room data is in 1st index of the array
}
function handleReservation(
  name,
  contact,
  email,
  checkin,
  checkout,
  noOfGuestsInputField,
  daysStaying
) {
  let userData = {
    name: name.value,
    contact: contact.value,
    email: email.value,
    checkin: checkin,
    checkout: checkout,
    "Guest Number": noOfGuestsInputField.value,
    daysStaying: daysStaying,
    type: document.querySelector(".selected").innerHTML,
    total: totalPrice,
    id: selectedRoomId,
  };
  // If credentials are valid then the code below will execute
  if (validateFormInputs(userData)) {
    showBookingSummary(userData);
  }
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
    if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime()) && stayPeriod > 0) {
      totalPrice = stayPeriod * currentRate;
      roomPriceDisplay.innerHTML = `${totalPrice} <span>$</span>`;
    } else {
      roomPriceDisplay.innerHTML = `${currentRate} <span>$</span>`;
    }
  }
}

bookBtn.addEventListener("click", () =>
  handleReservation(
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
contactInputField.addEventListener("input", () => {
  let invalidContactLabel = document.querySelector(".form-validation-contact");
  checkUserCredentials(invalidContactLabel, contactInputField.value, phoneRegex);
});
emailInputField.addEventListener("input", () => {
  let invalidEmailLabel = document.querySelector(".form-validation-email");
  checkUserCredentials(invalidEmailLabel, emailInputField.value, emailRegex);
});

function validateFormInputs(data) {
  let isEmailValid = emailRegex.test(data.email);
  let isContactValid = phoneRegex.test(data.contact);
  let hasError = false;

  if (!isEmailValid && !isContactValid) {
    showErrorDialog(errorDialogContainer, "Invalid contact & email");
    hasError = true;
  } else if (!isContactValid) {
    showErrorDialog(errorDialogContainer, "Invalid contact number");
    hasError = true;
  } else if (!isEmailValid) {
    showErrorDialog(errorDialogContainer, "Invalid email");
    hasError = true;
  }

  return !hasError; // Returns true only if it passes all test cases
}
function checkUserCredentials(invalidLabel, inputValue, regex) {
  if (!regex.test(inputValue)) {
    invalidLabel.style.display = "flex";
  } else {
    invalidLabel.style.display = "none";
  }
}
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

let successDialogContainer = document.querySelector(".success-dialog-container");
function showSuccessDialog() {
  successDialogContainer.classList.add("visible");
  // successDialog.style.display = "flex";
}
closeSuccessDialogBtn.addEventListener("click", () => {
  hideSuccessDialog(successDialogContainer);
});
function hideSuccessDialog(successDialog) {
  successDialog.classList.add("hide");
  successDialog.classList.remove("visible");
  resetForm();
}
function resetForm() {
  nameInputField.value = "";
  contactInputField.value = "";
  emailInputField.value = "";
  checkinInputField.value = "";
  checkoutInputField.value = "";
  roomPriceDisplay.innerHTML = "";
  noOfGuestsInputField.value = "";
}
function showBookingSummary(userData) {
  const summaryContainer = document.querySelector(".summary-wrapper");
  summaryContainer.style.display = "flex";
  const summaryDialog = document.querySelector(".summary-dialog");
  let checkInDate = new Date(userData.checkin).toLocaleDateString();
  let checkoutDate = new Date(userData.checkout).toLocaleDateString();
  summaryDialog.classList.add("summary-dialog");
  summaryDialog.innerHTML = `
            <div class="summary-title">
                Booking Summary
            </div>
            <div class="summary-info">
                <div class="summary-name">Name: <span>${userData.name}</span></div>
                <div class="summary-contact">Contact: <span>${userData.contact}</span></div>
                <div class="summary-email">Email: <span>${userData.email}</span></div>
                <div class="summary-checkin">Check-in: <span>${checkInDate}</span></div>
                <div class="summary-checkout">Check-out <span>${checkoutDate}</span></div>
                <div class="summary-price">Total: <span>${userData.total}$</span></div>
            </div>
            <div class="confirm-booking-btn">
                <button>Confirm Booking</button>
            </div>`;
  let confirmBookingBtn = document.querySelector(".confirm-booking-btn button");
  confirmBookingBtn.addEventListener("click", () => {
    summaryContainer.style.display = "none";
    saveUserData(userData);
    updateRoomStatus();
    showSuccessDialog();
  });
  summaryContainer.body.appendChild(summaryDialog);
}
function saveUserData(userData) {
  let newUserDat = JSON.parse(localStorage.getItem("user-info")) || [];
  newUserDat.push(userData);
  localStorage.setItem("user-info", JSON.stringify(newUserDat));
}
function updateRoomStatus() {
  let updatedRoomData = Object.entries(room).find(([roomId, room]) => {
    return room.type == document.querySelector(".selected").innerHTML;
  });
  updatedRoomData[1].status = "Booked";
  localStorage.setItem("rooms", JSON.stringify(room));
}
