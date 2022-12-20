const express = require('express');
const route = express.Router();
const dbc = require('../../../DatabaseController')

const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")

let match_list
let team_1
let team_2

route.put("/result/:matchId", [
    body("result").not().isEmpty()
], async (req, res) => {

    let matchId = req.params.matchId
    let result = req.body.result

  try {

    let match_rows = await dbc.all(db, "SELECT * FROM match WHERE id = ?", [matchId])
    match_list = match_rows
    let status_row = await dbc.get(db, 'SELECT * FROM match WHERE id = ?', [matchId])

    var current_status = status_row['status'] 

    for (let index = 0; index < match_list.length; index++) {

        let this_1_team = await dbc.all(db, "SELECT * FROM team WHERE id = ?", [match_list[index].team_1_id])
        let this_2_team = await dbc.all(db, "SELECT * FROM team WHERE id = ?", [match_list[index].team_2_id])
  
        team_1 = this_1_team
        team_2 = this_2_team

        if (this_1_team !== undefined) {
          for (let index = 0; index < this_1_team.length; index++) {

            let this_1_team_user = await dbc.all(db, "SELECT * FROM team_user WHERE team_id = ?", [this_1_team[index].id])

            var team_users_1_Arr = []
            for (let indexTeamUser_1 = 0; indexTeamUser_1 < this_1_team_user.length; indexTeamUser_1++) {

              let currentUser_team_1 = await dbc.all(db, "SELECT id, username FROM user WHERE id = ?", [this_1_team_user[indexTeamUser_1].user_id])
              
              for (let indexUser_1 = 0; indexUser_1 < currentUser_team_1.length; indexUser_1++) {
                
                let currentUserId = currentUser_team_1[indexUser_1].id

                console.log(currentUser_team_1)

                team_users_1_Arr.push(currentUserId)
              }
            }
          }
        }

        if (this_2_team !== undefined) {
          for (let index = 0; index < this_2_team.length; index++) {

            let this_2_team_user = await dbc.all(db, "SELECT * FROM team_user WHERE team_id = ?", [this_2_team[index].id])

            var team_users_2_Arr = []
            for (let indexTeamUser_2 = 0; indexTeamUser_2 < this_2_team_user.length; indexTeamUser_2++) {

              let currentUser_team_2 = await dbc.all(db, "SELECT id, username FROM user WHERE id = ?", [this_2_team_user[indexTeamUser_2].user_id])
              
              for (let indexUser_2 = 0; indexUser_2 < currentUser_team_2.length; indexUser_2++) {
                
                let currentUserId = currentUser_team_2[indexUser_2].id

                console.log(currentUser_team_2)

                team_users_2_Arr.push(currentUserId)
              }
            }
          }
        }

        console.log("Team 1 UsersIdArr " + team_users_1_Arr)
        console.log("Team 2 UsersIdArr " + team_users_2_Arr)   


        if (current_status == "Oczekuje na podanie wyniku") {
            if (result == "team1") {
                console.log("wygrywa team 1")
                for (let indexTeam_1 = 0; indexTeam_1 < team_users_1_Arr.length; indexTeam_1++) {
                    let currentUserWin = await dbc.get(db,`SELECT * FROM stats WHERE user_id = ?`,[team_users_1_Arr[indexTeam_1]])
                    let currentUserWinsStats = currentUserWin["wins"]
                    let currentUserWinId = currentUserWin["user_id"]
                    console.log(currentUserWinsStats)
                    await dbc.run(db,`UPDATE stats SET wins = ? WHERE user_id = ?`,[currentUserWinsStats + 1, currentUserWinId])
                }
                for (let indexTeam_2 = 0; indexTeam_2 < team_users_2_Arr.length; indexTeam_2++) {
                    let currentUserLost = await dbc.get(db,`SELECT * FROM stats WHERE user_id = ?`,[team_users_2_Arr[indexTeam_2]])
                    let currentUserLostStats = currentUserLost["lost"]
                    let currentUserLostId = currentUserLost["user_id"]
                    console.log(currentUserLostStats)
                    await dbc.run(db,`UPDATE stats SET lost = ? WHERE user_id = ?`,[currentUserLostStats + 1, currentUserLostId])
                }
                let input = ["TEAM 1", matchId]
                await dbc.run(db,`UPDATE match SET result = ? WHERE id = ?`,input)
    
            }
            else if (result == "team2") {
                console.log("wygrywa team 2")
                for (let indexTeam_1 = 0; indexTeam_1 < team_users_1_Arr.length; indexTeam_1++) {
                    let currentUserLost = await dbc.get(db,`SELECT * FROM stats WHERE user_id = ?`,[team_users_1_Arr[indexTeam_1]])
                    let currentUserLostStats = currentUserLost["lost"]
                    let currentUserLostId = currentUserLost["user_id"]
                    console.log(currentUserLostStats)
                    await dbc.run(db,`UPDATE stats SET lost = ? WHERE user_id = ?`,[currentUserLostStats + 1, currentUserLostId])
                }
                for (let indexTeam_2 = 0; indexTeam_2 < team_users_2_Arr.length; indexTeam_2++) {
                    let currentUserWin = await dbc.get(db,`SELECT * FROM stats WHERE user_id = ?`,[team_users_2_Arr[indexTeam_2]])
                    let currentUserWinsStats = currentUserWin["wins"]
                    let currentUserWinId = currentUserWin["user_id"]
                    console.log(currentUserWinsStats)
                    await dbc.run(db,`UPDATE stats SET wins = ? WHERE user_id = ?`,[currentUserWinsStats + 1, currentUserWinId])
                }
                let input = ["TEAM 2", matchId]
                await dbc.run(db,`UPDATE match SET result = ? WHERE id = ?`,input)
            }
    
            let inputData3 = ["Mecz zakończony", matchId]
            await dbc.run(db,`UPDATE match SET status = ? WHERE id = ?`,inputData3)
        } else {
            // res.send("Mecz zakończony")
        }

        

    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Ups! Coś poszło nie tak")
    return
  }
  res.json({"message": "success"})
})

module.exports = route;