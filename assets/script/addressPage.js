const API_URL = "http://localhost:3000";
const $ = document;
const backToCheckoutPage = $.querySelector("#back-to-checkout-page");

const addressList = $.querySelector("#address-list");

const addAddressButton = $.querySelector("#add-new-address");
const formContainer = $.querySelector("#form-container");
const addressForm = $.querySelector("#address-form");

const applyButton = $.querySelector("#apply");

// ============functions ============
const gatherFormDate = (e) => {
  const { title, address } = e.target;
  return {
    title: title.value,
    address: address.value,
    id: Date.now(),
    select: false,
  };
};
const addToDom = (list) => {
  list.forEach((elem) => {
    const checked = elem.select;
    const html = `
    <div class="address-container" id="${elem.id}">
          <div class="address-info">
            <div id="outer-border">
              <span class="material-icons location"> location_on </span>
            </div>
            <div>
              <h5 class="address-name">${elem.title}</h5>
              <p class="address-desc">${elem.address}</p>
            </div>
          </div>
          <div>
            <input class="checked-input" type="radio" name="address"  ${
              checked === true ? "checked" : ""
            } />
          </div>
        </div>
    `;
    addressList.insertAdjacentHTML("beforeend", html);
  });
};
// read address from server
const readAddress = async () => {
  try {
    const res = await fetch(`${API_URL}/address`);
    data = await res.json();
    addToDom(data);
  } catch (error) {}
};
// create new address
const addToAddress = async (e) => {
  e.preventDefault();
  const data = gatherFormDate(e);
  try {
    const res = await fetch(`${API_URL}/address`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
// update selected address
const updateList = async (data, id) => {
  try {
    const res = await fetch(`${API_URL}/address/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
const updateAddress = async (newData, newDataId) => {
  try {
    // find previous selected address
    const res = await fetch(`${API_URL}/address?select_like=true`);
    const data = await res.json();
    const prevList = data[0];
    const previousTrueData = {
      title: prevList.title,
      address: prevList.address,
      select: false,
      id: prevList.id,
    };
    // update previous selected address
    updateList(previousTrueData, previousTrueData.id);
    updateList(newData, newDataId);
  } catch (error) {
    console.log(error);
  }
};
// ============events ============
backToCheckoutPage.addEventListener("click", () => {
  window.location.href = "checkoutPage.html";
});
// create new address
addAddressButton.addEventListener("click", () => {
  formContainer.style.display = "flex";
});
addressForm.addEventListener("submit", addToAddress);
// read address
readAddress();
// slected address
applyButton.addEventListener("click", () => {
  const addressContainers = $.querySelectorAll(".address-container");

  addressContainers.forEach((elem) => {
    if (elem.children[1].children[0].checked) {
      const addressId = elem.id;
      const addressTitle = elem.children[0].children[1].children[0].innerText;
      const addressDesc = elem.children[0].children[1].children[1].innerText;
      const data = {
        title: addressTitle,
        address: addressDesc,
        select: true,
        id: addressId,
      };
      // updat list
      updateAddress(data, addressId);
    }
  });
});
