export function getUserData() {
  return JSON.parse(localStorage.getItem("user-info"));
}
export function getRoomData() {
  return JSON.parse(localStorage.getItem("rooms"));
}
export function updateLocalStorageData(roomData) {
  localStorage.setItem("rooms", JSON.stringify(roomData));
}
