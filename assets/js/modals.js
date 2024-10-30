import { getRoomData, updateLocalStorageData } from "./room-data.js";

// Dynamically adding add room modal component in DOM
fetch("add-room-modal.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".add-room-modal-placeholder").innerHTML = data;
    initializeModal();
  });
fetch("edit-room-modal.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".edit-room-modal-placeholder").innerHTML = data;
    addEditDeleteListeners();
  });

// Accessing Add Room Modal elements
function initializeModal() {
  let modalContainer = document.querySelector(".add-room-modal");
  let newRoomIdInputField = document.querySelector("#room-id");
  let newRoomTypeInputField = document.querySelector("#room-type");
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
    const ROOM_DATA = {
      roomType: newRoomTypeInputField.value,
      imageUrl: roomImageInputField.value,
      capacity: roomCapacityInputField.value,
      isKingSized: kingSizedCheckbox.checked,
      kingSizedCount: kingSizedCountInputField.value,
      isQueenSized: queenSizedCheckbox.checked,
      queenSizedCount: queenSizedCountInputField.value,
      isSingleSized: singleSizedCheckbox.checked,
      singleSizedCount: singleSizedCountInputField.value,
      rate: roomRateInputField.value,
      id: newRoomIdInputField.value,
    };
    const submitEvent = new CustomEvent("roomAdded", { detail: ROOM_DATA });
    document.dispatchEvent(submitEvent);
    modalContainer.style.display = "none";
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
function addEditDeleteListeners() {
  const editBtns = document.querySelectorAll(".edit-data");
  const deleteBtns = document.querySelectorAll(".delete-data");

  editBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", handleEditRoom)
  );
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", handleDeleteRoom)
  );
  let closeModalEditRoomBtn = document.querySelector(".close-edit-modal");
  closeModalEditRoomBtn.addEventListener("click", () => {
    hideEditRoomModal();
  });
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
  let submitEditedRoomBtn = document.querySelector(".submit-btn");
  submitEditedRoomBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //Edits the room-data in localstorage
    requiredData[1].status = editStatusInputField.value;
    requiredData[1].price = Number(editRateInputField.value);
    updateLocalStorageData(currentData);
    hideEditRoomModal();
    const editEvent = new CustomEvent("roomEdited", { detail: currentData });
    document.dispatchEvent(editEvent);
  });
  showEditRoomModal(roomId);
}
function showEditRoomModal(roomId) {
  let modalEditRoom = document.querySelector(".modal-edit-room");
  let roomIdDisplay = document.querySelector("#roomId");
  modalEditRoom.style.display = "flex";
  roomIdDisplay.value = roomId;
}
function handleDeleteRoom(event) {
  const row = event.target.closest("tr");
  const roomId = row.cells[0].innerHTML;
  // let currentData = getRoomData();
  // delete currentData[roomId]; // Deletes the data of the roomId corresponding to the selected row
  // updateLocalStorageData(currentData);
  // row.remove();
  const DELETE_EVENT = new CustomEvent("roomDeleted", {
    detail: { roomId, row },
  });
  document.dispatchEvent(DELETE_EVENT);
}

function hideEditRoomModal() {
  document.querySelector(".modal-edit-room").style.display = "none";
}
