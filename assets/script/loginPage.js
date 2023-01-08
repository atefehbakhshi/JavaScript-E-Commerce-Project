const $ = document;

//========= Dom variables =========
const form = $.querySelector("#login-form");
const userEmailContainer = $.querySelector("#user-email-container");
const passwordContainer = $.querySelector("#password-container");
const userEmail = $.querySelector("#user-email");
const userPass = $.querySelector("#user-pass");
const visibility = $.querySelector("#visibility-off");
const rememberMe = $.querySelector("#remember-me");
const loginBtn = $.querySelector("#sign-in");

//========= global variables =========
let user = {
  email: "",
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
form.addEventListener("keyup", (e) => {
  const targetId = e.target.id;
  if (targetId === "user-email") {
    userEmailContainer.classList.add("border");
    passwordContainer.classList.remove("border");
  }
  if (targetId === "user-pass") {
    userEmailContainer.classList.remove("border");
    passwordContainer.classList.add("border");
  }
  user.email = userEmail.value;
  user.pass = userPass.value;
  if (user.email !== "" && user.pass !== "") {
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
    userEmailContainer.classList.remove("border");
    passwordContainer.classList.remove("border");
    user.remember = true;
  } else {
    passwordContainer.classList.add("border");
    user.remember = false;
  }
  signIn(user);
});
