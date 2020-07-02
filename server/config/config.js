require('dotenv').config();

const env = process.env.NODE_ENV;

if (env === 'production') {
    module.exports = {
        mongoURI: process.env.MONGO_URI,
        port: process.env.PORT,
    };
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost:27017/TodoApp',
        port: 3000,
    };
}
