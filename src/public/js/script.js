let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");
let loginform = document.querySelector(".login-form-container");

menu.onclick = () => {
  menu.classList.toggle("fa-time");
  navbar.classList.toggle("active");
};

document.querySelector("#login-btn").onclick = () => {
  loginform.classList.toggle("active");
};

document.querySelector("#close-login-btn").onclick = () => {
  loginform.classList.remove("active");
};
