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
        var team_1 = await dbc.all(db, "SELECT * FROM team WHERE id = ?", [match_rows[index].team_1_id])    
        var team_2 = await dbc.all(db, "SELECT * FROM team WHERE id = ?", [match_rows[index].team_2_id])

        //////////////////////////////////
        // let teamsObj = {
        //     team_1: team_1,
        //     team_2: team_2
        // }

        // teamsArr.push(teamsObj)
        //////////////////////////////////


        for (let indexTeamUser = 0; indexTeamUser < team_1.length; indexTeamUser++) {
            console.log("test" + indexTeamUser)

            var team_1_user = await dbc.all(db, "SELECT champion_id FROM team_user WHERE team_id = ?", [team_1[indexTeamUser].id])
            var team_2_user = await dbc.all(db, "SELECT champion_id FROM team_user WHERE team_id = ?", [team_2[indexTeamUser].id])

            
            //////////////////////////////////
            // let teamsObj = {
            //     team_1: team_1_user,
            //     team_2: team_2_user
            // }
    
            // teamsArr.push(teamsObj)
            //////////////////////////////////
            var arrChamp_team_1 = []
            var arrChamp_team_2 = []

            for (let indexChampion = 0; indexChampion < team_1_user.length; indexChampion++) {
                
                var currentUserChampion_team_1 = await dbc.get(db, "SELECT * FROM champion WHERE id = ?", [team_1_user[indexChampion].champion_id])
                var currentUserChampion_team_2 = await dbc.get(db, "SELECT * FROM champion WHERE id = ?", [team_2_user[indexChampion].champion_id])

                // var currentChampion = {

                // }
                // let teamsObj = {
                //     team_1: team_1_user,
                //     test: currentUserChampion,
                //     team_2: team_2_user
                // }
        
                // teamsArr.push(teamsObj)
                

                arrChamp_team_1.push(currentUserChampion_team_1)
                arrChamp_team_2.push(currentUserChampion_team_2)

            }

            //////////////////////////////////
            let teamsObj = {
                team_1: arrChamp_team_1,
                team_2: arrChamp_team_2
            }
    
            teamsArr.push(teamsObj)
            //////////////////////////////////
        }

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