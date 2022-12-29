const API_URL = "http://localhost:3000";
const $ = document;
const cardsContainer = $.querySelector("#cards");
const showTotalPrice = $.querySelector("#total-price");
const cancelButton = $.querySelector("#cancel-button");
const removeButton = $.querySelector("#remove-button");
const checkoutButton = $.querySelector("#checkout-button");

const modal = $.querySelector("#modal-container");

const addToCards = (list, listContainer) => {
  list.forEach((elem) => {
    const html = `
        <div class="card" id="${elem.id}">
              <div class="product-img">
                <img src="${elem.image}" alt="shoea" />
              </div>
              <div class="product-info">
                <div class="info-row-one">
                  <h4>${elem.name}</h4>
                  <div>
                    <span class="material-symbols-outlined delete"> delete </span>
                  </div>
                </div>
                <div class="info-row-two">
                  <div class="colors">
                    <span class="color-item" id="${elem.color}"></span>
                    <span>${elem.color}</span>
                  </div>
                  <span>|</span>
                  <p>Size = <span>${elem.size}</span></p>
                </div>
                <div class="info-row-three">
                  <h4>$<span class="total-price-itemes"> ${elem.totalPrice}</span></h4>
                  <div class="price-quantity">
                  <span style="display:none">${elem.price}</span>
                    <span>-</span>
                    <span>${elem.quantity}</span>
                    <span>+</span>
                  </div>
                </div>
              </div>
            </div>
        `;
    listContainer.insertAdjacentHTML("beforeend", html);
  });
};

const changeTotalPrice = () => {
  const totalPriceItems = $.querySelectorAll(".total-price-itemes");
  let userTotalPrice = 0;
  totalPriceItems.forEach((item) => {
    userTotalPrice += Number(item.innerText);
  });
  showTotalPrice.innerText = `$${userTotalPrice}`;
};

const getDate = (item) => {
  const productName = item.children[1].children[0].children[0].innerText;
  const productSrc = item.children[0].children[0].getAttribute("src");
  const productColor =
    item.children[1].children[1].children[0].children[1].innerText;
  const productSize =
    item.children[1].children[1].children[2].children[0].innerText;
  const productPrice =
    item.children[1].children[2].children[1].children[0].innerText;
  const productId = item.id;

  return {
    name: productName,
    image: productSrc,
    size: productSize,
    color: productColor,
    price: productPrice,
    id: productId,
  };
};
const updateproduct = async (list, id) => {
  try {
    const res = await fetch(`${API_URL}/carts/${id}`, {
      method: "PUT",
      body: JSON.stringify(list),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteFromServer = async (id) => {
  try {
    const res = await fetch(`${API_URL}/carts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteproduct = async (list, listContainer, id) => {
  addToCards([list], listContainer);
  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  removeButton.addEventListener("click", () => {
    deleteFromServer(id);
  });
};
const changeQuantity = () => {
  const cards = $.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // gather data
      let updatedList = getDate(card);
      const productPrice = updatedList.price;
      const productId = updatedList.id;
      const quantity = card.children[1].children[2].children[1].children[2];
      const totalPrice = card.children[1].children[2].children[0].children[0];

      // if did not change quantity
      updatedList.quantity = quantity.innerText;
      updatedList.totalPrice = totalPrice.innerText;

      if (e.target.innerText === "-") {
        quantity.innerText = Number(quantity.innerText) - 1;
        totalPrice.innerText = quantity.innerText * productPrice;
        updatedList.quantity = quantity.innerText;
        updatedList.totalPrice = totalPrice.innerText;
        updateproduct(updatedList, productId);
      }
      if (e.target.innerText === "+") {
        quantity.innerText = Number(quantity.innerText) + 1;
        totalPrice.innerText = quantity.innerText * productPrice;
        updatedList.quantity = quantity.innerText;
        updatedList.totalPrice = totalPrice.innerText;
        updateproduct(updatedList, productId);
      }
      changeTotalPrice();
      if (e.target.classList.contains("delete")) {
        const deletedProduct = $.querySelector("#remove-item-container");
        modal.style.display = "flex";
        deleteproduct(updatedList, deletedProduct, productId);
      }
    });
  });
};

// read data from server
const readCarts = async () => {
  try {
    const res = await fetch(`${API_URL}/carts`);
    const data = await res.json();
    addToCards(data, cardsContainer);
    changeTotalPrice();
    changeQuantity();
  } catch (error) {
    console.log(error);
  }
};
readCarts();
