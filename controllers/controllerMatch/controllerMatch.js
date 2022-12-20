const express = require('express');

const controllerUser = express.Router();

const post = require('./routes/post')

const getList = require('./routes/getList')

const getMatchById = require('./routes/getMatchById')







controllerUser.use('/', post)

controllerUser.use('/', getList)

controllerUser.use('/', getMatchById)


module.exports = controllerUser;