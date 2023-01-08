import { addToDom } from "../modules/addToDom.js";
const API_URL = "http://localhost:3000";
const $ = document;

//========= Dom variables =========
const userNameInfo = $.querySelector("#user-name-info");
const searcBox = $.querySelector("#search-bar");
const companyLogos = $.querySelector("#companies-logo");
const productsContainer = $.querySelector("#products");
const mostPopularButtons = $.querySelector("#header-buttons");

//========= functions =========
const readProduct = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};

//========= events =========
// show user email on top of home page
let userInfo = JSON.parse(localStorage.getItem("user"));
userNameInfo.innerText = userInfo.email;

// read product from API
readProduct();

// nav to product page
productsContainer.addEventListener("click", (e) => {
  const selectedProduct = e.target.closest(".product");
  const id = selectedProduct.id;
  const quantity = selectedProduct.children[2].innerText;
  if (Number(quantity) !== 0) {
    window.location.href = "productPage2.html?id=" + id;
  } else {
    window.location.href = "productPage1.html?id=" + id;
  }
});

// filter by company name
companyLogos.addEventListener("click", (e) => {
  const companyName = e.target.closest(".logo-name").children[1].innerText;
  window.location.href = `homeFilter.html?model=${companyName}`;
});

// filter by header buttons
mostPopularButtons.addEventListener("click", (e) => {
  const companyName = e.target.innerText;
  window.location.href = `homeMostPopularFilter.html?model=${companyName}`;
});

// search
searcBox.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    window.location.href = `searchPage.html?search=${e.target.value}`;
  }
});
