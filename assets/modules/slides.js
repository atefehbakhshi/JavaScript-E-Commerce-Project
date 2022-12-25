const slideOne = (item1, item2, item3) => {
  item1.style.transform = "translateX(0)";
  item2.style.transform = "translateX(100%)";
  item3.style.transform = "translateX(200%)";
};
const slideTwo = (item1, item2, item3) => {
  item1.style.transform = "translateX(-100%)";
  item2.style.transform = "translateX(0)";
  item3.style.transform = "translateX(100%)";
};
const slideThree = (item1, item2, item3) => {
  item1.style.transform = "translateX(-200%)";
  item2.style.transform = "translateX(-100%)";
  item3.style.transform = "translateX(0)";
};

export { slideOne, slideTwo, slideThree };
