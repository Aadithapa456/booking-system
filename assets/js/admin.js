let bookingsBtn = document.querySelector(".bookings-btn");
let manageRoomBtn = document.querySelector(".manage-btn");
let sectionss = document.querySelectorAll("section");

// Event Listeners
bookingsBtn.addEventListener("click", (e) => {
  sectionss[0].style.display = "block";
  sectionss[1].style.display = "none";
});
manageRoomBtn.addEventListener("click", () => {
  sectionss[0].style.display = "none";
  sectionss[1].style.display = "block";
  toggleModal();
});
bookingsBtn.addEventListener("click", updateBookingsInfo);
manageRoomBtn.addEventListener("click", updateRoomsInfo);

// Functions

function updateBookingsInfo() {
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
function updateRoomsInfo() {
  let roomsTbody = document.querySelector(".manage-rooms-tbody");
  let updateTable = getUserData();
  let roomData = getRoomData();
  roomsTbody.innerHTML = ``;
  Object.entries(roomData).map(([roomId, room]) => {
    let newData = updateTable.find((data) => data.id == roomId); // Returns object of user data whose room id matches the current room Id
    let currentStatus;
    if (newData) {
      currentStatus = "Booked";
    } else {
      currentStatus = "Vacant";
    }
    const newInfoRow = document.createElement("tr");
    newInfoRow.innerHTML = `
    <td>${roomId}</td>
    <td>${room.type}</td>
    <td>${room.price}</td>
    <td><span class="status ${room.status}">${currentStatus}</span></td>
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
function showEditRoomModal(roomId) {
  // let editBtn = document.querySelectorAll(".edit-data");
  let modalEditRoom = document.querySelector(".modal-edit-room");
  let closeModalEditRoomBtn = document.querySelector(".close-edit-modal");
  let roomIdDisplay = document.querySelector("#roomId");
  // let deleteBtn = document.querySelectorAll(".delete-data");
  roomIdDisplay.value = roomId;
  modalEditRoom.style.display = "flex";
  closeModalEditRoomBtn.addEventListener("click", () => {
    modalEditRoom.style.display = "none";
  });
}
function handleEditRoom(event) {
  const row = event.target.closest("tr");
  const roomId = row.cells[0].innerHTML;
  showEditRoomModal(roomId);
}
function handleDeleteRoom(event) {
  const row = event.target.closest("tr");
  console.log(row);
  row.remove();
}

function getRoomData() {
  let roomData = JSON.parse(localStorage.getItem("rooms"));
  return roomData;
}
