const $ = document;

const page1 = $.querySelector("#page-one");
const page2 = $.querySelector("#page-two");
const page3 = $.querySelector("#page-three");

const slideItemOne = $.querySelectorAll(".slide-item-one");
const slideItemTwo = $.querySelectorAll(".slide-item-two");
const slideItemThree = $.querySelectorAll(".slide-item-three");

const btn1 = $.querySelector("#btn-page-one");
const btn2 = $.querySelector("#btn-page-two");
const btn3 = $.querySelector("#btn-page-three");

const slideOne = () => {
  page1.style.transform = "translateX(0)";
  page2.style.transform = "translateX(100%)";
  page3.style.transform = "translateX(200%)";
};
const slideTwo = () => {
  page1.style.transform = "translateX(-100%)";
  page2.style.transform = "translateX(0)";
  page3.style.transform = "translateX(100%)";
};
const slideThree = () => {
  page1.style.transform = "translateX(-200%)";
  page2.style.transform = "translateX(-100%)";
  page3.style.transform = "translateX(0)";
};

slideItemOne.forEach((item) => {
  item.addEventListener("click", slideOne);
});
slideItemTwo.forEach((item) => {
  item.addEventListener("click", slideTwo);
});
slideItemThree.forEach((item) => {
  item.addEventListener("click", slideThree);
});

btn1.addEventListener("click", slideTwo);
btn2.addEventListener("click", slideThree);
btn3.addEventListener("click", () => {
  window.location.href = "loginPage.html";
});
