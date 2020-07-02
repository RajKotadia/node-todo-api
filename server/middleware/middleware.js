const jwt = require('jsonwebtoken');
const User = require('./../models/User');

// validate the token and user id
const authenticate = async (req, res, next) => {
    // get the header token
    const token = req.header('x-auth');

    // when the request does not contain the x-auth header
    if (!token) {
        return res.status(401).json('Access denied. Token is missing.');
    }

    try {
        // verify the token
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        // check if the user exists
        const userExists = await User.findOne({ _id });
        if (!userExists) {
            return res.status(401).json('Unauthorized access');
        }

        // if the user exists and token is valid
        req.userId = _id;
        next();
    } catch (err) {
        return res.status(400).json('Invalid Token');
    }
};

module.exports = authenticate;
