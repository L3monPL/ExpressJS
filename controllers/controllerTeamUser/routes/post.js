const express = require('express');
const route = express.Router();
const dbc = require('../../../DatabaseController')

const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")


route.post("/setUsers/:numberOfPlayers/:matchId", [
    body("team_1").not().isEmpty(),
    body("team_2").not().isEmpty(),
    body("*.users").not().isEmpty().isArray()
], async (req, res) => {

    let created_at = Date()

    let matchId = req.params.matchId

    let numberOfPlayers = req.params.numberOfPlayers

    let value_team_1
    let value_team_2


    team_1 = req.body.team_1
    team_2 = req.body.team_2
    users_team_1 = req.body.team_1.users
    users_team_2 = req.body.team_2.users

    console.log(team_1)
    console.log(team_2)
    console.log(users_team_1)
    console.log(users_team_2)

    let arrayWithUsers = [...users_team_1, ...users_team_2]

    console.log(arrayWithUsers)

    let current_status

    let inputData3

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error(errors)
        return res.status(400).json("Niepoprawne dane")
    }


    try {

        let status_row = await dbc.get(db, 'SELECT * FROM match WHERE id = ?', [matchId])
        current_status = status_row['status'] 
        
        console.log(current_status)

        if (current_status !== 'Oczekuje na dodanie postaci') {
            let team_row = await dbc.get(db, "SELECT * FROM match WHERE id=?", matchId)

            value_team_1 = team_row['team_1_id']
            value_team_2 = team_row['team_2_id']

            console.log("Id teamu 1: " + value_team_1)
            console.log("Id teamu 2: " + value_team_2)


            for (let index = 0; index < numberOfPlayers; index++) {
                if (index < (numberOfPlayers/2)) {
                    await dbc.run(db, `INSERT INTO team_user (team_id,user_id,champion_id,created_at) 
                        VALUES (?,?,?,?)`, [value_team_1, arrayWithUsers[index], null, created_at])
                }
                else{
                    await dbc.run(db, `INSERT INTO team_user (team_id,user_id,champion_id,created_at) 
                        VALUES (?,?,?,?)`, [value_team_2, arrayWithUsers[index], null, created_at])
                }
            }

            console.log('test -1')
            // await dbc.run(db, `INSERT INTO team_user (team_id,user_id,champion_id,created_at) 
            // VALUES (?,?)`, [team, created_at])
            console.log('test 0')

            console.log('test 1')
            inputData3 = ["Oczekuje na dodanie postaci", matchId]
            await dbc.run(db,`UPDATE match SET status = ? WHERE id = ?`,inputData3)
            console.log('test 2')
        }
        else{

        }

        


        
    } catch (error) {
        
    }
    res.json({
        "message": "success",
        "data": matchId,
        "id" : this.lastID
    })

})



module.exports = route;