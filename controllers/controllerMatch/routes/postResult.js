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


        if (result == "team1") {
            console.log("wygrywa team 1")
            
        }
        else if (result == "team2") {
            console.log("wygrywa team 2")
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