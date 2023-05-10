const express = require('express');
const app = express();

// express-validator (validate)
const { check, validationResult } = require('express-validator');

// router (routing user)
const router = express.Router();

// signup procedure
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// import user model
const User = require('../model/user');

// regex for password
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

// validate & upload data -> database
router.post('/', 
    [check('password', 'Password must include one uppercase character, one lowercase character, a number, and a special character.').matches(passwordregex)],
    (req, res, next) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
}, passport.authenticate('local', { successRedirect: '/', failureRedirect: '/register' }));  

module.exports = router;


