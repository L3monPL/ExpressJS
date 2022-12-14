const express = require('express');
const route = express.Router();
// var md5 = require("md5")
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")



route.post("",(req, res, next) => {
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
    let data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    let sql = "INSERT INTO user (username, email, password) VALUES (?,?,?)"
    var params =[data.email, data.password, data.username]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})



module.exports = route;