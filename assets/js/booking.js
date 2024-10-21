import { initializeDropdown } from "./dropdown.js";
import { rooms } from "./room-types.js";

let roomDropdownContainer = document.querySelector(".dropdown-options ul");
rooms.map((room) => {
   let li = document.createElement("li");
   li.innerHTML = `${room.type}`;
   roomDropdownContainer.appendChild(li);
});
initializeDropdown(".dropdown-select-item");
let selectedOption = document.querySelector(".selected");
console.log(selectedOption);
let myRoom = localStorage.getItem("room");
selectedOption.innerHTML = myRoom;
