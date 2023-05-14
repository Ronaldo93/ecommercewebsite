const express = require('express');
const app = express();
// MODULES
// router (routing user)
const router = express.Router();
const sessionMiddleware = require('../middleware/cookies');

// signup procedure - auth module, hash module
const passport = require('passport');
app.use(sessionMiddleware());

app.use(passport.initialize());
app.use(passport.authenticate('session'));


const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// MAIN PART
// 1. import user model
const User = require('../model/usermodel');

// 2. passport for login
passport.use('local_signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, (username, password, done) => {
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

passport.serializeUser(function (user, done) {
    console.log('serialize', user);
    done(null, user._id);
});

passport.deserializeUser((user, done) => {
    console.log('deserialize')
    // Look up user id in database. 
    User.findById(user._id).then((user) => {
        console.log('deserialize', user);
        return done(null, user._id);
        // console.log('done');
    }).catch((err) => {
        console.log(err);
        return done(err);
    });
  });



// @route GET /login
// @desc render login page
// @access public
router.get('/', (req, res) => {
    res.render('signin_demo');
});



// validate & upload data -> database
router.post('/auth',
    passport.authenticate('local_signin',
        {
            session: true,
            failureRedirect: '/signin',
            failureFlash: true,
            successRedirect: '/signin/test',
        })
);

router.get('/test', (req, res) => {
    console.log(req.user);
    res.send(req.user);
    });


module.exports = router;

