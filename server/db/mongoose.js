const mongoose = require('mongoose');
const { eventNames } = require('../models/Todo');

// setting up the config
const dbName = 'TodoApp';
const mongoURI =
    process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;
const mongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

// making a connection to the mongoDB server
mongoose
    .connect(mongoURI, mongoClientOptions)
    .then(() => console.log('Connected to the MongoDB Server !'))
    .catch((err) =>
        console.log('Unable to connect to the MongoDB Server', err)
    );

module.exports = mongoose;
