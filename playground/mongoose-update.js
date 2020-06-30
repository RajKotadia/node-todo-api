const { ObjectID } = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo');

const id = '5efabd39d9ef8d50e8a2649a';
const result = ObjectID.isValid(id);

if (result) {
    Todo.findByIdAndUpdate(
        id,
        { $set: { text: 'Learning mongoose' } },
        { new: true }
    )
        .then((todo) => {
            if (!todo) {
                return console.log('No such todo found');
            }
            console.log('New todo', todo);
        })
        .catch((err) => {
            console.log('Counld not update todo', err);
        });
}
