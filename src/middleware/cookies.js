const session = require('express-session');

module.exports = () => { return (session({
    secret:'mykey',
    resave: false,
    saveUninitialized: false,
}))
};