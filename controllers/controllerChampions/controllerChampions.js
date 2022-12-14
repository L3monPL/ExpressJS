const express = require('express');

const controllerChampions = express.Router();

const getList = require('./routes/getList')

const post = require('./routes/post')






controllerChampions.use('/', getList)

controllerChampions.use('/', post)


module.exports = controllerChampions;