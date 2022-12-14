const { application } = require('express');
const express = require('express');
const api = express.Router();
const morgan = require('morgan')

const controllerUser = require('./controllerUser/controllerUser')

api.use(morgan('dev'))

// Main Route
api.use('/user', controllerUser)

module.exports = api;