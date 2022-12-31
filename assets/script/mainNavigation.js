const $ = document;
const home = $.querySelector("#home");
const cart = $.querySelector("#cart");
const order = $.querySelector("#order");
const wallet = $.querySelector("#wallet");
const profile = $.querySelector("#profile");

const pageLocation = (page) => (window.location.href = `${page}Page.html`);

home.addEventListener("click", () => pageLocation("home"));
cart.addEventListener("click", () => pageLocation("cart"));
order.addEventListener("click", () => pageLocation("order"));
wallet.addEventListener("click", () => pageLocation("#"));
profile.addEventListener("click", () => pageLocation("#"));
