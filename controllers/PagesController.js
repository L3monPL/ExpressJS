const express = require('express');
const api = express.Router();

const controllerUser = require('./controllerUser/controllerUser')

api.use('/user', controllerUser)

module.exports = api;