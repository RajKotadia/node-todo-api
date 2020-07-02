const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the Todo model
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
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
    _createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

// registering the schema
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
