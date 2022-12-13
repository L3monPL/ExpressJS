const express = require('express');

const controllerUser = express.Router();

const post = require('./routes/post')

const getList = require('./routes/getList')

controllerUser.use('/', post)

controllerUser.use('/', getList)

module.exports = controllerUser;