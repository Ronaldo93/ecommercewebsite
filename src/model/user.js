const mongoose = require('mongoose');
// connect to mongoose
// mongoose.connect('mongodb://localhost:3000/customer', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Error connecting to MongoDB', err));

// create a schema
const userSchema = new mongoose.Schema({
  // ==========Universal==========
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Za-z0-9]{8,15}$/
      },
      password: {
        type: String,
        required: true,
        match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/
      },

      // profile picture storing on the database
      profile_picture: {
        type: Buffer,
        required: true
      },
      // ==========USER==========
      name: {
        type: String,
        // boolean based on the role
        required: function () { return this.role === 'customer' }
      },
      customer_address: {
        type: String,
        required: true
      },
      // ==========BUSINESS==========
      businessname: {
        type: String,
        // boolean based on the role
        required: function () { return this.role === 'vendor' },
        minlength: 5,
        unique: function () { return this.role === 'vendor' }
      },
      businessaddress: {
        type: String,
        // boolean based on the role
        required: function () { return this.role === 'vendor' },
        minlength: 5,
        unique: function () { return this.role === 'vendor' }
      },
      // ==========Shipper==========
      distributionHub: {
        name: {
          type: String,
          // required: function() {
            // return this.role === 'shipper';
          },
        address: {
          type: String,
          // required: function() {
          //   return this.role === 'shipper';
        },
        minlength: 5,
        required: function() {
          return this.role === 'shipper';
        }
      },
      // ==========ROLE==========
      role: {
        type: String,
        enum: ['vendor', 'customer', 'shipper'],
        required: true
      },
      // ==========Hashed Password==========
      encrypted_password: {
        type: String, 
        required: true
      }
});

const User = mongoose.model('User', userSchema);

module.exports = User;