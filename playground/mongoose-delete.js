const { ObjectID } = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo');

// model.deleteMany() / model.deleteMany({}) - Empty object removes every document
// model.deleteMany({key: value}) - Removes all the docs that staisfy the condition
// Todo.deleteMany()
//     .then((result) => {
//         console.log('Deleted all todos', result);
//     })
//     .catch((err) => {
//         console.log('Unable to delete', err);
//     });

// model.deleteOne({key: value}) - specific doc
// model.deleteOne({}) / model.deleteOne() - first doc
// Todo.deleteOne()
//     .then((result) => {
//         console.log('Deleted todo', result);
//     })
//     .catch((err) => {
//         console.log('Unable to delete', err);
//     });

// model.findOneAndDelete() - deletes and returns the doc
Todo.findOneAndDelete({ text: 'Hello world' })
    .then((todo) => {
        console.log('Deleted todo', todo);
    })
    .catch((err) => {
        console.log('Unable to delete', err);
    });

const id = '5efa086b3e0cf3967020945b';
const result = ObjectID.isValid(id);

// model.findByIdAndDelete(id) - deletes doc with specified ID and returns it
Todo.findByIdAndDelete(id)
    .then((todo) => {
        console.log('Deleted todo', todo);
    })
    .catch((err) => {
        console.log('Unable to delete', err);
    });
