const express = require('express');
const route = express.Router();
const { body, validationResult } = require('express-validator')


route.post("/"),[
    body('email').isString().not().isEmpty(),
    body('password').isString().not().isEmpty(),
]   ,async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors)
            res.status(400).send("Niepoprawne dane")
            return
        }
        try{
            
        }catch (e) {
            console.error(e)
            res.status(500).send("Problem z bazą 1")
            return
        }
        try{
            res.status(200).send()
        }catch (er) {
            // await db.query('ROLLBACK')
            console.error(er)
            res.status(500).send("Problem z bazą 2")
            return
        }
}



module.exports = route;