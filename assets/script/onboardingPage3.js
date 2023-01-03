import { slideOne, slideTwo, slideThree } from "../modules/slides.js";
const $ = document;

//========= Dom variables =========
const page1 = $.querySelector("#page-one");
const page2 = $.querySelector("#page-two");
const page3 = $.querySelector("#page-three");

const slideItemOne = $.querySelectorAll(".slide-item-one");
const slideItemTwo = $.querySelectorAll(".slide-item-two");
const slideItemThree = $.querySelectorAll(".slide-item-three");

const btn1 = $.querySelector("#btn-page-one");
const btn2 = $.querySelector("#btn-page-two");
const btn3 = $.querySelector("#btn-page-three");

//========= events =========
slideItemOne.forEach((item) => {
  item.addEventListener("click", () => slideOne(page1, page2, page3));
});
slideItemTwo.forEach((item) => {
  item.addEventListener("click", () => slideTwo(page1, page2, page3));
});
slideItemThree.forEach((item) => {
  item.addEventListener("click", () => slideThree(page1, page2, page3));
});

btn1.addEventListener("click", () => slideTwo(page1, page2, page3));
btn2.addEventListener("click", () => slideThree(page1, page2, page3));
btn3.addEventListener("click", () => {
  window.location.href = "loginPage.html";
});
