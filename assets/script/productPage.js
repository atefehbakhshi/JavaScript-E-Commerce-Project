import { slideOne,slideTwo,slideThree } from "../modules/slides.js";

const $ = document;

const homePageBtn = $.querySelectorAll(".back-to-home-page");

const image1 = $.querySelector("#image-one");
const image2 = $.querySelector("#image-two");
const image3 = $.querySelector("#image-three");

const slideItemOne = $.querySelectorAll(".slide-item-one");
const slideItemTwo = $.querySelectorAll(".slide-item-two");
const slideItemThree = $.querySelectorAll(".slide-item-three");

homePageBtn.forEach((item) => {
  item.addEventListener("click", () => {
    window.location.href = "homePage.html";
  });
});

slideItemOne.forEach((item) => {
  item.addEventListener("click", ()=> slideOne(image1,image2,image3));
});
slideItemTwo.forEach((item) => {
  item.addEventListener("click",  ()=> slideTwo(image1,image2,image3));
});
slideItemThree.forEach((item) => {
  item.addEventListener("click", ()=> slideThree(image1,image2,image3));
});
