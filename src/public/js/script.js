/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */
  
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
