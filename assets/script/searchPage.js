import { addToDom } from "../modules/addToDom.js";
const API_URL = "http://localhost:3000";
const $ = document;

//========= Dom variables =========
const searcBox = $.querySelector("#search-bar");
const inputText = $.querySelector("#search");
const searchText = $.querySelector("#search-text");
const resultNumbers = $.querySelector("#result-numbers");
const notFoundPage = $.querySelector("#not-found");

//========= get company name =========
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const searchWord = searchParams.get("search");

//========= functions =========
const checkResultNumbers = (length) => {
  resultNumbers.innerText = length;
  if (length == 0) {
    notFoundPage.style.display = "flex";
  } else {
    notFoundPage.style.display = "none";
  }
};

const searchProduct = async (searchText) => {
  try {
    const res = await fetch(`${API_URL}/products?name_like=${searchText}`);
    const data = await res.json();
    checkResultNumbers(data.length);
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};

// ========= events =========
inputText.value = searchWord;
searchText.innerText = searchWord;
searchProduct(searchWord);

searcBox.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    const newSarch = e.target.value;
    searchText.innerText = newSarch;
    searchProduct(newSarch);
  }
});
