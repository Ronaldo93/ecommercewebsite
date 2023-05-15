const express = require('express');
const app = express();
const path = require('path');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');

// body-parser (should be used before any route, even some middleware)
// because it parses the body and adds it to the request object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// WIP - SESSION
// COOKIES
// 1. Requirements
// express-session, uuid, session-file-store, express-flash (for flash messages)
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

// Middleware
// authentication middleware: passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// other middleware
const checkAuth = require('./src/middleware/checkAuth');

// 2. User Model
const User = require('./src/model/usermodel');

app.use(session({
  // unique id per request
  genid: (req) => {
    console.log('Inside the session middleware, ID is: ', req.sessionID);
    return uuidv4();
  },
  // For now we'll just store locally (in sessions folder)
  store: new FileStore(),
  // some option related to session
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// serialize -> deserialize
// serialize: save user info to session (user object)
passport.serializeUser((user, done) => {
    console.log("Inside serializeUser callback. User id is save to the session file store here");
    done(null, user);
});

// deserialize: get user info from session
passport.deserializeUser((user, done) => {
    console.log("Inside deserializeUser callback");
    console.log(`The user id passport saved in the session file store is: ${user}`);
    done(null, user);
});

// Strategy for authentication
// Login
passport.use('login', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true 
    }, (req, username, password, done) => {
        User.findOne({ 'username': username }).then((user) => {
            if (user) {
                // compare password
                if (!bcrypt.compareSync(password, user.encrypted_password)) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            }
        }).catch((err) => {
            console.log(err);
            res.send(500).message('An error occured on our server! Hang tight...');
            return done(err);
        })
    })
);

// route after defining passport strategy
app.get("/", (req, res) => {
    console.log('debug info:');
    console.log("req.user: ", req.user);
    console.log("req.login: ", req.login);
    console.log("req.logout:", req.logout);
    console.log("req.isAuthenticated: ", req.isAuthenticated());
    res.send("Nothing to see here. go to /login");
});

app.get("/failed", (req, res, next) => {
    console.log(req.session);
    res.send("failed login!");
});
app.get("/success", checkAuth, (req, res, next) => {
    // console.log("req.user: ", req.user);
    // console.log("req.login: ", req.login);
    // console.log("req.logout:", req.logout);
    // console.log("req.isAuthenticated: ", req.isAuthenticated());
    console.log('req.query: ', req.query);
    res.send("login success!");
});

// ui for login
app.get("/login1", (req, res, next) => {
    res.render("login1")
});

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

// END OF TEST =========================

// middleware
const checkPermission = require('./src/middleware/checkrole');


// Using public 
app.use(express.static(path.join(__dirname, 'src', 'public')));
// ejs use
app.set("views", path.join(__dirname, "src", "views"));
app.set('view engine', 'ejs');
const port = 3000;

// route define
const signup = require('./src/routes/signup');
// const home = require('./src/routes/home');
// const login = require('./src/routes/login');
const test = require('./src/routes/protected');

// route
app.use('/index', (req, res) => { res.render('index'); } );
app.use('/signup', signup);

// test
app.use('/test',checkPermission('customer') , test);

// mongoose
const mongoose = require('mongoose');



// MONGODB
// uri for mongodb atlas
const uri = "mongodb+srv://adc:7fvsHmHceMCXn48R@cluster0.rkmbxva.mongodb.net/ecommerce?retryWrites=true&w=majority";
// connect to mongodb server
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


// MISCELLANEOUS
// Port: listening on 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// PRODUCT
// Retrieve products from the database
const Product = require('./src/model/product');

// Retrieve products from the database
// Product.find({})
//   .then((products) => {
//     // Loop through products and define routes
//     products.forEach((product) => {
//       const id = product._id; // Get the product ID

//       app.get(`/product/${id}`, (req, res) => {
//         res.render('detail', { product });
//       });
//     });
//   })
//   .catch((error) => {
//     console.log('Error retrieving products:', error);
//   });

app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  Product.findById(id)
      .then((matchedProduct) => {
          if (matchedProduct) {
              res.render('detail', { product: matchedProduct });
          } else {
              res.render('error', { message: 'Product not found' });
          }
      })
      .catch((error) => {
          console.log('Error retrieving product:', error);
          res.render('error', { message: 'Error retrieving product' });
      });
});
//   Product.find()
//   .then((products) => {
//       console.log(products);
//   })
//   .catch((error) => {console.log(error.message)});
 

  app.get('/product', (req, res) => {
    Product.find()
    .then((products) => {
        res.render('product', {products: products});
    })
    .catch((error) => console.log(error.message));
});

app.get('/addproduct', (req, res) => {
  res.render('add_product');
});

app.post('/products', (req, res) => {
  // console.log(req.body);
  const product = new Product(req.body);
  product.save()
    .then(() => res.redirect('/product'))
    .catch(error => res.send(error));
});

app.get('/viewproduct', (req, res) => {
  Product.find()
  .then((products) => {
      res.render('view_product', {products: products});
  })
  .catch((error) => console.log(error.message));
});
// Make cart page
const Cart = require('./src/model/cartmodel');
app.post('/carts', (req, res) => {
  // console.log(req.body);
  const cart = new Cart(req.body);
  cart.save()
    .then(() => res.redirect('/cart'))
    .catch(error => res.send(error));
});

app.get('/cart', (req, res) => {
  Cart.find()
  .then((Cart) => {
      res.render('cart', {Cart: Cart});
  })
  .catch((error) => console.log(error.message));
});

// Delete a item from cart
app.get('/cart/:id/delete', (req, res) => {
  Cart.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.send('Not found any product matching the ID!');
      }
      res.render('delete_product_from_cart', { product });
    })
    .catch(error => res.send(error));
});

app.post('/cart/:id/delete', (req, res) => {
  Cart.findByIdAndDelete(req.params.id)
    .then(product => {
      if (!product) {
        return res.send('Not found any product matching the ID!');
      }
      res.redirect('/cart');
    })
    .catch(error => res.send(error));
});


// Order a item from cart

app.get('/cart/:id/order', (req, res) => {
  Cart.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.send('Not found any product matching the ID!');
      }
      res.render('order_product', { product });
    })
    .catch(error => res.send(error));
});
const order = require('./src/model/order');

app.post('/cart/:id/order', (req, res) => {
  Cart.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.send('Not found any product matching the ID!');
      }
      const newOrder = new order({
        productTitle: product.productTitle,
        productPrice: product.productPrice,
        productThumbnail: product.productThumbnail,
        userName: product.userName,
        productId: product.productId,
        productDistributionHub: product.productDistributionHub,
        address: product.address,
      });
      newOrder.save()
        .then(() => {
          Cart.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('/cart'))
            .catch(error => res.send(error));
        })
        .catch(error => res.send(error));
    })
    .catch(error => res.send(error));
});
