require('dotenv').config();
const express = require('express');
const { checkSchema } = require('express-validator');
const configureDB = require('./config/db');
const userRegisterValidationSchema = require('./app/validation/user-register-validation');
const userLoginValidationSchema = require('./app/validation/user-login-validation');
const usersCltr = require('./app/controllers/users-cltr')
const TaskCltr= require('./app/controllers/task-cltr')
const authenticateUser =require('./app/middlewares/authenticateUser')
// Initialize Express app
const app = express();
const port = 7000;

// Configure database
configureDB();

// Middleware to parse JSON requests
app.use(express.json());

app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register);
app.post('/users/login',checkSchema(userLoginValidationSchema),usersCltr.login)

app.get('/users/account',authenticateUser,usersCltr.account)

app.post('/api/task/create',authenticateUser,TaskCltr.create)
app.get('/api/task/show',authenticateUser,TaskCltr.show)
app.put('/api/task/update',authenticateUser,TaskCltr.update)
app.delete('/api/task/delete',authenticateUser,TaskCltr.delete)

// Start the server
app.listen(port, () => {
    console.log('Server running on port', port);
});
