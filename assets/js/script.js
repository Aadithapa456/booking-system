import { rooms } from "./room-types.js";
import { initializeDropdown } from "./dropdown.js";

let roomCardContainer = document.querySelector(".room-card-area");
let timeout;
rooms[0].type = "Standard Room";
updateLocalStorage(rooms);
let roomsData = JSON.parse(localStorage.getItem("rooms"));
let newRooms = roomsData.map((room) => {
   const newRoomCard = document.createElement("div");
   newRoomCard.classList.add("room-card");
   newRoomCard.insertAdjacentHTML(
      "afterbegin",
      `
                <img src= ${room.image}
                    alt="Room Image" class="room-img">
                <div class="room-type">${room.type}</div>
                <div class="room-info">
                    <div class="people-info"><i class="fa-solid fa-person"></i> ${room.capacity} Person</div>
                    <div class="separator"></div>
                    <div class="bed-info">${room.bedInfo}</div>
                </div>
               <div class="price-info">
                    <span>${room.price}$</span> <span class="night-info">/night</span>
                </div>
                <div class="room-reserve-btn">
                    <button class="reserve-btn">Reserve Now</button>
                </div>
    `
   );
   roomCardContainer.appendChild(newRoomCard);
   return newRoomCard;
});
let roomCards = document.querySelectorAll(".room-card");
let reserveButtons = document.querySelectorAll(".room-reserve-btn button");
reserveButtons.forEach((button, index) => {
   button.addEventListener("click", () => {
      rooms[index].selected = true;
      updateLocalStorage(rooms);
      window.location.href = "components/booking.html";
   });
});
let userInput = document.querySelector("#search-room");
userInput.addEventListener("input", (e) => {
   clearTimeout(timeout);
   //Converting the NodeList from cardContainer to Array
   Array.from(roomCards).forEach((item) => {
      const roomType = item
         .querySelector(".room-type")
         .textContent.toLowerCase();
      const searchValue = e.target.value.toLowerCase();
      console.log(searchValue);
      timeout = setTimeout(() => {
         item.style.display = roomType.includes(searchValue) ? "block" : "none";
      }, 1100);
   });
});
initializeDropdown(".dropdown-select-item");
function updateLocalStorage(rooms) {
   localStorage.setItem("rooms", JSON.stringify(rooms));
}
