const express = require("express");
const app = express();
const path = require("path");

// Only need local storage for now
// const MongoStore = require('connect-mongo');
const bcrypt = require("bcryptjs");

// body-parser (should be used before any route, even some middleware)
// because it parses the body and adds it to the request object
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// mongoose
const mongoose = require("mongoose");

// MONGODB
// uri for mongodb atlas
const uri =
  "mongodb+srv://adc:7fvsHmHceMCXn48R@cluster0.rkmbxva.mongodb.net/ecommerce?retryWrites=true&w=majority";
// connect to mongodb server
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 5000, // 5 second
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// WIP - SESSION
// COOKIES
// 1. Requirements
// express-session, uuid, session-file-store, express-flash (for flash messages)
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

// Middleware
// authentication middleware: passport
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
// other middleware (checkauth and authenticated for checking user status)
const checkAuth = require("./src/middleware/checkAuth");

// The whole server uses flash
app.use(flash());

// 2. User Model
const User = require("./src/model/usermodel");

app.use(
  session({
    // unique id per request
    genid: (req) => {
      console.log("Inside the session middleware, ID is: ", req.sessionID);
      return uuidv4();
    },
    // For now we'll just store locally (in sessions folder)
    store: new FileStore(),
    // some option related to session
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// serialize -> deserialize
// serialize: save user info to session (user object)
passport.serializeUser((user, done) => {
  console.log(
    "Inside serializeUser callback. User id is save to the session file store here"
  );
  done(null, user);
});

// deserialize: get user info from session
passport.deserializeUser((user, done) => {
  console.log("Inside deserializeUser callback");
  console.log(
    `The user id passport saved in the session file store is: ${user}`
  );
  done(null, user);
});

// Strategy for authentication
// Login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username })
        .then((user) => {
          if (user !== null) {
            console.log("User found:", user); // debug
            // compare password
            if (!bcrypt.compareSync(password, user.encrypted_password)) {
              return done(null, false, { message: "Incorrect password." });
            }
            // for shipper only, if user is not shipper, return null
            // TODO: fix this
            distributionHub
              .findOne({ name: req.body.distributionHubname })
              .then((hub) => {
                console.log("Hub found:", hub);
                user.distributionHub = hub._id;
                return done(null, user);
              });
          } else {
            console.log("User not found");
            return done(null, false, {
              message:
                "Either the credential is incorrect, or you haven't signed up. Please check again",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    }
  )
);

// route after defining passport strategy
app.get("/", (req, res) => {
  console.log("debug info:");
  console.log("req.user: ", req.user);
  console.log("req.login: ", req.login);
  console.log("req.logout:", req.logout);
  console.log("req.isAuthenticated: ", req.isAuthenticated());
  res.render("index", { authenticated: req.isAuthenticated() });
});

app.get("/failed", (req, res, next) => {
  console.log(req.session);
  res.send("failed login!");
});

app.get("/success", checkAuth, (req, res, next) => {
  console.log("debug info:");
  console.log("req.user: ", req.user);
  console.log("req.login: ", req.login);
  console.log("req.logout:", req.logout);
  console.log("req.isAuthenticated: ", req.isAuthenticated());
  console.log("req.query: ", req.query);
  req.flash("message", "login success! Welcome " + req.user.username + "!");
  console.log(req.flash("message"));
  res.redirect("/product");
});

// ui for login (disabled cuz no need)
// app.get("/login1", (req, res, next) => {
//     res.render("login1")
// });

app.post(
  "/login",
  function (req, res, next) {
    console.log(req.body);
    next();
  },
  passport.authenticate("login", {
    failureRedirect: "/failed",
    successRedirect: `/success?message=success!%20You%20logged%20in!`,
    failureMessage: true,
    successMessage: true,
  })
);

// END OF AUTH =========================

// middleware
const checkPermission = require("./src/middleware/checkrole");

// Using public
app.use(express.static(path.join(__dirname, "src", "public")));
// ejs use
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");
const port = 3000;

// route define
const signup = require("./src/routes/signup");
const product = require("./src/routes/product");
const cart = require("./src/routes/cart");
const vendor = require("./src/routes/vendor");
const shipper = require("./src/routes/shipper");
// route
app.use("/signup", signup);
app.use("/product", product);
app.use("/cart", cart);
app.use("/vendor", vendor);
app.use("/shipper", shipper);

// static route
app.get("/about", (req, res) => res.render("static_about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/privacy", (req, res) => res.render("static_privacy"));
app.get("/help", (req, res) => res.render("static_help"));

// MISCELLANEOUS
// Port: listening on 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// TEST IMAGE
app.get("/testimage", (req, res) => {
  res.render("testimage", { user: req.user });
});

// THE SECTION BELOW IS FOR DEBUGGING PURPOSES ONLY
// DO NOT USE IN PRODUCTION

// TEST: GET ALL USERS
app.get("/getusers", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.log(err));
});

const DistributionHub = require("./src/model/distributionhub");
const distributionHub = require("./src/model/distributionhub");

// TEST: ADD DISTRIBUTION HUB
app.post("/addhub", (req, res) => {
  const hub = new DistributionHub({
    name: req.body.name,
    address: req.body.address,
  });
  hub
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
