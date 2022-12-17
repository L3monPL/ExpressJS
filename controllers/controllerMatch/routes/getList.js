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


router.get("", async (req, res, next) => {



  try {



    let match_rows = await dbc.all(db, "SELECT * FROM match", [])
    match_list = match_rows

    match_list.forEach(async(row)=>{
      

      try {
        //wydaje mi się że tutaj sql do szukanie id teamu 
      let this_1_team = await dbc.get(db, "SELECT * FROM team WHERE id = ?", [row.team_1_id])
      let this_2_team = await dbc.get(db, "SELECT * FROM team WHERE id = ?", [row.team_2_id])

      team_1 = this_1_team
      team_2 = this_2_team

      currentObjectMatch = {
        id: row.id,
        team_1_id: team_1,
        team_2_id: team_2,
        result: row.result,
        status: row.status,
        created_at: row.created_at,
        creator_user_id: row.creator_user_id
      }

      console.log("currentObjectMatch" + currentObjectMatch)

      
      OBJECT_TO_SHOW.push(currentObjectMatch)

        
      } catch (error) {
        
      }



      
   });


  } catch (error) {
    console.error(err)
    res.status(500).send("Ups! Coś poszło nie tak")
    return
  }

  console.log(OBJECT_TO_SHOW)

  res.json(OBJECT_TO_SHOW)
  // db.close()
  OBJECT_TO_SHOW = []
})


module.exports = router;