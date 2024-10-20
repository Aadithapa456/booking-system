let rooms = [
   {
      type: "Standard Room",
      image: "https://www.hotelmalaysia.com.my/images/Standard%20Room/IMGL6303xxx.jpg",
      capacity: 1,
      bedInfo: "1 Queen Sized",
      price: 100,
   },
   {
      type: "Deluxe Room",
      image: "https://www.dreaminternationalhotel.com/images/subpackage/0NNhP-sd2.jpg",
      capacity: 2,
      bedInfo: "1 King Sized",
      price: 150,
   },
   {
      type: "Premium Room",
      image: "https://royalmhotels.com/uploads/rooms_types/gallery/1170x780/premium.jpg",
      capacity: 2,
      bedInfo: "2 Queen Sized",
      price: 200,
   },
   {
      type: "Suite",
      image: "https://img.freepik.com/free-photo/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table_105762-1783.jpg?t=st=1729413187~exp=1729416787~hmac=f0e43ca7a619320513dc3f0a6e7e9c487e499f63422ee3e9a36da083fb5437c8&w=1380",
      capacity: 3,
      bedInfo: "1 King Sized + 1 Sofa Bed",
      price: 300,
   },
   {
      type: "Executive Suite",
      image: "https://img.freepik.com/free-photo/modern-luxury-bedroom-suite-bathroom_105762-1791.jpg?t=st=1729413534~exp=1729417134~hmac=3e45ebb99affc76ad3e4b9185d0fcb28edd546d1c4afcb958f61b72639cb338b&w=1380",
      capacity: 4,
      bedInfo: "2 King Sized",
      price: 400,
   },
   {
      type: "Family Room",
      image: "https://www.landmarklondon.co.uk/wp-content/uploads/2019/05/Executive-Family-1800x1200-1.jpg",
      capacity: 4,
      bedInfo: "1 King Sized + 2 Single Beds",
      price: 350,
   },
];

let roomCardContainer = document.querySelector(".room-card-area");
let newRooms = rooms.map((room) => {
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
                <div class="room-reserve-btn">
                    <button class="reserve-btn">Reserve Now</button>
                </div>
    `
   );
   roomCardContainer.appendChild(newRoomCard);
   return newRoomCard;
});
let roomCards = document.querySelectorAll(".room-card");
let userInput = document.querySelector("#search-room");
userInput.addEventListener("input", (e) => {
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
