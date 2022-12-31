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

const addToFavoriteButton = $.querySelector("#favorite");
const removeFromFavoriteButton = $.querySelector("#removeFavorite");

// variables for adding product to cart
let userSelectedProperties = {
  name: "",
  image: "",
  size: "",
  color: "",
  quantity: 1,
  price: "",
  totalPrice: "",
  delivery: false,
  id: "",
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
// checking product is in favorite list or not
const isFavorite = async (id) => {
  try {
    const res = await fetch(`${API_URL}/favorites?id=${id}`);
    const data = await res.json();
    if (data.length !== 0) {
      removeFromFavoriteButton.classList.remove("hide");
    } else {
      addToFavoriteButton.classList.remove("hide");
    }
  } catch (error) {
    console.log(error);
  }
};
const readProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    fillUserSelectedProperties(data);
    totalPrice.innerText = data.price;
    addToDom(data);
    // check is favorite or not
    isFavorite(id);
  } catch (error) {
    console.log(error);
  }
};
readProduct(productId);

// user selected properties
productSize.addEventListener("click", (e) => {
  [...productSize.children].forEach((size) =>
    size.classList.remove("selected-size")
  );
  userSelectedProperties.size = e.target.innerText;
  e.target.classList.add("selected-size");
});

productColor.addEventListener("click", (e) => {
  [...productColor.children].forEach((color) =>
    color.classList.remove("selected-color")
  );
  userSelectedProperties.color = e.target.id;
  e.target.classList.add("selected-color");
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

const addToFavoriteList = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    // add to list
    try {
      const res = await fetch(`${API_URL}/favorites`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const removeFromFavoriteList = async (id) => {
  try {
    const res = await fetch(`${API_URL}/favorites/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};

// add to favorites list
addToFavoriteButton.addEventListener("click", () =>
  addToFavoriteList(productId)
);
// remove from favorites list
removeFromFavoriteButton.addEventListener("click", () =>
  removeFromFavoriteList(productId)
);
