const express = require('express');
const route = express.Router();

const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")



route.post("/create/:matchId", [
    body("name").isEmpty(),
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error(errors)
        return res.status(400).json("Niepoprawne dane")
    }

    let team = req.body

    let matchId = req.params.matchId

    
    let created_at = Date()

    let name_team_1 = 'Team BLUE'
    let name_team_2 = 'Team RED'

    let team_1
    let team_2

    console.log(team)

    console.log(matchId)

    try {
        await db.run(`INSERT INTO team (name,created_at) 
        VALUES (?,?)`, [name_team_1, created_at])

        await db.get("SELECT last_insert_rowid() as id", function (err, row) {
            team_1 =  row['id']
            console.log("Id teamu 1: " + team_1)
       })


        

        await db.run(`INSERT INTO team (name,created_at) 
            VALUES (?,?)`, [name_team_2, created_at])

        await db.get("SELECT last_insert_rowid() as id", function (err, row) {
            team_2 =  row['id']
            console.log("Id teamu 2: " + team_2)
       })
            


        }catch (err) {
            console.error(err)
            res.status(500).send("Ups! Coś poszło nie tak")
            return
    }





    


    // try {
    //     await db.run(`INSERT INTO team (name,created_at) 
    //     VALUES (?,?)`, [name_team_2, created_at])
    //     }catch (err) {
    //         console.error(err)
    //         res.status(500).send("Ups! Coś poszło nie tak")
    //         return
    //     }




    res.json({
        "message": "success",
        "data": matchId,
        "id" : this.lastID
    })


})



module.exports = route;