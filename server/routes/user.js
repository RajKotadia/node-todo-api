const { Router } = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const authenticate = require('./../middleware/middleware');

const router = Router();

// create a new user
router.post('/register', async (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    // check if the email is already exists
    const exists = await User.findOne({ email: body.email });
    if (exists) {
        return res.json('Email address is already registered.');
    }

    // if the above checks are completed
    const user = new User(body);
    user.save()
        .then((user) => {
            res.send(_.pick(user, ['_id', 'email']));
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

// authenticate the user
router.post('/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    // authenticate the user
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            // generate the token and send the response
            const token = user.generateAuthToken();
            const data = _.pick(user, ['_id', 'email']);
            res.header('x-auth', token).send(data);
        })
        .catch((err) => {
            res.status(400).json('Invalid Email or Password');
        });
});

router.get('/me', authenticate, (req, res) => {
    res.send({ _id: req.userId });
});

module.exports = router;
