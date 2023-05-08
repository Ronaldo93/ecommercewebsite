const mongoose = require('mongoose');
// connect to mongoose
mongoose.connect('mongodb://localhost:3000/customer', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

// create a schema
const userSchema = new mongoose.Schema({
    // validate nam
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    // validate email
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        // prevent sql injection
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                .test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    address {
        type: String,
        required: true
    },
