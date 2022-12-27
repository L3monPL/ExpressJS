const express = require('express');
const router = express.Router();

const dbc = require('../../../DatabaseController')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")


router.get("/auth/currentUser", async (req, res, next) => {


    try {

        var cookie = req.cookies['jwt']
        
    } catch (error) {
        console.error(error)
        res.status(500).send("Ups! Coś poszło nie tak")
        return
    }

    res.json(cookie)
})




module.exports = router;