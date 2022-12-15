const express = require('express');

const controllerTeam = express.Router();

const post = require('./routes/post')

const getList = require('./routes/getList')








controllerTeam.use('/', post)

controllerTeam.use('/', getList)



module.exports = controllerTeam;