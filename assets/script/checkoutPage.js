const API_URL = "http://localhost:3000";
const $ = document;
const backToCartPage = $.querySelector("#back-to-checkout-page");
const listContainer = $.querySelector("#list-container");
const userTotalPrice = $.querySelector("#user-total-price");
const goToAddressPage = $.querySelector("#go-to-address-page");

// functions
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
