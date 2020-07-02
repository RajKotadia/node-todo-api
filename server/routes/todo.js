const { Router } = require('express');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const Todo = require('./../models/Todo');
const authenticate = require('./../middleware/middleware');

const router = Router();

// create todo route
router.post('/', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _createdBy: req.userId,
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

// list all todos route
router.get('/', authenticate, (req, res) => {
    Todo.find({ _createdBy: req.userId })
        .then((todos) => {
            res.send({ todos });
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

// get todo with given ID
router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id;

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).json('Invalid id');
    }

    Todo.findOne({
        _id: id,
        _createdBy: req.userId,
    })
        .then((todo) => {
            // if no todo with given ID
            if (!todo) {
                return res.status(404).json('Invalid id');
            }
            res.send({ todo });
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

// delete a todo with given ID
router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id;

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).json('Invalid id');
    }

    // for valid id find by id and delete
    Todo.findOneAndDelete({
        _id: id,
        _createdBy: req.userId,
    })
        .then((todo) => {
            // if no todo with given ID
            if (!todo) {
                return res.status(404).json('Invalid id');
            }
            res.send(todo);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

// update a todo with given ID
router.patch('/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).json('Invalid id');
    }

    // set the completed and completed fields
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(
        {
            _id: id,
            _createdBy: req.userId,
        },
        { $set: body },
        { new: true, runValidators: true }
    )
        .then((todo) => {
            // if no todo with given ID
            if (!todo) {
                return res.status(404).json('Invalid id');
            }
            res.send({ todo });
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

module.exports = router;
