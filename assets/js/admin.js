let bookingsBtn = document.querySelector(".bookings-btn");
let manageRoomBtn = document.querySelector(".manage-btn");
let sectionss = document.querySelectorAll("section");
let newRoomId = 106;
// Event Listeners
bookingsBtn.addEventListener("click", (e) => {
  sectionss[0].style.display = "block";
  sectionss[1].style.display = "none";
});
manageRoomBtn.addEventListener("click", () => {
  sectionss[0].style.display = "none";
  sectionss[1].style.display = "block";
});

document.addEventListener("DOMContentLoaded", updateBookingsInfo); // Since bookings tab is default
bookingsBtn.addEventListener("click", updateBookingsInfo);
manageRoomBtn.addEventListener("click", updateRoomsInfo);

// Functions
function updateBookingsInfo() {
  let bookingTbody = document.querySelector(".bookings-tbody");
  bookingTbody.innerHTML = ``;
  let updateTable = getUserData();
  updateTable.forEach((newData, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${index + 1}</td>
    <td>${newData.name}</td>
    <td>${newData.email}</td>
    <td>${newData.contact}</td>
    <td>${newData.type}</td>
    <td>${new Date(newData.checkin).toLocaleDateString()}</td>
    `;
    bookingTbody.appendChild(newRow);
  });
}
function updateRoomsInfo() {
  let roomsTbody = document.querySelector(".manage-rooms-tbody");
  let updateTable = getUserData();
  let roomData = getRoomData();
  roomsTbody.innerHTML = ``;
  Object.entries(roomData).map(([roomId, room]) => {
    let newData = updateTable.find((data) => data.id == roomId); // Returns object of user data whose room id matches the current room Id
    let roomAvailableDate;
    let currentStatus = room.status; // Exctracts the room status of current room
    if (newData) {
      roomAvailableDate = new Date(newData.checkout).toLocaleDateString();
    } else {
      roomAvailableDate = "    - ";
    }
    const newInfoRow = document.createElement("tr");
    newInfoRow.innerHTML = `
    <td>${roomId}</td>
    <td>${room.type}</td>
    <td>${room.price}</td>
    <td><span class="status ${currentStatus}">${currentStatus}</span></td>
    <td >${roomAvailableDate}</td>
    <td>
        <button class="edit-data"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-data"> <i class="fa-solid fa-trash"></i></button>
    </td>
    `;
    roomsTbody.appendChild(newInfoRow);
    // }
  });

  toggleModal();
  addEditDeleteListeners();
}

function getElementValue(elem) {
  return document.querySelector(elem).value;
}

// Accessing Modal elements

function toggleModal() {
  let modalContainer = document.querySelector(".add-room-modal");
  let newRoomInputField = document.querySelector("#room-type");
  let roomImageInputField = document.querySelector("#room-img");
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
    addNewRoom(
      newRoomInputField.value,
      roomImageInputField.value,
      roomCapacityInputField.value,
      kingSizedCheckbox.checked,
      kingSizedCountInputField.value,
      queenSizedCheckbox.checked,
      queenSizedCountInputField.value,
      singleSizedCheckbox.checked,
      singleSizedCountInputField.value,
      roomRateInputField.value,
      newRoomId
    );
  });

  let addRoomBtn = document.querySelector(".add-room-btn");
  addRoomBtn.addEventListener("click", () => {
    // modalContainer.classList.add("fade-in")
    modalContainer.style.display = "flex";
  });
  closeModalBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
  newRoomId++;
}
function getUserData() {
  let userInfo = JSON.parse(localStorage.getItem("user-info"));
  return userInfo;
}
function addEditDeleteListeners() {
  const editBtns = document.querySelectorAll(".edit-data");
  const deleteBtns = document.querySelectorAll(".delete-data");

  editBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", handleEditRoom)
  );
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", handleDeleteRoom)
  );
}
function handleEditRoom(event) {
  const row = event.target.closest("tr");
  const roomId = row.cells[0].innerHTML;
  let editRateInputField = document.querySelector("#rate");
  let editStatusInputField = document.querySelector("#status");
  let currentData = getRoomData();
  // Extracts the room-data which matches the room-data of the button of the row
  let requiredData = Object.entries(currentData).find(
    ([Id, room]) => roomId == Id
  );
  let submitBtn = document.querySelector(".submit-btn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //Edits the room-data in localstorage
    requiredData[1].status = editStatusInputField.value;
    requiredData[1].price = Number(editRateInputField.value);
    updateLocalStorageData(currentData);
    console.log(requiredData);
  });
  showEditRoomModal(roomId);
}
function handleDeleteRoom(event) {
  const row = event.target.closest("tr");
  const roomId = row.cells[0].innerHTML;
  let currentData = getRoomData();
  delete currentData[roomId]; // Deletes the data of the roomId corresponding to the selected row
  updateLocalStorageData(currentData);
  row.remove();
}
function showEditRoomModal(roomId) {
  // let editBtn = document.querySelectorAll(".edit-data");
  let modalEditRoom = document.querySelector(".modal-edit-room");
  let closeModalEditRoomBtn = document.querySelector(".close-edit-modal");
  let roomIdDisplay = document.querySelector("#roomId");
  modalEditRoom.style.display = "flex";
  roomIdDisplay.value = roomId;
  closeModalEditRoomBtn.addEventListener("click", () => {
    hideEditRoomModal(modalEditRoom);
  });
}
function hideEditRoomModal(modalEditRoom) {
  modalEditRoom.style.display = "none";
}
function getRoomData() {
  let roomData = JSON.parse(localStorage.getItem("rooms"));
  return roomData;
}
function updateLocalStorageData(roomData) {
  let newRoomData = localStorage.setItem("rooms", JSON.stringify(roomData));
}
function addNewRoom(
  newRoom,
  newRoomImg,
  newRoomCapacity,
  isKingSizedAvailable,
  kingSizedCount,
  isQueenSizedAvailable,
  queenSizedCount,
  isSingleSizedAvailable,
  singleSizedCount,
  newRoomRate,
  newRoomId
) {
  let currentRoomData = getRoomData();
  let bedInfoArr = [];
  if (isKingSizedAvailable) {
    bedInfoArr.push(`${kingSizedCount} King Sized`);
  }
  if (isQueenSizedAvailable) {
    bedInfoArr.push(`${queenSizedCount} Queen Sized`);
  }
  if (isSingleSizedAvailable) {
    bedInfoArr.push(`${singleSizedCount} Single Bed`);
  }
  let newData = {
    [newRoomId]: {
      type: newRoom,
      image: newRoomImg,
      capacity: newRoomCapacity,
      price: Number(newRoomRate),
      bedInfo: bedInfoArr.join("+"),
      status: "Vacant",
    },
  };
  const updatedData = { ...currentRoomData, ...newData };
  updateLocalStorageData(updatedData);
}
