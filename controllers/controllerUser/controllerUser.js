const express = require('express');

const controllerUser = express.Router();

const post = require('./routes/post')

const getList = require('./routes/getList')

const getUserById = require('./routes/getUserById')

const deleteUser = require('./routes/deleteUser')

const login = require('./routes/login')

const getAuth = require('./routes/getAuth')





controllerUser.use('/', post)

controllerUser.use('/', getList)

controllerUser.use('/', getUserById)

controllerUser.use('/', deleteUser)

controllerUser.use('/', login)

controllerUser.use('/', getAuth)

module.exports = controllerUser;