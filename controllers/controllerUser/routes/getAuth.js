const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const dbc = require('../../../DatabaseController')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")

const ACCESS_TOKEN = 'gfdssdff43f45f45fe3as45e4wfs656f45'


router.get("/auth/currentUser", async (req, res, next) => {


    try {

        var cookie = req.cookies['jwt']

        var claims = jwt.verify(cookie, ACCESS_TOKEN)

        if (!claims) {
            return res.status(401).send({message: 'unauthenticated'})
        }

        console.log(claims)

        var user = await dbc.get(db, 'SELECT id, username, email, created_at FROM user WHERE id = ?', [claims.id])
        
    } catch (error) {
        console.error(error)
        res.status(401).send("Ups! Coś poszło nie tak")
        return
    }

    res.json(user)
})




module.exports = router;