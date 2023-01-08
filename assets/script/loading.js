const user = JSON.parse(localStorage.getItem("user"));

if (user !== null && user.remember) {
  setTimeout(() => {
    window.location.href = "homepage.html";
  }, 1000);
}

const switchPage = () => {
  document.body.addEventListener("click", () => {
    window.location.href = `welcome.html`;
  });
};

switchPage();
