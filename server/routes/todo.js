const { Router } = require('express');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const Todo = require('./../models/Todo');
const authenticate = require('./../middleware/middleware');

const router = Router();

// create todo route
router.post('/', authenticate, async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _createdBy: req.userId,
    });

    // save the new todo
    try {
        const result = await todo.save();
        res.send(result);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// list all todos route
router.get('/', authenticate, async (req, res) => {
    try {
        // get all the todos for current user
        const todos = await Todo.find({ _createdBy: req.userId });
        res.send({ todos });
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// get todo with given ID
router.get('/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).json('Invalid id');
    }

    try {
        // get the todo with given id
        const todo = await Todo.findOne({
            _id: id,
            _createdBy: req.userId,
        });

        // if there is no such Todo with the given id
        if (!todo) {
            return res.status(404).json('Todo Not Found');
        }

        res.send({ todo });
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// delete a todo with given ID
router.delete('/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).json('Invalid id');
    }
    try {
        // delete the todo with given id and return it
        const todo = await Todo.findOneAndDelete({
            _id: id,
            _createdBy: req.userId,
        });

        // if there is no such Todo with the given id
        if (!todo) {
            return res.status(404).json('Todo Not Found');
        }

        res.send(todo);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// update a todo with given ID
router.patch('/:id', authenticate, async (req, res) => {
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

    try {
        // update the todo with given id and return the updated value
        const todo = await Todo.findOneAndUpdate(
            {
                _id: id,
                _createdBy: req.userId,
            },
            { $set: body },
            { new: true, runValidators: true }
        );

        // if there is no such Todo with the given id
        if (!todo) {
            return res.status(404).json('Todo Not Found');
        }
        res.send({ todo });
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = router;
