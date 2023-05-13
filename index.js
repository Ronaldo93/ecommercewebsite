const express = require('express');
const app = express();
const path = require('path');

// session
const session = require('express-session');

// WILL consider after fully developing the features--------------
// config session for passport
<<<<<<< HEAD
// app.use(session({
//     secret:'what sa fuk',
//     resave: false,
//     saveUninitialized: false
// }))



// app.use(passport.session()); 
=======
app.use(session({
    secret:'what sa fuk',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 3600000, // 1 hour
      expires: new Date(Date.now() + 3600000) // 1 hour
    }
}));
>>>>>>> c634cb16fc2adbe37432505e1b517bd6c7ec95a6
// ----------------------------------------------------------------

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Using public 
app.use(express.static(path.join(__dirname, 'src', 'public')));

//ejs use
// set views folder
app.set("views", path.join(__dirname, "src", "views"));
app.set('view engine', 'ejs');
const port = 3000;

// route define
const signup = require('./src/routes/signup');
// const home = require('./src/routes/home');
<<<<<<< HEAD

=======
const login = require('./src/routes/login');
>>>>>>> c634cb16fc2adbe37432505e1b517bd6c7ec95a6

// route
app.use('/index', (req, res) => {
    res.render('index');
});

app.use('/signup', signup);
<<<<<<< HEAD
=======
app.use('/login', login);
>>>>>>> c634cb16fc2adbe37432505e1b517bd6c7ec95a6
// mongoose
const mongoose = require('mongoose');
const passport = require('passport');

// passport
app.use(passport.initialize());
// app.use(passport.session());

// uri for mongodb atlas
const uri = "mongodb+srv://adc:7fvsHmHceMCXn48R@cluster0.rkmbxva.mongodb.net/ecommerce?retryWrites=true&w=majority";

// connect to mongodb server
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// listening on 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



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

// Use the `express.urlencoded` middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

app.get('/addproduct', (req, res) => {
  res.render('add_product');
});

app.post('/products', (req, res) => {
  console.log(req.body);
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
