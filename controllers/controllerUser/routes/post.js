const express = require('express');
const route = express.Router();
// var md5 = require("md5")
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")
const dbc = require('../../../DatabaseController')




route.post("", async(req, res, next) => {
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
    let data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        created_at: created_at
    }

    try {

        let params =[data.username, data.email, data.password, data.created_at]
        await dbc.run(db, "INSERT INTO user (username, email, password, created_at) VALUES (?,?,?,?)", params )
        
        let lastUserAdded = await dbc.get(db,"SELECT last_insert_rowid() as id")

        let userId = lastUserAdded["id"]

        console.log(userId)

        let paramsStats = [userId, 0, 0]

        await dbc.run(db, "INSERT INTO stats (user_id, wins, lost) VALUES (?,?,?)", paramsStats )


    } catch (error) {
        res.status(400).json({"error": error.message})
        return;
    }
        res.json({
            "message": "success"
        })
    });




module.exports = route;