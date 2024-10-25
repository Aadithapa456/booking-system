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
  clearMain();
  let section = document.createElement("section");
  let main = document.querySelector(".main-content");
  section.innerHTML = ``;
  //   let newTable = document.createElement("table");
  section.className = "content-section";
  section.innerHTML = `
                <h2>Customer Info</h2> 
                    <table class="activity-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Room Booked</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Room booked</td>
                                <td>xyz@gmail.com</td>
                                <td>9862314312</td>
                                <td>Deluxe Room</td>
                                <td>Booked</td>
                            </tr>
                            <tr>
                                <td>Room booked</td>
                                <td>xyz@gmail.com</td>
                                <td>9862314312</td>
                                <td>Deluxe Room</td>
                                <td>Booked</td>
                            </tr>
                        </tbody>
                    </table>
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
                <h2>Room Info</h2> 
                  <table class="activity-table">
                      <thead>
                          <tr>
                              <th>Hey</th>
                              <th>Email</th>
                              <th>Contact</th>
                              <th>Room Booked</th>
                              <th>Status</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Room booked</td>
                              <td>xyz@gmail.com</td>
                              <td>9862314312</td>
                              <td>Deluxe Room</td>
                              <td>Booked</td>
                          </tr>
                          <tr>
                              <td>Room booked</td>
                              <td>xyz@gmail.com</td>
                              <td>9862314312</td>
                              <td>Deluxe Room</td>
                              <td>Booked</td>
                          </tr>
                      </tbody>
                  </table>
     `;
  setTimeout(() => {
    section.classList.add("fade-in");
  }, 100);
  // section.insertAdjacentElement("beforeend", newTable);
  main.appendChild(section);
});
