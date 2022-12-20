const { application } = require('express');
const express = require('express');
const api = express.Router();
const morgan = require('morgan')

const controllerUser = require('./controllerUser/controllerUser')

const controllerChampions = require('./controllerChampions/controllerChampions')

const controllerMatch = require('./controllerMatch/controllerMatch')

const controllerTeam = require('./controllerTeam/controllerTeam')

const controllerTeamUser = require('./controllerTeamUser/controllerTeamUser')

const controllerStats = require('./controllerStats/controllerStats')



api.use(morgan('dev'))

// Main Route
api.use('/user', controllerUser)

api.use('/champion', controllerChampions)

api.use('/match', controllerMatch)

api.use('/team', controllerTeam)

api.use('/teamUser', controllerTeamUser)

api.use('/stats', controllerStats)

module.exports = api;