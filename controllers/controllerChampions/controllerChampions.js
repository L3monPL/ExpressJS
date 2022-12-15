const express = require('express');

const controllerChampions = express.Router();

const getList = require('./routes/getList')

const post = require('./routes/post')

const getImageList = require('./routes/getImageList')






controllerChampions.use('/', getList)

controllerChampions.use('/', post)

controllerChampions.use('/', getImageList)


module.exports = controllerChampions;