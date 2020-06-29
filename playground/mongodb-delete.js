const { MongoClient, ObjectID } = require('mongodb');

const dbName = 'TodoApp';
const mongodbUrl = `mongodb://localhost:27017/${dbName}`;
const clientOptons = {
    useUnifiedTopology: true,
};

MongoClient.connect(mongodbUrl, clientOptons, (err, client) => {
    if (err) {
        return console.log('Unable to connect to the MongoDB Server.');
    }

    console.log('Connected to the MongoDB Server.');

    // getting the DB reference
    const db = client.db('TodoApp');
    const TodosCollection = db.collection('Todos');
    const UsersCollection = db.collection('Users');

    // deleteMany - delete all docs that match the condition
    TodosCollection.deleteMany({ text: 'Complete assignment' })
        .then((result) => {
            console.log('Todos deleted: ', result.deletedCount);
        })
        .catch((err) => {
            console.log('Unable to delete todos', err);
        });

    // deleteOne - delete the first instance that matches the given condition
    TodosCollection.deleteOne({ text: 'Complete assignment' })
        .then((result) => {
            console.log('Todos deleted: ', result.deletedCount);
        })
        .catch((err) => {
            console.log('Unable to delete todo', err);
        });

    // findOneAndDelete - same as deleteOne but also returns that instance
    TodosCollection.findOneAndDelete({ completed: false })
        .then((result) => {
            console.log('Todo deleted: ', result);
        })
        .catch((err) => {
            console.log('Unable to delete todo', err);
        });

    // find a user with gievn ID and delete
    UsersCollection.findOneAndDelete({
        _id: new ObjectID('5ef92645b0cee98900aad71e'),
    })
        .then((result) => {
            console.log('User deleted: ', result);
        })
        .catch((err) => {
            console.log('Unable to delete user', err);
        });

    // disconnecting the client
    // client.close();
});
