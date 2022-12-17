const express = require('express');
const router = express.Router();
const dbc = require('../../../DatabaseController')


const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")
const sql = "SELECT * FROM match"

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

router.get("", async (req, res, next) => {

  try {

    let match_rows = await dbc.all(db, "SELECT * FROM match", [])
    match_list = match_rows



  } catch (error) {
    console.error(err)
    res.status(500).send("Ups! Coś poszło nie tak")
    return
  }
  res.json(match_list)

})


module.exports = router;