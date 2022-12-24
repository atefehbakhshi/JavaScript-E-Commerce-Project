const $ = document;

const boardingPageBtn = $.querySelector("#back-to-boarding-page");

const form = $.querySelector("#login-form");
const userNameContainer = $.querySelector("#user-name-container");
const passwordContainer = $.querySelector("#password-container");
const userName = $.querySelector("#user-name");
const userPass = $.querySelector("#user-pass");
const rememberMe = $.querySelector("#remember-me");

const loginBtn = $.querySelector("#sign-in");

let user = {
  name: "",
  pass: "",
  remember: false,
};

boardingPageBtn.addEventListener('click',()=>{
    window.location.href='onboardingpage3.html'
})

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
  }
});

rememberMe.addEventListener("click", (e) => {
  if (e.target.checked) {
    userNameContainer.classList.remove("border");
    passwordContainer.classList.remove("border");
    user.remember=true;
  }else{
    passwordContainer.classList.add("border");
    user.remember=false;
  }
});

loginBtn.addEventListener('click',()=>{
    
})
