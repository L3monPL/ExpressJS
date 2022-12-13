const express = require('express');

const controllerUser = express.Router();

const post = require('./routes/post')

const getList = require('./routes/getList')

controllerUser.use('v1', post)

controllerUser.use('v1', getList)

module.exports = controllerUser;