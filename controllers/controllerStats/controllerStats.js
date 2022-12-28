const express = require('express');

const controllerStats = express.Router();

const getStatsFromCurrnetUser = require('./routes/getStatsFromCurrnetUser')

const getList = require('./routes/getList')

const getRanking = require('./routes/getRanking')








controllerStats.use('/', getStatsFromCurrnetUser)

controllerStats.use('/', getList)

controllerStats.use('/', getRanking)



module.exports = controllerStats;