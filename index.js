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


// Express's built-in JSON parser 
app.use(express.json());

// Using public 
app.use(express.static('public'));

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
