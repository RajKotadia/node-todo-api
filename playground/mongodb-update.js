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

    // findOneAndUpdate(filter, update, options)
    TodosCollection.findOneAndUpdate(
        { text: 'Complete assignment' },
        {
            $set: {
                completed: true,
            },
        },
        { returnOriginal: false }
    )
        .then((result) => {
            console.log('Todo updated', result);
        })
        .catch((err) => {
            console.log('Unable to update todo', err);
        });

    // using the $set and $inc updte operators
    UsersCollection.findOneAndUpdate(
        { name: 'Jonas' },
        {
            $set: {
                name: 'Adam',
            },
            $inc: {
                age: 33,
            },
        },
        {
            returnOriginal: false,
        }
    )
        .then((result) => {
            console.log('Updated user', result);
        })
        .catch((err) => {
            console.log('Unable to update the record', err);
        });
    // disconnecting the client
    // client.close();
});
