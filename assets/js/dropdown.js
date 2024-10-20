let dropDownContainer = document.querySelector(".dropdown-select-item");
let mainItem = document.querySelector(".select");
let options = document.querySelectorAll("#option li");
dropDownContainer.addEventListener("click", () => {
   dropDownContainer.classList.toggle("active");
   document.querySelector(".dropdown-options").classList.toggle("visible");
});
options.forEach((option) => {
   option.addEventListener("click", () => {
      mainItem.innerHTML = `${option.innerHTML}`;
   });
});
document.addEventListener("click", (e) => {
   if (!dropDownContainer.contains(e.target)) {
      dropDownContainer.classList.remove("active"); // Remove active class if clicking outside
      document.querySelector(".dropdown-options").classList.remove("visible"); // Hide dropdown
   }
});