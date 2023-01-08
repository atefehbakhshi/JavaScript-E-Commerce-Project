const $ = document;

//========= Dom variables =========
const checkedInput = $.querySelectorAll(".checked-input");
const lastPrice = localStorage.getItem("lastPrice");
const labels = $.querySelectorAll(".label");
const confirmPayment = $.querySelector("#apply");
// modal
const modalContainer = $.querySelector("#modal-container");
const orderButton = $.querySelector("#view-order-button");
const reciptButton = $.querySelector("#view-recipt-button");

//========= events =========
checkedInput.forEach((item) => {
  item.addEventListener("click", (e) => {
    labels.forEach((elem) => (elem.innerText = ""));
    const label = e.target.previousElementSibling;
    label.innerText = lastPrice;
  });
});

confirmPayment.addEventListener("click", () => {
  modalContainer.style.display = "flex";
});

orderButton.addEventListener("click", () => {
  window.location.href = "orderPage.html";
});

reciptButton.addEventListener("click", () => {
  window.location.href = "homePage.html";
});
