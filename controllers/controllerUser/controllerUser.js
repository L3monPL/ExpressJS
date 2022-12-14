const express = require('express');

const controllerUser = express.Router();

const post = require('./routes/post')

const getList = require('./routes/getList')

const getUserById = require('./routes/getUserById')

controllerUser.use('/', post)

controllerUser.use('/', getList)

controllerUser.use('/', getUserById)

module.exports = controllerUser;