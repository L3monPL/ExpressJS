const express = require('express');
const router = express.Router();

const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")
const sql = "select * from user where id = ?"

router.get("/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
})



module.exports = router;