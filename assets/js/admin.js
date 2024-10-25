let bookingsBtn = document.querySelector(".bookings-btn");
let manageRoomBtn = document.querySelector(".manage-btn");

bookingsBtn.addEventListener("click", showBookingsInfo);
function clearMain() {
  let main = document.querySelector(".main-content");
  let existingSection = main.querySelector(".content-section");
  if (existingSection) {
    main.removeChild(existingSection);
  }
  main.innerHTML = ``;
}
function showBookingsInfo() {
  // clearMain();
  let section = document.createElement("tbody");
  let main = document.querySelector(".activity-table");
  console.log(main);
  let updateTable = getUserData();
  // main.innerHTML = ``;
  //   let newTable = document.createElement("table");
  // section.className = "content-section";
  section.innerHTML = `
                        <tbody>
                            <tr>
                                <td>${updateTable.name}</td>
                                <td>${updateTable.email}</td>
                                <td>${updateTable.contact}</td>
                                <td>${updateTable.room.type}</td>
                                <td>${updateTable.room.status}</td>
                            </tr>
                            <tr>
                                <td>Room booked</td>
                                <td>xyz@gmail.com</td>
                                <td>9862314312</td>
                                <td>Deluxe Room</td>
                                <td>Booked</td>
                            </tr>
                        </tbody>
       `;
  setTimeout(() => {
    section.classList.add("fade-in");
  }, 100);
  main.appendChild(section);
}

manageRoomBtn.addEventListener("click", () => {
  clearMain();

  let section = document.createElement("section");
  let main = document.querySelector(".main-content");
  section.innerHTML = ``;
  //   let newTable = document.createElement("table");
  section.className = "content-section";
  section.innerHTML = `
                    <div class="table-top-section">
                        <h2>Room Info</h2>
                        <button class="add-room-btn">Add room <i class="fa-solid fa-plus"></i></button>
                    </div>

                    <table class="activity-table">
                        <thead>
                            <tr>
                                <th>Room Id</th>
                                <th>Room type</th>
                                <th>Rate</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>124</td>
                                <td>Suite</td>
                                <td>300</td>
                                <td><span class="status booked">Booked</span></td>
                            </tr>
                            <tr>
                                <td>120</td>
                                <td>Deluxe Room</td>
                                <td>100</td>
                                <td><span class="status vacant">Vacant</span></td>
                            </tr>
                        </tbody>
                    </table>
     `;
  setTimeout(() => {
    section.classList.add("fade-in");
  }, 100);
  // section.insertAdjacentElement("beforeend", newTable);
  main.appendChild(section);
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
