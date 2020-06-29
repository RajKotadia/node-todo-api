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
    // getting collection reference
    const TodosCollection = db.collection('Todos');
    const UsersCollection = db.collection('Users');

    // getting all todos
    // .find() returns the location of first document
    const cursor = TodosCollection.find();
    cursor
        .toArray()
        .then((docs) => {
            console.log('All the Todos');
            console.log(docs);
        })
        .catch((err) => {
            console.log('Unable to fetch the todos', err);
        });

    // counting the number of todos
    cursor
        .count()
        .then((count) => {
            console.log(`Todos count: ${count}`);
        })
        .catch((err) => {
            console.log('Unable to count todos', err);
        });

    // retrieving todos where "completed = false"
    TodosCollection.find({ completed: false })
        .toArray()
        .then((docs) => {
            console.log('Todos which are not completed');
            console.log(docs);
        })
        .catch((err) => {
            console.log('Unable to fetch the todos', err);
        });

    // retrieving todo with given ID
    TodosCollection.find({ _id: new ObjectID('5ef995d5d9ef8d50e8a25118') })
        .toArray()
        .then((docs) => {
            console.log('Todo with given ID');
            console.log(docs);
        })
        .catch((err) => {
            console.log('Unable to fetch the todo', err);
        });

    // retrieving users whose age is greater than 25
    UsersCollection.find({ age: { $gt: 25 } })
        .toArray()
        .then((docs) => {
            console.log('Users with age greater than 25 years.');
            console.log(docs);
        })
        .catch((err) => {
            console.log('Unable to fetch users', err);
        });
    // disconnecting the client
    // client.close();
});
