const express = require('express');
const route = express.Router();
const dbc = require('../../../DatabaseController')

const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3").verbose()
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

    var team_1
    var team_2


    var inputData1
    var inputData2
    var inputData3

    let current_status

    try {

        let status_row = await dbc.get(db, 'SELECT * FROM match WHERE id = ?', [matchId])
        current_status = status_row['status']        

        // console.log(current_status)


        if (current_status !== 'Oczekuje na dodanie graczy') {
            //TEAM 1
            await dbc.run(db, 'INSERT INTO team (name,created_at) VALUES (?,?)', [name_team_1, created_at])
            let row = await dbc.get(db, 'SELECT last_insert_rowid() as id', [])
            team_1 = row['id']
            inputData1 = [team_1, matchId]
            console.log(inputData1)
            await dbc.run(db,`UPDATE match SET team_1_id = ? WHERE id = ?`,inputData1)
            console.log[team_1]

            //TEAM 2
            await dbc.run(db, 'INSERT INTO team (name,created_at) VALUES (?,?)', [name_team_2, created_at])
            let row2 = await dbc.get(db, 'SELECT last_insert_rowid() as id', [])
            team_2 = row2['id']
            inputData2 = [team_2, matchId]
            console.log(inputData2)
            await dbc.run(db,`UPDATE match SET team_2_id = ? WHERE id = ?`,inputData2)
            inputData3 = ["Oczekuje na dodanie graczy", matchId]
            await dbc.run(db,`UPDATE match SET status = ? WHERE id = ?`,inputData3)
        }
        else{
            
        }

        


    }catch (err) {
        console.error(err)
        res.status(500).send("Ups! Coś poszło nie tak")
        return
    }

    res.json({
        "message": "success",
        "data": matchId,
        "id" : this.lastID
    })
    // db.close()
})



module.exports = route;