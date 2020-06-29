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
    console.log(db);

    // creating a new collection explicitly
    db.createCollection('Todos');
    // using the Todos Collection -
    console.log(db.collection('Todos'));

    // disconnecting the client
    client.close();
});
