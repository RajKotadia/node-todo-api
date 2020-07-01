const { mongoURI } = require('./../config/config');

const mongoose = require('mongoose');

// setting up the config
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
