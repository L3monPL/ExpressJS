const express = require('express');
const api = express.Router();

const controllerUser = require('./controllerUser/controllerUser')

api.use('/users', controllerUser)

module.exports = api;