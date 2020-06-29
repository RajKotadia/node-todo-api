const MongoClient = require('mongodb').MongoClient;

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

    // Adding a new Todo
    TodosCollection.insertOne({
        text: 'Complete the assignment',
        completed: false,
    })
        .then((result) => {
            console.log(result.ops);
        })
        .catch((err) => {
            console.log('Unable to add a new Todo', err);
        });

    // Adding a new User
    UsersCollection.insertOne({
        name: 'John',
        age: 23,
        location: 'Toronto',
    })
        .then((result) => {
            console.log(result.ops);
        })
        .catch((err) => {
            console.log('Unable to add a new User', err);
        });

    // disconnecting the client
    // client.close();
});
