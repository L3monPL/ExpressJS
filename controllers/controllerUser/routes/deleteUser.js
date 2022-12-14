const express = require('express');
const router = express.Router();

const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")
const sql = "DELETE FROM user WHERE id = ?"

router.delete("/:id", (req, res, next) => {
    db.run(sql,
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})



module.exports = router;