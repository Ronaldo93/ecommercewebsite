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



// using session
router.use(session({
    secret:'what sa fuk',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 3600000, // 1 hour
      expires: new Date(Date.now() + 3600000) // 1 hour
    },
    cookie: {
      secure: false
    },
    
}));


// passport
router.use(passport.initialize());
router.use(passport.session());

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

passport.serializeUser(function (user, done) {
    console.log('serialize');
    done(null, {id: user.id, role: user.role, username: user.username});
});

passport.deserializeUser((user, done) => {
    // Look up user id in database. 
    User.findById(user.id, function (err, user) {
      if (err) return done(err); 
      done(null, {id: user.id, role: user.role, username: user.username});
    });
  });


// validate & upload data -> database
router.post('/auth', (req, res, next) => {
    // convert json
    JSON.stringify(req.body);
    passport.authenticate('local_signin',
        {
            session: true,
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
            // set username in cookies
            req.session.username = () => {
                User.findOne({'username': username})
                    .then((user) => {
                        return user.username;
                    });
                };
            // set role in cookies
            req.session.role = () => {
                User.findOne({'username': username})
                    .then((user) => {
                        return user.role;
                    });
                };
            return res.redirect('/');
        })(req, res, next);
});


module.exports = router;

