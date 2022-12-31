const API_URL = "http://localhost:3000";
const $ = document;

//========= Dom variables =========
const backToHome = $.querySelector("#back-to-home-page");
const mostPopularButtons = $.querySelector("#header-buttons");
const productsContainer = document.querySelector("#products");
const cancelButton = document.querySelector("#cancel");
const applyButton = document.querySelector("#apply");
const modalContainer = document.querySelector(".modal-container");

//========= get company name =========
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const productModel = searchParams.get("model");

//========= functions =========
// add to dom
const addToDom = (list) => {
  productsContainer.innerHTML = "";
  list.forEach((elem) => {
    const html = `
        <div class="product" id="${elem.id}">
            <div class="product-image">
                <img src="${elem.image}" alt="shoea" />
                <span class="material-icons favorite"> favorite </span>
            </div>
            <div class="product-info">
                <p class="product-name">${elem.name}...</p>
                <div class="sold-info">
                  <span class="material-symbols-outlined">star_half</span>
                  <span>4.6</span>
                  <span>|</span>
                  <span class="sold-number">6.601 sold</span>
                </div>
                <p class="product-price">$ ${elem.price}</p>
            </div>
        </div>
            `;
    productsContainer.insertAdjacentHTML("beforeend", html);
  });
};

// all popular products
const readProduct = async () => {
  try {
    const res = await fetch(`${API_URL}/favorites?popular=true`);
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
      `${API_URL}/favorites?model-name=${model}&popular=true`
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

// back to home page
backToHome.addEventListener("click", () => {
  window.location.href = "homePage.html";
});

// change selected button color when page loaded for the first time
changeStyle("All");

// read data from server when page loaded for the first time
readFromServer("All");

// read data from server by clicking on buttons
mostPopularButtons.addEventListener("click", (e) => {
  const companyName = e.target.innerText;
  changeStyle(companyName);
  readFromServer(companyName);
});

// remove from favorite list
const removeFromList = async (id) => {
  try {
    const res = await fetch(`${API_URL}/favorites/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    modalContainer.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

productsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("favorite")) {
    const selected = e.target;
    const productId = selected.closest(".product").id;
    modalContainer.style.display = "flex";
    modalContainer.id = productId;
  }
});

cancelButton.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

applyButton.addEventListener("click", () => {
  const id = applyButton.closest(".modal-container").id;
  removeFromList(id);
});
