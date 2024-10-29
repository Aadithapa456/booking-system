export const rooms = {
  101: {
    type: "Standard Room",
    image: "assets/images/standard.jpg",
    capacity: 1,
    bedInfo: "1 Queen Sized",
    price: 100,
    status: "Vacant",
  },
  102: {
    type: "Deluxe Room",
    image: "assets/images/deluxe.jpg",
    capacity: 2,
    bedInfo: "1 King Sized",
    status: "Vacant",
    price: 150,
  },
  103: {
    type: "Premium Room",
    image: "assets/images/premium.jpg",
    capacity: 2,
    bedInfo: "2 Queen Sized",
    price: 200,
    status: "Vacant",
  },
  104: {
    type: "Suite",
    image: "assets/images/suite.jpg",
    capacity: 3,
    bedInfo: "1 King Sized + 1 Sofa Bed",
    price: 300,
    status: "Vacant",
  },
  105: {
    type: "Executive Suite",
    image: "assets/images/executive-suite.jpg",
    capacity: 4,
    bedInfo: "2 King Sized",
    price: 400,
    status: "Vacant",
  },
  106: {
    type: "Family Room",
    image: "assets/images/family.jpg",
    capacity: 4,
    bedInfo: "1 King Sized + 2 Single Beds",
    price: 350,
    status: "Vacant",
  },
};
export function getUserData() {
  return JSON.parse(localStorage.getItem("user-info"));
}
export function getRoomData() {
  return JSON.parse(localStorage.getItem("rooms"));
}
export function updateLocalStorageData(roomData) {
  localStorage.setItem("rooms", JSON.stringify(roomData));
}
