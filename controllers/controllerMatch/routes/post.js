const express = require('express');
const route = express.Router();
const dbc = require('../../../DatabaseController')
const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")



route.post("/create", [
    body("team_1_id").isEmpty(),
    body("team_2_id").isEmpty(),
    body("result").isEmpty(),
    body("status").isEmpty(),
    body("creator_user_id").not().isEmpty(),
], async (req, res) => {

    let match_rows = await dbc.all(db, "SELECT * FROM match WHERE status != ?", ["Mecz zakończony"])

    console.log(match_rows)
    if (match_rows) {
        res.status(405).json("Nie można rozpocząć kolejnego meczu gdy poprzedni nie został zakończony")
        return
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error(errors)
        return res.status(400).json("Niepoprawne dane")
    }

    let match = req.body

    var team_1_id = null
    let team_2_id = null
    let result = null
    let status = 'utworzono mecz'
    let creator_user_id = req.body.creator_user_id
    let created_at = Date()

    console.log(match)

    try {
    await db.run(`INSERT INTO match (team_1_id,team_2_id,result,status,created_at,creator_user_id) 
    VALUES (?,?,?,?,?,?)`, [team_1_id, team_2_id, result, status, created_at, creator_user_id])
    }catch (err) {
        console.error(err)
        res.status(500).send("Ups! Coś poszło nie tak")
        return
    }
    res.json({
        "message": "success",
        "data": match,
        "id" : this.lastID
    })

    // let sql = `INSERT INTO match (team_1_id,team_2_id,result,status,created_at,creator_user_id) 
    // VALUES ($1,?,?,?,?,?)`
    // db.run(function (err, result) {
    //     if (err){
    //         res.json({"error": err.message})
    //         return;
    //     }
    //     res.json({
    //         match: match,
    //     })
    // });
    // res.status(200).send()
})



module.exports = route;