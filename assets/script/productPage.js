import { slideOne, slideTwo, slideThree } from "../modules/slides.js";

const API_URL = "http://localhost:3000";

const $ = document;
// Dom variables
const homePageBtn = $.querySelectorAll(".back-to-home-page");

const image1 = $.querySelector("#image-one");
const image2 = $.querySelector("#image-two");
const image3 = $.querySelector("#image-three");

const slideItemOne = $.querySelectorAll(".slide-item-one");
const slideItemTwo = $.querySelectorAll(".slide-item-two");
const slideItemThree = $.querySelectorAll(".slide-item-three");

const productName = $.querySelector("#product-name");
const productDesc = $.querySelector("#product-desc");

const productSize = $.querySelector("#sizes");
const productColor = $.querySelector("#colors");
const productQuantity = $.querySelector("#quantity");
const productNumber = $.querySelector("#product-number");
let totalPrice = $.querySelector("#total-price");
let addToCartButton = $.querySelector("#add-to-cart");

// variables for adding product to cart
let userSelectedProperties = {
  name: "",
  image: "",
  size: "",
  color: "",
  quantity: 1,
  price: "",
  totalPrice: "",
};
// functions
const fillUserSelectedProperties = (data) => {
  userSelectedProperties.name = data.name;
  userSelectedProperties.image = data.image;
  userSelectedProperties.price = data.price;
  userSelectedProperties.totalPrice = data.price;
};

const addToCard = async (data) => {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
// event
homePageBtn.forEach((item) => {
  item.addEventListener("click", () => {
    window.location.href = "homePage.html";
  });
});

slideItemOne.forEach((item) => {
  item.addEventListener("click", () => slideOne(image1, image2, image3));
});
slideItemTwo.forEach((item) => {
  item.addEventListener("click", () => slideTwo(image1, image2, image3));
});
slideItemThree.forEach((item) => {
  item.addEventListener("click", () => slideThree(image1, image2, image3));
});

//getting product from server
// get product id
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const productId = searchParams.get("id");
// request to server
const addToDom = (product) => {
  productName.innerText = product.name;
  productDesc.innerText = product.description;

  const imageOne = image1.children;
  imageOne[1].src = product.image;
  const imageTwo = image2.children;
  imageTwo[1].src = product.image;
  const imageThree = image3.children;
  imageThree[1].src = product.image;
};

const readProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    fillUserSelectedProperties(data);
    totalPrice.innerText = data.price;
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};
readProduct(productId);

// user selected properties
productSize.addEventListener("click", (e) => {
  userSelectedProperties.size = e.target.innerText;
  console.log(userSelectedProperties);
});
productColor.addEventListener("click", (e) => {
  userSelectedProperties.color = e.target.id;
});
productQuantity.addEventListener("click", (e) => {
  if (e.target.innerText === "-") {
    productNumber.innerText = Number(productNumber.innerText) - 1;
    userSelectedProperties.quantity = productNumber.innerText;
  }
  if (e.target.innerText === "+") {
    productNumber.innerText = Number(productNumber.innerText) + 1;
    userSelectedProperties.quantity = productNumber.innerText;
  }
  totalPrice.innerText = `${
    userSelectedProperties.quantity * userSelectedProperties.price
  }.00`;
  userSelectedProperties.totalPrice = totalPrice.innerText;
});

// add to cart
addToCartButton.addEventListener("click", () => {
  if (
    userSelectedProperties.size &&
    userSelectedProperties.color &&
    userSelectedProperties.quantity
  ) {
    userSelectedProperties.id = Date.now();
    addToCard(userSelectedProperties);
    window.location.href = "cartPage.html";
  }
});
