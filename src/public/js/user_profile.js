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
