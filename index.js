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
app.use('/product', (req, res) => {
    res.render('product');
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
let category_items = [];

// Retrieve products from the database
Product.find({})
  .then((products) => {
    category_items = products; // Assign the products to the category_items array

    // Loop through category_items and define routes
    category_items.forEach((item) => {
      const title = item.title.toLowerCase().replace(/\s+/g, '-');

      app.get(`/${title}`, (req, res) => {
        res.render('test', { item });
      });
    });

    // Export the category_items array after it has been populated
    module.exports = category_items;
    console.log(category_items);
  })
  .catch((error) => {
    console.log('Error retrieving products:', error);
  });