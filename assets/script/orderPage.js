const API_URL = "http://localhost:3000";
const $ = document;

//========= Dom variables =========
const activeListContainer = $.querySelector("#active-list");
const completeListContainer = $.querySelector("#complete-list");
const activeButton = $.querySelector("#active-button");
const completeButton = $.querySelector("#complete-button");

//========= functions =========
// empty page
const emptyPage = (container, str) => {
  const html = `
    <div id="not-found">
        <img src="../assets/images/productNotFounf.png" alt="shoea" />
        <div id="alert-text">
          <h4>You dont hav an order yet</h4>
          <p>
            you dont have an ${str} orders at this time.
          </p>
        </div>
      </div>
    `;
  container.insertAdjacentHTML("beforeend", html);
};

const addToCards = (list) => {
  let activeProductCount = 0;
  let completeProductCount = 0;
  list.forEach((elem) => {
    const delivery = elem.delivery;
    if (!delivery) {
      activeProductCount += 1;
    } else {
      completeProductCount += 1;
    }
    const html = `
          <div class="card">
                <div class="product-img">
                  <img src="${elem.image}" alt="shoea" />
                </div>
                <div class="product-info">
                  <div class="info-row-one">
                    <h4>${elem.name}</h4>
                  </div>
                  <div class="info-row-two">
                    <div class="colors">
                      <span class="color-item" id="${elem.color}"></span>
                      <span>${elem.color}</span>
                    </div>
                    <span>|</span>
                    <p>Size = <span>${elem.size}</span></p>
                    <span>|</span>
                    <p>Qyt = <span>${elem.quantity}</span></p>
                  </div>
                  <button class="alert-delivery">${
                    !delivery ? "In Delivery" : "Completed"
                  }</button>
                  <div class="info-row-three">
                    <h4>$<span class="total-price-itemes"> ${
                      elem.totalPrice
                    }</span></h4>
                    <p class="track-order">${
                      !delivery ? "Track Order" : "Leave Review"
                    }</p>
                  </div>
                </div>
              </div>
          `;
    if (!delivery) {
      activeListContainer.insertAdjacentHTML("beforeend", html);
    } else {
      completeListContainer.insertAdjacentHTML("beforeend", html);
    }
  });

  if (activeProductCount === 0) {
    emptyPage(activeListContainer, "active");
  }
  if (completeProductCount === 0) {
    emptyPage(completeListContainer, "complete");
  }
};

// read data from server
const readCarts = async () => {
  try {
    const res = await fetch(`${API_URL}/carts`);
    const data = await res.json();
    addToCards(data);
  } catch (error) {
    console.log(error);
  }
};

//========= events =========
readCarts();

// toggle between lists
activeButton.addEventListener("click", () => {
  activeButton.classList.add("activ-header-button");
  completeButton.classList.remove("activ-header-button");
  activeListContainer.style.display = "grid";
  completeListContainer.style.display = "none";
});
completeButton.addEventListener("click", () => {
  activeButton.classList.remove("activ-header-button");
  completeButton.classList.add("activ-header-button");

  activeListContainer.style.display = "none";
  completeListContainer.style.display = "grid";
});
