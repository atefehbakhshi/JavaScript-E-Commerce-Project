import { addToDom } from "../modules/addToDom.js";

const API_URL = "http://localhost:3000";
const $ = document;
// Dom variables
const backToHome = $.querySelector("#back-to-home-page");
const model = $.querySelector("#model");

// get company name
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const productModel = searchParams.get("model");

// request to server
const filterProduct = async (model) => {
  try {
    const res = await fetch(`${API_URL}/products?model-name=${model}`);
    const data = await res.json();
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};
// events
model.innerText = productModel;

backToHome.addEventListener("click", () => {
  window.location.href = "homePage.html";
});

filterProduct(productModel);