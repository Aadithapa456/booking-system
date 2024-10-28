import { getUserData, getRoomData } from "./fetch-localstorage.js";
let bookingsBtn = document.querySelector(".bookings-btn");
let manageRoomBtn = document.querySelector(".manage-btn");
let sectionss = document.querySelectorAll("section");
let updateTable = getUserData();
let roomData = getRoomData();
// Event Listeners
bookingsBtn.addEventListener("click", (e) => {
  sectionss[0].style.display = "block";
  sectionss[1].style.display = "none";
});
manageRoomBtn.addEventListener("click", () => {
  sectionss[0].style.display = "none";
  sectionss[1].style.display = "block";
});
document.addEventListener("roomAdded", (event) => {
  const roomData = event.detail;
  addNewRoom(
    roomData.roomType,
    roomData.imageUrl,
    roomData.capacity,
    roomData.isKingSized,
    roomData.kingSizedCount,
    roomData.isQueenSized,
    roomData.queenSizedCount,
    roomData.isSingleSized,
    roomData.singleSizedCount,
    roomData.rate,
    roomData.id
  );
});
// document.addEventListener(
//   "DOMContentLoaded",
//   updateRoomsInfo,
//   updateBookingsInfo
// );
document.addEventListener("DOMContentLoaded", () => {
  updateBookingsInfo();
  updateRoomsInfo();
});
// Functions
function updateBookingsInfo() {
  let bookingTbody = document.querySelector(".bookings-tbody");
  bookingTbody.innerHTML = ``;
  // setInterval(() => {
  //   updateTable = getUserData();
  //   roomData = getRoomData();
  // }, 400);
  let updateTable = getUserData();
  let roomData = getRoomData();
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
  // setInterval(() => {
  //   updateTable = getUserData();
  //   roomData = getRoomData();
  // }, 400);
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
}

function getElementValue(elem) {
  return document.querySelector(elem).value;
}

function updateLocalStorageData(roomData) {
  let newRoomData = localStorage.setItem("rooms", JSON.stringify(roomData));
}
function addNewRoom(
  newRoomType,
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
      type: newRoomType,
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
