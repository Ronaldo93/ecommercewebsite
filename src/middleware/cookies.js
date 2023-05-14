const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = () => { return () => {session({
    secret:'myksfey',
    resave: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://adc:7fvsHmHceMCXn48R@cluster0.rkmbxva.mongodb.net/ecommerce?retryWrites=true&w=majority',
        onnection: mongoose.connection,
        ttl: 60 * 60 * 24
    }),
    saveUninitialized: false
}); 
}};