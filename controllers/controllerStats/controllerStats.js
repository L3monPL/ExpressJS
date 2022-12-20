const express = require('express');

const controllerStats = express.Router();

// const post = require('./routes/post')

const getList = require('./routes/getList')








// controllerTeam.use('/', post)

controllerStats.use('/', getList)



module.exports = controllerStats;