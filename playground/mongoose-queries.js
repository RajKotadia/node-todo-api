const { ObjectID } = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/Todo');

const id = '5efa086b3e0cf3967020945b';

const result = ObjectID.isValid(id);
console.log(result);

if (result) {
    // to retrieve all the documents
    //  field does not match - []
    Todo.find({ _id: id })
        .then((todos) => {
            console.log(todos);
        })
        .catch((err) => {
            console.log(err);
        });

    // retrieve the document with given field
    //  field does not match - null
    Todo.findOne({
        _id: id,
    })
        .then((todo) => {
            console.log('First match Todo', todo);
        })
        .catch((err) => {
            console.log(err);
        });

    // retrieve a document based on ID
    //  field does not match - null
    // In this case if the id is completely inValid the query will fail and result in error.
    // use -> ObjectID.isValid(id) to validate the id
    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                return console.log('No todo found');
            }
            console.log('Find by ID', todo);
        })
        .catch((err) => {
            console.log(err);
        });
} else {
    console.log('Invalid ID');
}
