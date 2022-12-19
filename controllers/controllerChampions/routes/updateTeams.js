const express = require('express');
const route = express.Router();
const dbc = require('../../../DatabaseController')

const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")


route.post("/updateChampionsToTeams/:matchId", [
    body("team_1").not().isEmpty(),
    body("team_2").not().isEmpty(),
    body("*.champions").not().isEmpty().isArray(),
], async (req, res) => {

    // let created_at = Date()

    let matchId = req.params.matchId

    

    let value_team_1
    let value_team_2


    team_1 = req.body.team_1
    team_2 = req.body.team_2
    champions_team_1 = req.body.team_1.champions
    champions_team_2 = req.body.team_2.champions

    console.log(team_1)
    console.log(team_2)
    console.log(champions_team_1)
    console.log(champions_team_2)
    

    let arrayWithChampions = [...champions_team_1, ...champions_team_2]

    let numberOfChampions = arrayWithChampions.length

    console.log("WARTOŚCI: " + arrayWithChampions)

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

        if (current_status !== 'Oczekuje na podanie wyniku    TEST USUN') {

            let team_row = await dbc.get(db, "SELECT * FROM match WHERE id=?", matchId)

            value_team_1 = team_row['team_1_id']
            value_team_2 = team_row['team_2_id']

            console.log("Id teamu 1: " + value_team_1)
            console.log("Id teamu 2: " + value_team_2)



            ////////////////////////////////////////////////////////




                let this_1_team = await dbc.all(db, "SELECT * FROM team WHERE id = ?", [value_team_1])
                let this_2_team = await dbc.all(db, "SELECT * FROM team WHERE id = ?", [value_team_2])
          
                team_1 = this_1_team
                team_2 = this_2_team
        

                for (let index = 0; index < this_1_team.length; index++) {
        
                    let this_1_team_user = await dbc.all(db, "SELECT * FROM team_user WHERE team_id = ?", [this_1_team[index].id])
                    var team_users_1_Arr = []
                    for (let indexTeamUser_1 = 0; indexTeamUser_1 < this_1_team_user.length; indexTeamUser_1++) {
        
                      let currentUser_team_1 = await dbc.get(db, "SELECT id FROM user WHERE id = ?", [this_1_team_user[indexTeamUser_1].user_id])
        
                      team_users_1_Arr.push(currentUser_team_1.id)
                    }
                }   

                console.log("LISTA " + team_users_1_Arr)


                for (let index = 0; index < this_2_team.length; index++) {
        
                    let this_2_team_user = await dbc.all(db, "SELECT * FROM team_user WHERE team_id = ?", [this_2_team[index].id])
                    var team_users_2_Arr = []
                    for (let indexTeamUser_2 = 0; indexTeamUser_2 < this_2_team_user.length; indexTeamUser_2++) {
        
                      let currentUser_team_2 = await dbc.get(db, "SELECT id FROM user WHERE id = ?", [this_2_team_user[indexTeamUser_2].user_id])
        
                      team_users_2_Arr.push(currentUser_team_2.id)

                      console.log(currentUser_team_2.id)
                    }
                }   

                console.log("LISTA " + team_users_2_Arr)





            ////////////////////////////////////////////////////////


















            for (let index = 0; index < numberOfChampions; index++) {
                if (index < (numberOfChampions/2)) {
                    await dbc.run(db, `UPDATE team_user SET champion_id = ? WHERE user_id = ?`, [arrayWithChampions[index], team_users_1_Arr[index]])
                }
                else{
                    await dbc.run(db, `UPDATE team_user SET champion_id = ? WHERE team_id = ?`, [arrayWithChampions[index], team_users_2_Arr[index]])
                }
            }
   

            ////////////////////////////////////////////////////////



            inputData3 = ["Oczekuje na podanie wyniku", matchId]
            await dbc.run(db,`UPDATE match SET status = ? WHERE id = ?`,inputData3)

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