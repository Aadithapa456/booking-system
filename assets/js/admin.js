let bookingsBtn = document.querySelector(".bookings-btn");
let manageRoomBtn = document.querySelector(".manage-btn");
let sectionss = document.querySelectorAll("section");
bookingsBtn.addEventListener("click", (e) => {
  sectionss[0].style.display = "block";
  sectionss[1].style.display = "none";
});
manageRoomBtn.addEventListener("click", () => {
  sectionss[0].style.display = "none";
  sectionss[1].style.display = "block";
  toggleModal();
});
bookingsBtn.addEventListener("click", showBookingsInfo);
function showBookingsInfo() {
  let bookingTbody = document.querySelector(".bookings-tbody");
  bookingTbody.innerHTML = ``;
  let updateTable = getUserData();
  updateTable.forEach((newData) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${newData.name}</td>
    <td>${newData.email}</td>
    <td>${newData.contact}</td>
    <td>${newData.type}</td>
    <td>${new Date(newData.checkin).toLocaleDateString()}</td>
    `;
    bookingTbody.appendChild(newRow);
  });
}

manageRoomBtn.addEventListener("click", () => {
  let roomsTbody = document.querySelector(".manage-rooms-tbody");
  let updateTable = getUserData();
  roomsTbody.innerHTML = ``;
  updateTable.forEach((newData) => {
    const newInfoRow = document.createElement("tr");
    newInfoRow.innerHTML = `
    <td>${newData.id}</td>
    <td>${newData.type}</td>
    <td>${newData.rate}</td>
    <td><span class="status booked">Booked</span></td>
    `;
    roomsTbody.appendChild(newInfoRow);
  });
  toggleModal();
});
function getElementValue(elem) {
  return document.querySelector(elem).value;
}

// Accessing Modal elements

function toggleModal() {
  let modalContainer = document.querySelector(".add-room-modal");
  let newRoomInputField = document.querySelector("#room-type");
  let roomCapacityInputField = document.querySelector("#room-capacity");
  let kingSizedCheckbox = document.querySelector("#king-sized");
  let kingSizedCountInputField = document.querySelector("#king-sized-count");
  let queenSizedCheckbox = document.querySelector("#queen-sized");
  let queenSizedCountInputField = document.querySelector("#queen-sized-count");
  let singleSizedCheckbox = document.querySelector("#single-sized");
  let singleSizedCountInputField = document.querySelector(
    "#single-sized-count"
  );
  let roomRateInputField = document.querySelector("#price");
  let submitRoomBtn = document.querySelector(".submit-room-btn");
  let closeModalBtn = document.querySelector(".close-modal");
  submitRoomBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const roomDetails = {
      roomType: newRoomInputField.value,
      roomCapacity: roomCapacityInputField.value,
      kingSized: {
        selected: kingSizedCheckbox.checked,
        count: kingSizedCountInputField.value,
      },
      queenSized: {
        selected: queenSizedCheckbox.checked,
        count: queenSizedCountInputField.value,
      },
      singleSized: {
        selected: singleSizedCheckbox.checked,
        count: singleSizedCountInputField.value,
      },
      price: roomRateInputField.value,
    };

    // Log the room details object to the console
    console.log(roomDetails);
  });

  let addRoomBtn = document.querySelector(".add-room-btn");
  addRoomBtn.addEventListener("click", () => {
    // modalContainer.classList.add("fade-in")
    modalContainer.style.display = "flex";
  });
  closeModalBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
}
function getUserData() {
  let userInfo = JSON.parse(localStorage.getItem("user-info"));
  return userInfo;
}
