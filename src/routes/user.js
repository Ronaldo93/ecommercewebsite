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
// @route GET /logout
// @desc logout user
// @access public
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// @route GET /user/profile
// @desc render user profile page
// @access private
router.get("/profile", checkAuth, async (req, res) => {
  if (req.user.role === "shipper") {
    let user = await User.findById(req.user._id).populate("distributionHub");
    return res.render("user_profile", { user: user });
  }
  res.render("user_profile", { user: req.user });
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
