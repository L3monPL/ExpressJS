const express = require('express');
const route = express.Router();
// var md5 = require("md5")
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")



route.post("",(req, res, next) => {
    var errors = []
    if (!req.body.name) {
        errors.push("Nie podano postaci")
    }
    if (!req.body.image) {
        errors.push("Nie dodano obrazka")
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")})
        return
    }
    let data = {
        name: req.body.name,
        image: req.body.image,
        created_at: Date()
    }
    let sql = "INSERT INTO champion (name, image, created_at) VALUES (?,?,?)"
    var params =[data.name, data.image, data.created_at]
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