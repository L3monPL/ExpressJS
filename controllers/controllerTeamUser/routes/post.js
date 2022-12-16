const express = require('express');
const route = express.Router();

const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")


route.post("/setUsers/3vs3/:matchId", [
    body("name").isEmpty(),
], async (req, res) => {

    let created_at = Date()

    let matchId = req.params.matchId

    let value_team_1


    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error(errors)
        return res.status(400).json("Niepoprawne dane")
    }


    try {


        // let idTeams = [matchId]
        console.log(matchId)
        await db.get("SELECT * FROM match WHERE id=?",matchId, function(err, row) {
            if (err) {
              return console.error(err.message);
            }
            value_team_1 = row['team_1_id']
            value_team_2 = row['team_2_id']
            console.log("Id teamu 1: " + value_team_1)
            console.log("Id teamu 2: " + value_team_2)
           
          })



        // await db.run(`INSERT INTO team_user (team_id,user_id,champion_id,created_at) 
        // VALUES (?,?)`, [team, created_at])
        
    } catch (error) {
        
    }
    res.json({
        "message": "success",
        "data": matchId,
        "id" : this.lastID
    })

})



module.exports = route;