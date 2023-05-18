/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

// User-related routes
const express = require("express");
const router = express.Router();

// MIDDLEWARE
// Check if user is logged in
const checkAuth = require("../middleware/checkAuth");

// MODELS
const User = require("../model/usermodel");
const imageHandler = require("../middleware/image");

// GET ROUTES
// @route GET /user/logout
// @desc logout user
// @access public
router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    req.session.destroy(function (err) {
      if (err) {
       return next(err); 
      }
      res.redirect('/');
    });
  });
});

// @route GET /user/profile
// @desc render user profile page
// @access private
router.get("/profile", async (req, res) => {
  let image = await findImageByUserID(req, res);
  if (req.user.role === "shipper") {
    let user = await User.findById(req.user._id).populate("distributionHub");
    return res.render("user_profile", { user: user,  profile_image: image });
  }
  res.render("user_profile", { user: req.user, profile_image: image });
});

// @route POST /user/profile/updateImage
// @desc update user profile image
// @access private
router.post(
  "/profile/updateImage",
  checkAuth,
  imageHandler,
  async (req, res) => {
    let update = await User.findByIdAndUpdate(req.user._id, {
      image: req.body.imageBase64,
    });
    if (update) {
      return res.redirect("/user/profile");
    }
    else {
      return res.send("Error updating image");
    }
  }
);
module.exports = router;

// return base64 image
async function findImageByUserID(req, res) {
  let user = await User.findById(req.user._id);
  if (user) {
    return user.profile_picture;
  }
  return "not found";
}