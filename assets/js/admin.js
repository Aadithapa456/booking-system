import {
  getUserData,
  getRoomData,
  updateLocalStorageData,
} from "./fetch-localstorage.js";

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
document.addEventListener("roomDeleted", (event) => {
  deleteDialog(event.detail.roomId, event.detail.row);
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
  updateTable = getUserData();
  roomData = getRoomData();
  // }, 400);
  // let updateTable = getUserData();
  // let roomData = getRoomData();
  updateTable.forEach((newBookingData, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${index + 1}</td>
    <td>${newBookingData.name}</td>
    <td>${newBookingData.email}</td>
    <td>${newBookingData.contact}</td>
    <td>${newBookingData.type}</td>
    <td>${new Date(newBookingData.checkin).toLocaleDateString()}</td>
    `;
    bookingTbody.appendChild(newRow);
  });
}
function updateRoomsInfo() {
  let roomsTbody = document.querySelector(".manage-rooms-tbody");
  updateTable = getUserData();
  updateTable = getUserData();
  roomData = getRoomData();
  // }, 400);
  roomsTbody.innerHTML = ``;
  Object.entries(roomData).map(([roomId, room]) => {
    let newBookingData = updateTable.find((data) => data.id == roomId); // Returns object of user data whose room id matches the current room Id
    let roomAvailableDate;
    // If change in data or new entry is available and that room is vacant(State edited) then it sets the available date of new entry
    if (newBookingData && room.status != "Vacant") {
      roomAvailableDate = new Date(
        newBookingData.checkout
      ).toLocaleDateString();
    } else {
      roomAvailableDate = " - ";
    }
    let currentStatus = room.status; // Exctracts the room status of current room
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
  let kingBedInfo;
  let queenBedInfo;
  let singleBedInfo;
  if (isKingSizedAvailable) {
    kingBedInfo = kingSizedCount
  }
  if (isQueenSizedAvailable) {
    queenBedInfo = queenSizedCount;
  }
  if (isSingleSizedAvailable) {
    singleBedInfo = singleSizedCount;
  }
  let newBookingData = {
    [newRoomId]: {
      type: newRoomType,
      image: newRoomImg,
      capacity: newRoomCapacity,
      price: Number(newRoomRate),
      // bedInfo: bedInfoArr.join(" "),
      kingBedInfo : kingBedInfo,
      queenBedInfo: queenBedInfo,
      singleBedInfo : singleBedInfo,
      status: "Vacant",
    },
  };
  const updatedData = { ...currentRoomData, ...newBookingData };
  updateLocalStorageData(updatedData);
  updateRoomsInfo(); // Updates the table in manage room section
}
function deleteDialog(roomId, row) {
  let deleteDialogContainer = document.querySelector(".delete-dialog-wrapper");
  let deleteRecordBtn = document.querySelector(".delete-room-btn");
  let cancelDeletionBtn = document.querySelector(".cancel-delete-btn");
  deleteDialogContainer.style.display = "flex";
  console.log(deleteRecordBtn);
  deleteRecordBtn.addEventListener("click", () => {
    // console.log(roomId);
    let currentData = getRoomData();
    delete currentData[roomId];
    updateLocalStorageData(currentData);
    setTimeout(() => {
      row.remove();
    }, 800);
    deleteDialogContainer.style.display = "none";

    cancelDeletionBtn.addEventListener("click", () => {
      deleteDialogContainer.style.display = "none";
    });
    // console.log("HELLO");
  });
}
