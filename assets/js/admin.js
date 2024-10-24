let bookingsBtn = document.querySelector(".bookings-btn");
let manageRoomBtn = document.querySelector(".manage-btn");

bookingsBtn.addEventListener("click", showBookingsInfo);

function showBookingsInfo() {
   let newTable = document.createElement("tbody");
   let section = document.querySelector(".activity-table");
   newTable.className = "activity-table";
   newTable.innerHTML = `
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
   `;
   section.insertAdjacentElement("beforeend", newTable);
//    updateContent();
}
// let contentSection = document.querySelector(".content-section");
// function updateContent(content) {
//    contentSection.innerHTML = content;
// }
