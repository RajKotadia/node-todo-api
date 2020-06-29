const mongoose = require('mongoose');

const dbName = 'TodoApp';
const dbUrl = `mongodb://localhost:27017/${dbName}`;
const mongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// making a connection to the mongoDB server
mongoose
    .connect(dbUrl, mongoClientOptions)
    .then(() => console.log('Connected to the MongoDB Server !'))
    .catch((err) =>
        console.log('Unable to connect to the MongoDB Server', err)
    );

module.exports = mongoose;
