const express = require('express');
const app = express();
const path = require('path');

// session
// const session = require('express-session');


// WILL consider after fully developing the features--------------
// config session for passport
// app.use(session({
//     secret:'what sa fuk',
//     resave: false,
//     saveUninitialized: false
// }))

// config passport globally
// app.use(passport.initialize());
// app.use(passport.session()); 
// ----------------------------------------------------------------

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

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


// route
app.use('/home', (req, res) => {
    res.render('index');
});
app.use('/signup', signup);

// app.use('/:id',(req,res)=> {
//     const resourId= req.params.id;
//     res.render('test');
// });
// mongoose
const mongoose = require('mongoose');
const passport = require('passport');

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
const Product = require('./src/model/test');

// Retrieve products from the database
Product.find({})
  .then((products) => {
    // Loop through products and define routes
    products.forEach((product) => {
      const id = product._id; // Get the product ID

      app.get(`/${id}`, (req, res) => {
        res.render('detail', { product });
      });
    });
  })
  .catch((error) => {
    console.log('Error retrieving products:', error);
  });
  // Product.find()
  // .then((products) => {
  //     console.log(products);
  // })
  // .catch((error) => {console.log(error.message)});
 

  app.get('/product', (req, res) => {
    Product.find()
    .then((products) => {
        res.render('product', {products: products});
    })
    .catch((error) => console.log(error.message));
});