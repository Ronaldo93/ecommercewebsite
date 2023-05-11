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

// image
const multer = require('multer');

// MAIN PART
const imageTempMemory = multer.memoryStorage();
const upload = multer({ storage: imageTempMemory }).single('image');


// import user model
const User = require('../model/user');

// regex for password
const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

// conf localstrategy
passport.use("local-signup", new LocalStrategy(
    {
        passReqToCallback: true
    },
    async function(req, username, password, done) {
        // input
        const role = req.body.role;
        // TODO: Find a way to import picture -> mongoose
        const name = req.body.name;
        const customer_address = req.body.customer_address;
        const businessname = req.body.businessname;
        const businessaddress = req.body.businessaddress;
        const distributionHub = req.body.distributionHub;
        upload(req, res, async (err) => {
        if (err) {
            return done(err);
        }
        // find the user
        User.findOne({ username: username})
        .then(async (user) => {
            // if user not found
            if (user) {
            return done(null, false, { message: "Username already taken." });
            }
            // upload image
            const imageUpload = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }

            // define what data to put into 
            const newUser = new User({
            name: name,
            username: username,
            role: role,
            profile_picture: imageUpload,
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
    })
    }));


// TODO Possibly optimize the code -> middleware
// validate & upload data -> database
router.post('/newUser', 
    [check('password', 'Password must include one uppercase character, one lowercase character, a number, and a special character.').matches(passwordregex)],
    (req, res, next) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
}, passport.authenticate('local-signup', {session: false}, (err, user, info) => {
if (err) {
    return next(err);
}
if (!user)
    return res.status(400).json({message: 'Signup failed'})
}
));  
module.exports = router;


