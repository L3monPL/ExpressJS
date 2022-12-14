const express = require('express');
const router = express.Router();

const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")
const sql = "SELECT * FROM match"

router.get("", (req, res, next) => {
    db.all(sql, (err, rows) => {
        console.log(rows)
        if (err) {
          res.sendStatus(500);
        } else {
          res.json(rows)
        }
      })
})


module.exports = router;