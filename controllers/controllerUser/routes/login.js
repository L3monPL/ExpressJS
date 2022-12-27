const jwt = require('jsonwebtoken');
const express = require('express');
const route = express.Router();
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")
const dbc = require('../../../DatabaseController')
const { param, body, validationResult } = require('express-validator')


const ACCESS_TOKEN = 'gfdssdff43f45f45fe3as45e4wfs656f45'


route.post("/login", [
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
],async(req, res, next) => {
    var errors = []
    if (!req.body.password) {
        errors.push("Nie podano hasła")
    }
    if (!req.body.email) {
        errors.push("Nie podano maila")
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")})
        return
    }
    let created_at = Date()
    let body = {
        email: req.body.email,
        password: req.body.password,
    }

    try {

        var currentUserLoginEmail = await dbc.get(db, 'SELECT email FROM user WHERE email = ?', [body.email])
        var currentUserEmail = currentUserLoginEmail['email']

    } catch (error) {
        res.status(401).json("Podany adres Email nie istnieje")
        return;
    }
    try {
        var currentUserLoginPassword = await dbc.get(db, 'SELECT password, username, id FROM user WHERE password = ?', [body.password])
        var currentUserID = currentUserLoginPassword['id']
        var currentUserName = currentUserLoginPassword['username']
    } catch (error) {
        res.status(401).json("Błędne hasło")
        return;
    }

    try {
        let payload = {
            "id": currentUserID,
            "username": currentUserName,
            "currentUserEmail": currentUserEmail
        }

        var token = jwt.sign(payload, ACCESS_TOKEN)
    } catch (error) {
        console.error(error)
        res.status(500).send("Ups! Coś poszło nie tak")
        return
    }
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 10000000000000
        })
        res.json({ token })
    });




module.exports = route;