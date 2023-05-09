const express = require('express');
const router = express.Router();

// signup
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// import user model
const User = require('../model/user');

// conf localstrategy
passport.use(new LocalStrategy(
    function(username, password, done) {
        // find the user
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            // if user not found
            if (user) {
                return done(null, false, { message: 'Username already taken.' });
            }
            const newUser = new User({username: username, password: bcrypt.hashSync(password, 10)});
            newUser.save(function(err) {
                if (err) {return done(err);}
                return done(null, newUser);
            });
        });
    }
));

app.post('/register',
  passport.authenticate('local', { failureRedirect: '/register' }),
  function(req, res) {
    res.redirect('/');
  });
