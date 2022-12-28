const express = require('express');
const router = express.Router();
const dbc = require('../../../DatabaseController')


const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")



router.get("/pickedList/:lastMatches", async (req, res, next) => {

    let lastMatches = req.params.lastMatches

    var teamsArr = []

  try {

    var match_rows = await dbc.all(db, "SELECT * FROM match WHERE status = ? ORDER BY id DESC LIMIT ?", ["Mecz zakończony", lastMatches])

    for (let index = 0; index < match_rows.length; index++) {
        var team_1 = await dbc.get(db, "SELECT * FROM team WHERE id = ?", [match_rows[index].team_1_id])    
        var team_2 = await dbc.get(db, "SELECT * FROM team WHERE id = ?", [match_rows[index].team_2_id])

        let teamsObj = {
            team_1: team_1,
            team_2: team_2
        }

        teamsArr.push(teamsObj)
    }
    
    
      
    

  } catch (error) {
    console.error(error)
    res.status(500).send("Ups! Coś poszło nie tak")
    return
  }

//   console.log(OBJECT_TO_SHOW)

  res.json(teamsArr)

})


module.exports = router;