const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const mongoose = require('./db/mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User');

const app = express();

// express middleware
app.use(bodyParser.json());

// express routes
// create todo handler
app.post('/todos', (req, res) => {
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

// list todo handler
app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({ todos });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// get todo with given ID
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }

    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({});
            }
            res.send({ todo });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// delete a todo of given ID
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    // Validate the id - if invalid send 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }

    // for valid id find by id and delete
    Todo.findByIdAndDelete(id)
        .then((todo) => {
            // if no such todo with gievn id
            if (!todo) {
                return res.status(404).send();
            }
            res.send(todo);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
