const $ = document;

//========= Dom variables =========
const shippingApplyButton = $.querySelector("#apply");
const shippingContainer = $.querySelectorAll(".shipping-container");

//========= functions =========
const saveShipping = (data) => {
  localStorage.setItem("shippingType", JSON.stringify(data));
};

//========= events =========
shippingApplyButton.addEventListener("click", () => {
  shippingContainer.forEach((elem) => {
    if (elem.children[1].children[1].checked) {
      const selectedShipping = {
        title: elem.children[0].children[1].children[0].innerText,
        desc: elem.children[0].children[1].children[1].innerText,
        cost: elem.children[1].children[0].innerText,
      };
      saveShipping(selectedShipping);
      window.location.href = "checkoutPage.html";
    }
  });
});
