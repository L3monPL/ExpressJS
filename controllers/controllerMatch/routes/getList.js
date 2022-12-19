const express = require('express');
const router = express.Router();
const dbc = require('../../../DatabaseController')


const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")
// const sql = "SELECT * FROM match"

// router.get("", (req, res, next) => {
//     db.all(sql, (err, rows) => {
//         console.log(rows)
//         if (err) {
//           res.sendStatus(500);
//         } else {
//           res.json(rows)
//         }
//       })
// })

let match_list
let team_1
let team_2
var OBJECT_TO_SHOW = [];
let currentObjectMatch

// let currentObjectTeam


router.get("", async (req, res, next) => {



  try {



    let match_rows = await dbc.all(db, "SELECT * FROM match", [])
    match_list = match_rows

    OBJECT_TO_SHOW = []
    for (let index = 0; index < match_list.length; index++) {

        let this_1_team = await dbc.all(db, "SELECT * FROM team WHERE id = ?", [match_list[index].team_1_id])
        let this_2_team = await dbc.all(db, "SELECT * FROM team WHERE id = ?", [match_list[index].team_2_id])
  
        team_1 = this_1_team
        team_2 = this_2_team

        console.log("This team 1: "+this_1_team)

        let currentObjectTeam_1

        if (this_1_team !== undefined) {
          for (let index = 0; index < this_1_team.length; index++) {

            let this_1_team_user = await dbc.all(db, "SELECT * FROM team_user WHERE team_id = ?", [this_1_team[index].id])
          
            currentObjectTeam_1 = {
              id: this_1_team[index].id,
              name: this_1_team[index].name,
              users: this_1_team_user,
              created_at: this_1_team[index].created_at
            }
          }
        }

        let currentObjectTeam_2

        if (this_2_team !== undefined) {
          for (let index = 0; index < this_2_team.length; index++) {

            let this_2_team_user = await dbc.all(db, "SELECT * FROM team_user WHERE team_id = ?", [this_2_team[index].id])
          
            currentObjectTeam_2 = {
              id: this_2_team[index].id,
              name: this_2_team[index].name,
              users: this_2_team_user,
              created_at: this_2_team[index].created_at
            }
          }
        }

      
        if (currentObjectTeam_1 == undefined) {
          currentObjectTeam_1 = null
        }
        if (currentObjectTeam_2 == undefined) {
          currentObjectTeam_2 = null
        }

  
        currentObjectMatch = {
          id: match_list[index].id,
          team_1: currentObjectTeam_1,
          team_2: currentObjectTeam_2,
          result: match_list[index].result,
          status: match_list[index].status,
          created_at: match_list[index].created_at,
          creator_user_id: match_list[index].creator_user_id
        }
  
        console.log("currentObjectMatch" + currentObjectMatch)
  
        
        OBJECT_TO_SHOW.push(currentObjectMatch)
  
      
    }


  } catch (error) {
    console.error(error)
    res.status(500).send("Ups! Coś poszło nie tak")
    return
  }

  console.log(OBJECT_TO_SHOW)

  res.json(OBJECT_TO_SHOW)
  // db.close()
  // OBJECT_TO_SHOW = []
})


module.exports = router;