import { switchPage } from "../modules/switchPage.js";

const user = JSON.parse(localStorage.getItem("user"));
if (user !== null && user.remember) {
  setTimeout(() => {
    window.location.href = "homepage.html";
  }, 2000);
}

switchPage(2);
