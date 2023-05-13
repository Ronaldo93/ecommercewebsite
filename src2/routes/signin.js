const express = require('express');
const app = express();
// MODULES

// router (routing user)
const router = express.Router();

// signup procedure - auth module, hash module
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// MAIN PART
// 1. import user model
const User = require('../model/usermodel');

// 2. passport for login
passport.use('local_signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, username, password, done) => {
    // define field for register
    // check if user exists
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
        return done(err);
    })
}));

// @route GET /login
// @desc render login page
// @access public
router.get('/', (req, res) => {
    res.render('signin_demo');
});

// validate & upload data -> database
router.post('/auth', (req, res, next) => {
    // convert json
    JSON.stringify(req.body);
    passport.authenticate('login_signin',
        {
            failureRedirect: '/signin',
            failureFlash: true,
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

