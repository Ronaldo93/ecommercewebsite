const express = require('express');
const app = express();

// JSON parser 
app.use(express.json());

// Using public 
app.use(express.static('public'));

//ejs use
app.set('view engine', 'ejs');
const port = 3000;

// route define
const home = require('./src/routes/home');
const signup = require('./src/routes/signup');


// route
app.use('/home', home);
app.use('/signup', signup);

// listening on 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
