const express = require('express');
const app = express();

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
// import user model
const User = require('../model/user');

// regex for password
const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

// conf localstrategy
passport.use(new LocalStrategy({passReqToCallback: true
},function(req, username, password, done) {
    // input
    const role = req.body.role;
    // TODO: Find a way to import picture -> mongoose
    const name = req.body.name;
    const customer_address = req.body.customer_address;
    const businessname = req.body.businessname;
    const businessaddress = req.body.businessaddress;
    const distributionHub = req.body.distributionHub;
    // find the user
    User.findOne({ username: username})
    .then((user) => {
        // if user not found
        if (user) {
        return done(null, false, { message: "Username already taken." });
        }

        // define what data to sent
        const newUser = new User({
        name: name,
        username: username,
        role: role,
        customer_address: customer_address,
        businessname: businessname,
        businessaddress: businessaddress,
        distributionHub: distributionHub, 
        encrypted_password: bcrypt.hashSync(password, 10),
        });
        newUser.save(); 
        return done(null, newUser);
    }).catch((err) => {
        console.log(err)    
        return done(err);
    });
}));


// TODO Possibly optimize the code -> middleware
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


