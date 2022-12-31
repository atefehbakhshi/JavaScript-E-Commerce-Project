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
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};
readProduct(productId);
