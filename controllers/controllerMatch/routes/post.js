const express = require('express');
const route = express.Router();

const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")



route.post("/update", [
    body("*.userId").not().isEmpty(),
    body("*.result").not().isEmpty(),
    body("*.championId").not().isEmpty(),
    body().isArray(),
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error(errors)
        return res.status(400).json("Niepoprawne dane")
    }

    let match = req.body
    console.log(match)

    let sql = "INSERT INTO match (list) VALUES (?)"
    db.run(sql, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            list: match,
        })
    });
})



module.exports = route;