const productsContainer = document.querySelector("#products");
export const addToDom = (list) => {
  list.forEach((elem) => {
    const html = `
        <div class="product" id="${elem.id}">
            <div class="product-image">
                 <img src="${elem.image}" alt="shoea" />
            </div>
            <div class="product-info">
                <p class="product-name">${elem.name}...</p>
                <p class="product-price">$ ${elem.price}</p>
            </div>
           <span class="product-quantity">${elem.quantity}</span>
        </div>
            `;
    productsContainer.insertAdjacentHTML("beforeend", html);
  });
};
