const express = require('express');

const { port } = require('./config/config');
const mongoose = require('./db/mongoose');
const users = require('./routes/user');
const todos = require('./routes/todo');

// initialize the app
const app = express();

// express middleware
app.use(express.json());

// register the routes
app.use('/todos', todos);
app.use('/users', users);

app.listen(port, () => console.log(`Server running on port ${port}`));
