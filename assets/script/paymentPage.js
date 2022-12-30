const $ = document;
const checkedInput = $.querySelectorAll(".checked-input");
const lastPrice = localStorage.getItem("lastPrice");
const labels = $.querySelectorAll(".label");
const backToCheckoutPage = $.querySelector("#back-to-checkout-page");
const confirmPayment = $.querySelector("#apply");
// modal
const modalContainer = $.querySelector("#modal-container");
const orderButton = $.querySelector("#view-order-button");
const reciptButton = $.querySelector("#view-recipt-button");

checkedInput.forEach((item) => {
  item.addEventListener("click", (e) => {
    labels.forEach((elem) => (elem.innerText = ""));
    const label = e.target.previousElementSibling;
    label.innerText = lastPrice;
  });
});

backToCheckoutPage.addEventListener("click", () => {
  window.location.href = "checkoutPage.html";
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
