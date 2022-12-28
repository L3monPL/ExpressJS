const express = require('express');
const router = express.Router();
const dbc = require('../../../DatabaseController')


const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")


router.get("/currentUser/:userId", async (req, res, next) => {

let userId = req.params.userId

  try {

    var currentUserStats = await dbc.get(db, 'SELECT * FROM stats WHERE user_id = ?', [userId])

    

  } catch (error) {
    console.error(error)
    res.status(500).send("Ups! Coś poszło nie tak")
    return
  }

  res.json(currentUserStats)

})


module.exports = router;