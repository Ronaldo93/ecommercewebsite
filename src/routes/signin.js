const express = require('express');
const app = express();
const imagehandler = require('../middleware/image');
const checkpass = require('../middleware/checkpass');


// MODULES
// express-validator (validate)
const { check, validationResult } = require('express-validator');

// router (routing user)
const router = express.Router();

// signup procedure - auth module, hash module
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// MAIN PART
// 1. import user model
const User = require('../model/user');


// 2. passport for registeration
passport.use('local_signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, username, password, done) => {
    // define field for register
    // check if user exists
    User.findOne({ 'username': username }).then((user) => {
        if (user) {
            return done(null, false, { message: 'Username already exists.' });
        }
        // create new user
        const newUser = new User({
            username: username,
            encrypted_password: bcrypt.hashSync(password, 10),
            profile_picture: req.body.imageBase64,
        });
        newUser.save();
        return done(null, newUser);
    }).catch((err) => {
        console.log(err);
        return done(err);
    })
}));

// @route GET /signup
// @desc render signup page
// @access public
router.get('/', (req, res) => {
    res.render('signin_demo');
});

// validate & upload data -> database
router.post('/new', checkpass, imagehandler, (req, res, next) => {
    // debug
    JSON.stringify(req.body);
    passport.authenticate('local_signup',
        {
            session: false,
            failureRedirect: '/signup',
            successRedirect: '/signup',
        }, function (err, user, info) {
            console.log('auth');
            console.log(err);
            console.log(user);
            console.log(info);
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/signup');
            }
            return res.redirect('/signin');
        })(req, res, next);
});

module.exports = router;

