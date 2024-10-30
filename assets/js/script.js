import { rooms } from "./room-data.js";
import { initializeDropdown } from "./dropdown.js";

fetch("../components/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".header-placeholder").innerHTML = data;
  })
  .catch((err) => console.error("Error loading header:", err));

let searchDelay;
let roomCardContainer = document.querySelector(".room-card-area");
updateLocalStorage(rooms);
let roomsData = JSON.parse(localStorage.getItem("rooms")) || rooms;
// Creats room card elements from localstorage
let newRooms = Object.entries(roomsData).map(([roomId, room]) => {
  const newRoomCard = document.createElement("div");
  newRoomCard.classList.add("room-card");
  const bedInfoContainer = document.createElement("ul");
  const newBedInfoContainer = document.createElement("li");
  newBedInfoContainer.innerHTML = `<i class="fa-solid fa-bed"> </i>${room.bedInfo}`;
  bedInfoContainer.appendChild(newBedInfoContainer);
  newRoomCard.insertAdjacentHTML(
    "afterbegin",
    `
                <img src="${room.image}"
                    alt="Room Image" class="room-img">
                <div class="main-room-content">
                    <div class="ratings"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                            class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                            class="fa-regular fa-star"></i>
                    </div>
                    <div class="room-type">${room.type}</div>
                    <div class="price-info">
                        ${room.price}$ <span class="night-info">/night</span>
                    </div>
                    <div class="room-labels">
                        ${room.capacity} Person <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="bed-info">
                        ${bedInfoContainer.outerHTML}
                    </div>

                    <div class="room-reserve-btn">
                        <button class="reserve-btn">Reserve Now</button>
                    </div>
                </div>
    `
  );
  //   <img src= ${room.image}
  //   alt="Room Image" class="room-img">
  // <div class="room-type">${room.type}</div>
  // <div class="room-info">
  //   <div class="people-info"><i class="fa-solid fa-person"></i> ${room.capacity} Person</div>
  //   <div class="separator"></div>
  //   <div class="bed-info">${room.bedInfo}</div>
  // </div>
  // <div class="price-info">
  //   <span>${room.price}$</span> <span class="night-info">/night</span>
  // </div>
  // <div class="room-reserve-btn">
  //   <button class="reserve-btn">Reserve Now</button>
  // </div>
  // console.log(roomBtn);
  return newRoomCard;
});
// Dynamically appends room card in DOM
newRooms.forEach((room) => roomCardContainer.appendChild(room));
let roomCards = document.querySelectorAll(".room-card");
let reserveButtons = document.querySelectorAll(".room-reserve-btn button");
reserveButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const roomNumber = Object.keys(roomsData)[index];
    const price = roomsData[roomNumber].price;
    redirectToBooking(roomNumber, price);
  });
});
// Search functionality
let userInput = document.querySelector("#search-room");
userInput.addEventListener("input", (e) => {
  clearTimeout(searchDelay);
  //Converting the NodeList from cardContainer to Array
  Array.from(roomCards).forEach((item) => {
    const roomType = item.querySelector(".room-type").textContent.toLowerCase();
    const searchValue = e.target.value.toLowerCase();
    searchDelay = setTimeout(() => {
      item.style.display = roomType.includes(searchValue) ? "block" : "none";
    }, 1100);
  });
});
// initializeDropdown(".dropdown-select-item");
function updateLocalStorage(rooms) {
  let currentLocalStorageData = JSON.parse(localStorage.getItem("rooms")) || rooms;
  localStorage.setItem("rooms", JSON.stringify(currentLocalStorageData));
}
function redirectToBooking(roomNumber, price) {
  const url = `components/booking.html?roomId=${roomNumber}`;
  window.location.href = url;
}
