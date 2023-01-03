const $ = document;

//========= Dom variables =========
const home = $.querySelector("#home");
const cart = $.querySelector("#cart");
const order = $.querySelector("#order");
const wallet = $.querySelector("#wallet");
const profile = $.querySelector("#profile");

//========= functions =========
const pageLocation = (page) => (window.location.href = `${page}Page.html`);

//========= events =========
home.addEventListener("click", () => pageLocation("home"));
cart.addEventListener("click", () => pageLocation("cart"));
order.addEventListener("click", () => pageLocation("order"));
wallet.addEventListener("click", () => pageLocation("#"));
profile.addEventListener("click", () => pageLocation("#"));
