const { application } = require('express');
const express = require('express');
const api = express.Router();
const morgan = require('morgan')

const controllerUser = require('./controllerUser/controllerUser')

const controllerChampions = require('./controllerChampions/controllerChampions')

const controllerMatch = require('./controllerMatch/controllerMatch')

api.use(morgan('dev'))

// Main Route
api.use('/user', controllerUser)

api.use('/champion', controllerChampions)

api.use('/match', controllerMatch)

module.exports = api;