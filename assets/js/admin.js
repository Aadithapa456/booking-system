import {
  getUserData,
  getRoomData,
  updateLocalStorageData,
} from "./room-data.js";

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
// If the room is edited the data is instantly updated on the UI
document.addEventListener("roomEdited", (event) => {
  console.log(event.detail);
  updateRoomsInfo(event.detail);
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
  updateTable = getUserData() || [];
  roomData = getRoomData();
  // }, 400);
  // let updateTable = getUserData();
  // let roomData = getRoomData();
  updateTable.forEach((newBookingData, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td data-label ="S.N" >${index + 1}</td>
    <td data-label ="Name" >${newBookingData.name}</td>
    <td data-label ="Email" >${newBookingData.email}</td>
    <td data-label ="Contact" >${newBookingData.contact}</td>
    <td data-label ="Room Booked" >${newBookingData.type}</td>
    <td data-label ="Check-in Data" >${new Date(
      newBookingData.checkin
    ).toLocaleDateString()}</td>
    `;
    bookingTbody.appendChild(newRow);
  });
}
function updateRoomsInfo() {
  let roomsTbody = document.querySelector(".manage-rooms-tbody");
  updateTable = getUserData() || [];
  roomData = getRoomData() || {};
  // }, 400);
  roomsTbody.innerHTML = ``;
  Object.entries(roomData).map(([roomId, room]) => {
    let newBookingData = updateTable.find((data) => data.id == roomId); // Returns object of user data whose room id matches the current room Id
    let roomAvailableDate;
    // If change in data or new entry is available and that room is vacant(State edited) then it sets the available date of new entry
    if (newBookingData && newBookingData.checkout && room.status !== "Vacant") {
      roomAvailableDate = new Date(
        newBookingData.checkout
      ).toLocaleDateString();
    } else {
      roomAvailableDate = " -";
    }
    let currentStatus = room.status; // Exctracts the room status of current room
    const newInfoRow = document.createElement("tr");
    newInfoRow.innerHTML = `
    <td data-label = "Room Id">${roomId}</td>
    <td data-label = "Room Type">${room.type}</td>
    <td data-label = "Rate">${room.price}</td>
    <td data-label = "Status"><span class="status ${currentStatus}">${currentStatus}</span></td>
    <td data-label = "Available From" >${roomAvailableDate}</td>
    <td data-label = "Update">
        <div class = "td-edit-area flex">
          <button class="edit-data"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-data"> <i class="fa-solid fa-trash"></i></button>
        </div>
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
  let newBookingData = {
    [newRoomId]: {
      type: newRoomType,
      image: newRoomImg,
      capacity: newRoomCapacity,
      price: Number(newRoomRate),
      bedInfo: bedInfoArr.join(" | "),
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
  let exitDeletionBtn = document.querySelector(".exit-btn");
  console.log(cancelDeletionBtn);
  deleteDialogContainer.style.display = "flex";
  deleteRecordBtn.addEventListener("click", () => {
    // console.log(roomId);
    let currentData = getRoomData();
    delete currentData[roomId];
    updateLocalStorageData(currentData);
    setTimeout(() => {
      row.remove();
    }, 800);
    // deleteDialogContainer.style.display = "none";
    hideDeleteDialog(deleteDialogContainer);
    // console.log("HELLO");
  });
  cancelDeletionBtn.addEventListener("click", () => {
    hideDeleteDialog(deleteDialogContainer);
  });
  exitDeletionBtn.addEventListener("click", () => {
    hideDeleteDialog(deleteDialogContainer);
  });
}
function hideDeleteDialog(deleteDialogContainer) {
  deleteDialogContainer.style.display = "none";
}
// Sidebar Toggle Logic
document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  const wrapper = document.querySelector(".wrapper");

  // Toggle sidebar visibility
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    wrapper.classList.toggle("active"); // Adjust main content if needed
  });
  // Close sidebar when clicking outside of it on mobile
  document.addEventListener("click", (event) => {
    if (
      !sidebar.contains(event.target) &&
      !sidebarToggle.contains(event.target)
    ) {
      sidebar.classList.remove("active");
      wrapper.classList.remove("active");
    }
  });
});
