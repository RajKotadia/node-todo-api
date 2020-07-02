const { Router } = require('express');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const Todo = require('./../models/Todo');
const authenticate = require('./../middleware/middleware');

const router = Router();

// create todo route
router.post('/', (req, res) => {
    const todo = new Todo({
        text: req.body.text,
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// list all todos route
router.get('/', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({ todos });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// get todo with given ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id)
        .then((todo) => {
            // if no todo with given ID
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// delete a todo with given ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // for valid id find by id and delete
    Todo.findByIdAndDelete(id)
        .then((todo) => {
            // if no todo with given ID
            if (!todo) {
                return res.status(404).send();
            }
            res.send(todo);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// update a todo with given ID
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // set the completed and completed fields
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
    )
        .then((todo) => {
            // if no todo with given ID
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

module.exports = router;
