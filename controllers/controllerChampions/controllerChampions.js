const express = require('express');

const controllerChampions = express.Router();

const getList = require('./routes/getList')

const post = require('./routes/post')

const getImageList = require('./routes/getImageList')

const updateChampionsToTeams = require('./routes/updateTeams')






controllerChampions.use('/', getList)

controllerChampions.use('/', post)

controllerChampions.use('/', getImageList)

controllerChampions.use('/', updateChampionsToTeams)


module.exports = controllerChampions;