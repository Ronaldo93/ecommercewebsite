/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

// clicking edit -> add class active to imageUpload
const editProfile = document.querySelector("#edit-profile");
const imageUpload = document.querySelector(".imageUpload");

editProfile.addEventListener("click", () => {
  document.querySelector(".imageUpload").classList.add("active");
});

// clicking outside -> remove class active from imageUpload
imageUpload.addEventListener("click", (e) => {
  if (e.target.classList.contains("imageUpload")) {
    document.querySelector(".imageUpload").classList.remove("active");
  }
});
