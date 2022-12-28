const express = require('express');
const router = express.Router();
const dbc = require('../../../DatabaseController')


const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")


router.get("/ranking", async (req, res, next) => {

    let currentRankingUser
    let rankingListArr = []


  try {

    var rankingList = await dbc.all(db, 'SELECT * FROM stats ORDER BY wins DESC')

    for (let index = 0; index < rankingList.length; index++) {
        
        let currentUserStats = await dbc.get(db, 'SELECT username FROM user WHERE id = ?',[rankingList[index].user_id])

        currentRankingUser = {
            id: rankingList[index].id,
            wins: rankingList[index].wins,
            lost: rankingList[index].lost,
            user: currentUserStats
        }
        rankingListArr.push(currentRankingUser)
    }
    

  } catch (error) {
    console.error(error)
    res.status(500).send("Ups! Coś poszło nie tak")
    return
  }

  res.json(rankingListArr)

})


module.exports = router;