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

// creating the Todo model
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null,
    },
});

// creating a new instance of Todo
const newTodo = new Todo({
    text: 'Add a new feature to the API',
});

// saving the instance
newTodo
    .save()
    .then((doc) => {
        console.log('Saved todo', doc);
    })
    .catch((err) => {
        console.log('Unable to save todo', err);
    });
