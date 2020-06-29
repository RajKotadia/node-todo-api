const mongoose = require('mongoose');

// creating the User model
const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
});

module.exports = User;
