# Node Todo API

Todo App RESTful API using Node.js with Express and MongoDB (mongoose) to create and manage Todos with the basic CRUD functionality with JWT based Authentication.

## To run it locally

1. Clone the repo and install the dependencies

    ```bash
    $ git clone "https://github.com/RajKotadia/node-todo-api.git"

    $ cd node-todo-api
    $ npm install
    ```

2. Create a `.env` file in project root and set the following environment variables.

    ```bash
    # Jwt secret key
    JWT_SECRET=YOUR_KEY

    # Also set the mongodb URI if you are connecting to a cloud MongoDB service.
    MONGO_URI=YOUR_URI
    ```

3. Once the dependencies are installed, you can start the server at `localhost:3000` using the following command

    ```bash
    # development
    $ npm run dev

    # production
    $ npm start
    ```
