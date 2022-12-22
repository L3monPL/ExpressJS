const express = require('express');

const controllerUser = express.Router();

const post = require('./routes/post')

const getList = require('./routes/getList')

const getMatchById = require('./routes/getMatchById')

const postResult = require('./routes/postResult')

const getListEndMatch = require('./routes/getListEndMatch')

const getCurrentLastMatch = require('./routes/getCurrentLastMatch')







controllerUser.use('/', post)

controllerUser.use('/', postResult)

controllerUser.use('/', getList)

controllerUser.use('/', getMatchById)

controllerUser.use('/', getListEndMatch)

controllerUser.use('/', getCurrentLastMatch)


module.exports = controllerUser;