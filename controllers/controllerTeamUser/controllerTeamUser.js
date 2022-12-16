const express = require('express');

const controllerTeamUser = express.Router();

const post = require('./routes/post')

const get = require('./routes/get')








controllerTeamUser.use('/', post)

controllerTeamUser.use('/', get)



module.exports = controllerTeamUser;