const express = require('express');
const app = express();
// MODULES
// Session
const session = require('express-session');
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



passport.serializeUser(function (req, user, done) {
    console.log('serialize', user);
    done(null, {id: user.id, role: user.role, username: user.username});
});

passport.deserializeUser((req, user, done) => {
    console.log('deserialize')
    // Look up user id in database. 
    User.findById(user.id).then((user) => {
        console.log('deserialize', user);
        if (!user) {
            return done(null, false);
        }
        return done(null, {id: user.id, role: user.role, username: user.username});
    });
  });




// @route GET /login
// @desc render login page
// @access public
router.get('/', (req, res) => {
    res.render('signin_demo');
});



// validate & upload data -> database
router.post('/auth', (req, res, next) => {
    passport.authenticate('local_signin',
        {
            failureRedirect: '/signin',
            failureFlash: true,
            successRedirect: '/signin/fun',
        })(req, res, next);
});


router.get('/fun', (req, res) => {
    console.log(req.user);
    res.send(req.user);
});


module.exports = router;

