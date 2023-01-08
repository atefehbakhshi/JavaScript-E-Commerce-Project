import { addToDom } from "../modules/addToDom.js";
const API_URL = "http://localhost:3000";

//========= Dom variables =========
const mostPopularButtons = document.querySelector("#header-buttons");

//========= get company name =========
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const productModel = searchParams.get("model");

//========= functions =========
// all popular products
const readProduct = async () => {
  try {
    const res = await fetch(`${API_URL}/products?popular=true`);
    const data = await res.json();
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};

// popular products by model
const filterProduct = async (model) => {
  try {
    const res = await fetch(
      `${API_URL}/products?model-name=${model}&popular=true`
    );
    const data = await res.json();
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};

// request to server
const readFromServer = (modelName) => {
  if (modelName === "All") {
    readProduct();
  } else {
    filterProduct(modelName);
  }
};

// change selected button color
const changeStyle = (selectedButtonText) => {
  const allButtons = [...mostPopularButtons.children];
  allButtons.forEach((elem) => elem.classList.remove("selected-button"));
  const selectedButton = allButtons.filter(
    (elem) => elem.innerText === selectedButtonText
  );
  selectedButton[0].classList.add("selected-button");
};

//========= events =========
// change selected button color when page loaded for the first time
changeStyle(productModel);

// read data from server when page loaded for the first time
readFromServer(productModel);

// read data from server by clicking on buttons
mostPopularButtons.addEventListener("click", (e) => {
  const companyName = e.target.innerText;
  changeStyle(companyName);
  readFromServer(companyName);
});
