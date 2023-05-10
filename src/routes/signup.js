const express = require('express');
const app = express();

// TODO: Fix the validation

// express-validator
const { check, validationResult } = require('express-validator');

// router
const router = express.Router();

// signup
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// import user model
const User = require('../model/user');


const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

// conf localstrategy
passport.use(new LocalStrategy(function(username, password, done) {
    // find the user
    User.findOne({ username: username})
    .then((user) => {
        // if user not found
        if (user) {
        return done(null, false, { message: "Username already taken." });
        }
        const newUser = new User({
        username: username,
        encrypted_password: bcrypt.hashSync(password, 10),
        });
        newUser.save();
        return done(null, newUser);
    })
    .catch((err) => {
        return done(err);
    });
}
));


router.post('/', [check('password', 'Password must include one uppercase character, one lowercase character, a number, and a special character.').matches(passwordregex)], passport.authenticate('local', { failureRedirect: '/register' }), function(req, res) {
    console.log(req.password);
    res.redirect('/');
});   

module.exports = router;


