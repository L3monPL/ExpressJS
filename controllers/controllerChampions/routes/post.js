const express = require('express');
const route = express.Router();
// var md5 = require("md5")
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")



route.post("",(req, res, next) => {
    var errors = []
    if (!req.body.championName) {
        errors.push("Nie podano postaci")
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")})
        return
    }
    let data = {
        championName: req.body.championName,
    }
    let sql = "INSERT INTO champions (championName) VALUES (?)"
    var params =[data.championName]
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