const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// creating the User schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Not a valid email address',
        },
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

// generates a JWT token - instance method
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

// authenticate the user - model method
UserSchema.statics.findByCredentials = async function (email, password) {
    // check whether the user with given email exists
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error();
    }

    // if the user exists compare the passwords
    const result = await bcrypt.compare(password, user.password);
    if (result) {
        return user;
    } else {
        throw new Error();
    }
};

// pre-save middleware to save hashed passwords
UserSchema.pre('save', async function () {
    const user = this;

    // only if the password field is modified
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // set the password to the hashed value
        user.password = hashedPassword;
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
