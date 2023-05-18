const express = require("express");
const app = express();
const imagehandler = require("../middleware/image");
const checkpass = require("../middleware/checkpass");

// MODULES
// router (routing user)
const router = express.Router();

// signup procedure - auth module, hash module
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// MAIN PART
// 1. import user model
const User = require("../model/usermodel");
const distributionHub = require("../model/distributionhub");

// 2. passport for registeration
passport.use(
  "local_signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      // define field for register
      // check if user exists
      User.findOne({ username: username })
        .then((user) => {
          if (user) {
            return done(null, false, { message: "Username already exists." });
          }
          // check for the distribution hub _id & modify the request body
          if (req.body.role === "shipper") {
            distributionHub
              .findOne({ distributionHubname: req.body.distributionHubname })
              .then((hub) => {
                if (hub) {
                  req.body.distributionHubname = hub._id;
                } else {
                  return done(null, false, {
                    message: "Distribution Hub does not exist.",
                  });
                }
              });
          }
          // create new user
          const newUser = new User({
            name: req.body.name,
            username: username,
            encrypted_password: bcrypt.hashSync(password, 10),
            profile_picture: req.body.imageBase64,
            role: req.body.role,
            customer_address: req.body.customeraddress,
            businessname: req.body.businessname,
            businessaddress: req.body.businessaddress,
            distributionHub: req.body.distributionHub,
          });
          newUser.save();
          return done(null, newUser);
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    }
  )
);

// @route GET /signup
// @desc render signup page
// @access public
router.get("/", (req, res) => {
  res.render("signup_redirect");
});

// @route GET /signup/customer
// @desc render signup page for customer
// @access public
router.get("/customer", (req, res) => {
  res.render("signup_customer");
});

// @route GET /signup/vendor
// @desc render signup page for vendor
// @access public
router.get("/vendor", (req, res) => {
  res.render("signup_vendor");
});

// @route GET /signup/shipper
// @desc render signup page for shipper (use async await to get distribution hub list)
// @access public
router.get("/shipper", async (req, res) => {
  let distributionHub = await distributionHubQuery();
  res.render("signup_shipper", { distributionHub: distributionHub });
});

//@route POST /signup/new
//@desc register new user
//@access public
router.post("/new", checkpass, imagehandler, (req, res, next) => {
  // debug
  // JSON.stringify(req.body);
  passport.authenticate(
    "local_signup",
    {
      session: false,
      failureRedirect: "/signup",
    },
    function (err, user, info) {
      console.log("auth");
      console.log(err);
      console.log(user);
      console.log(info);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/signup");
      }
      return res.redirect("/");
    }
  )(req, res, next);
});

// distribution hub query
async function distributionHubQuery() {
  // find all distribution hub
  return distributionHub
    .find({ name: { $exists: true } })
    .then((hub) => {
      // Get the name of the distribution hub
      console.log(hub);
      return hub;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = router;
