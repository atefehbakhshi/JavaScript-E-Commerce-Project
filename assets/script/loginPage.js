const $ = document;
//========= Dom variables =========
const boardingPageBtn = $.querySelector("#back-to-boarding-page");
const form = $.querySelector("#login-form");
const userNameContainer = $.querySelector("#user-name-container");
const passwordContainer = $.querySelector("#password-container");
const userName = $.querySelector("#user-name");
const userPass = $.querySelector("#user-pass");
const visibility = $.querySelector("#visibility-off");
const rememberMe = $.querySelector("#remember-me");
const loginBtn = $.querySelector("#sign-in");
//========= global variables =========
let user = {
  name: "",
  pass: "",
  remember: false,
};
//========= functions =========
const signIn = (userObject) => {
  loginBtn.addEventListener("click", () => {
    localStorage.setItem("user", JSON.stringify(userObject));
    window.location.href = "homePage.html";
  });
};

//========= events =========
boardingPageBtn.addEventListener("click", () => {
  window.location.href = "onboardingpage3.html";
});

form.addEventListener("keyup", (e) => {
  const targetId = e.target.id;
  if (targetId === "user-name") {
    userNameContainer.classList.add("border");
    passwordContainer.classList.remove("border");
  }
  if (targetId === "user-pass") {
    userNameContainer.classList.remove("border");
    passwordContainer.classList.add("border");
  }
  user.name = userName.value;
  user.pass = userPass.value;
  if (user.name !== "" && user.pass !== "") {
    loginBtn.style.opacity = 1;
    signIn(user);
  }
});

visibility.addEventListener("click", () => {
  if (userPass.type === "password") {
    userPass.type = "text";
    visibility.innerText = "visibility";
  } else {
    userPass.type = "password";
    visibility.innerText = "visibility_off";
  }
});

rememberMe.addEventListener("click", (e) => {
  if (e.target.checked) {
    userNameContainer.classList.remove("border");
    passwordContainer.classList.remove("border");
    user.remember = true;
  } else {
    passwordContainer.classList.add("border");
    user.remember = false;
  }
  signIn(user);
});
