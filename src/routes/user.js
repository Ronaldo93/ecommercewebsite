// User-related routes
const express = require("express");
const router = express.Router();

// MIDDLEWARE
// Check if user is logged in
const checkAuth = require("../middleware/checkAuth");

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
router.get("/profile", checkAuth, (req, res) => {
  res.render("user_profile", { user: req.user });
});

module.exports = router;
