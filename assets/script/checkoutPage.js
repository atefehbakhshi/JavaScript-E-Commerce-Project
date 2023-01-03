const API_URL = "http://localhost:3000";
const $ = document;

//========= Dom variables =========
const backToCartPage = $.querySelector("#back-to-checkout-page");
const listContainer = $.querySelector("#list-container");
const userTotalPrice = $.querySelector("#user-total-price");
const goToAddressPage = $.querySelector("#go-to-address-page");
// shipping page
const shippingTypePreviousSelect = $.querySelector("#shipping-type");
const shippingTypeAfterSelect = $.querySelector(
  "#after-selected-shipping-type"
);
const shippingTitle = $.querySelector("#shipping-title");
const shippingDescription = $.querySelector("#shipping-desc");
const shippingCost = $.querySelector("#shipping-cost");
const goToShippingPage = $.querySelector("#go-to-shipping-page");
const userSelectedShipping = $.querySelector("#user-selected-shipping");
// promo code
const addPromoCode = $.querySelector("#add-promo-code");
const userCode = $.querySelector("#user-code");
const promoPriceRow = $.querySelector("#promo-price-row");
const userSelectedPromoCode = $.querySelector("#user-selected-promo-code");
// total price
const lastPrice = $.querySelector("#last-price");
// payment
const paymentButton = $.querySelector("#payment-button");

//========= functions =========
const addToProducts = (list) => {
  list.forEach((elem) => {
    const html = `
  <div class="card">
  <div class="product-img">
    <img src="${elem.image}" alt="shoea" />
  </div>
  <div class="product-info">
    <div class="info-row-one">
      <h4>${elem.name}</h4>
    </div>
    <div class="info-row-two">
      <div class="colors">
        <span class="color-item" id="${elem.color}"></span>
        <span>${elem.color}</span>
      </div>
      <span>|</span>
      <p>Size = ${elem.size}</p>
    </div>
    <div class="info-row-three">
      <h5>$ <span class="total-price-itemes"> ${elem.totalPrice} </span></h5>
      <div class="quantity">
        <span>${elem.quantity}</span>
      </div>
    </div>
  </div>
</div>
    `;
    listContainer.insertAdjacentHTML("beforeend", html);
  });
};
// total price
const changeTotalPrice = () => {
  const totalPriceItems = $.querySelectorAll(".total-price-itemes");
  let userTotalPricecalculate = 0;
  totalPriceItems.forEach((item) => {
    userTotalPricecalculate += Number(item.innerText);
  });
  userTotalPrice.innerText = `$${userTotalPricecalculate}`;
  // =================calculate whole cost =================
  localStorage.setItem("productsPrice", userTotalPricecalculate);
  // ================= end calculate whole cost =================
};

// back to cart page
backToCartPage.addEventListener("click", () => {
  window.location.href = "cartPage.html";
});

// read data from server
const readProduct = async () => {
  try {
    const res = await fetch(`${API_URL}/carts`);
    const data = await res.json();
    addToProducts(data);
    changeTotalPrice();
  } catch (error) {
    console.log(error);
  }
};
readProduct();
// read address from server
const addressTitle = $.querySelector("#address-title");
const addressDesc = $.querySelector("#address-desc");

const readAddress = async () => {
  try {
    const res = await fetch(`${API_URL}/address?select_like=true`);
    const data = await res.json();
    addressTitle.innerText = data[0].title;
    addressDesc.innerText = data[0].address;
  } catch (error) {
    console.log(error);
  }
};
readAddress();

// go to address page
goToAddressPage.addEventListener("click", () => {
  window.location.href = "addressPage.html";
});

// shipping type
const navToShippingPage = $.querySelector("#select-shipping-type");
navToShippingPage.addEventListener("click", () => {
  window.location.href = "shippingPage.html";
});
goToShippingPage.addEventListener("click", () => {
  window.location.href = "shippingPage.html";
});
const getShippingType = () => {
  let selectedShipping = JSON.parse(localStorage.getItem("shippingType"));
  if (selectedShipping !== null) {
    shippingTypePreviousSelect.style.display = "none";
    shippingTitle.innerText = selectedShipping.title;
    shippingDescription.innerText = selectedShipping.desc;
    shippingCost.innerText = selectedShipping.cost;
    userSelectedShipping.innerText = selectedShipping.cost;
    // =================calculate whole cost =================
    // lastprice = productsprice +shippingprice
    const productsPrice = Number(localStorage.getItem("productsPrice"));
    const priceSum =
      productsPrice + Number(selectedShipping.cost.match(/\d+/)[0]);
    lastPrice.innerText = `$${priceSum}`;
    // ================= end calculate whole cost =================
    shippingTypeAfterSelect.style.display = "block";
    localStorage.removeItem("shippingType");
  }
};
getShippingType();

// promo code
const calculateDiscount = (value) => {
  userCode.value = `Discount ${value}% Off`;
  userCode.classList.add("input-bold-style");

  // =================calculate whole cost =================
  const totalCostBeforDiscount = lastPrice.innerText.match(/\d+/)[0];
  const discountCost = Math.round((totalCostBeforDiscount * value) / 100);
  const totalCostAfterDiscount = totalCostBeforDiscount - discountCost;
  lastPrice.innerText = `$${totalCostAfterDiscount}`;
  // ================= end calculate whole cost =================
  userSelectedPromoCode.innerText = `-$${discountCost}`;
  promoPriceRow.style.display = "flex";
};
const searchForEnterPromoCode = async (code) => {
  try {
    const res = await fetch(`${API_URL}/promoCode?codeNumber_like=${code}`);
    const data = await res.json();
    if (data.length === 1) {
      calculateDiscount(data[0].value);
    }
  } catch (error) {
    console.log(error);
  }
};
addPromoCode.addEventListener("click", () => {
  searchForEnterPromoCode(userCode.value);
});
// payment
paymentButton.addEventListener("click", () => {
  if (lastPrice.innerText !== "-") {
    localStorage.setItem("lastPrice", lastPrice.innerText);
    window.location.href = "paymentPage.html";
  }
});
