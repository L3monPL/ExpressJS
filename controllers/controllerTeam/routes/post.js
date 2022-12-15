const express = require('express');
const route = express.Router();

const { param, body, validationResult } = require('express-validator')
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.db")



route.post("/create/:matchId", [
    body("name").isEmpty(),
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error(errors)
        return res.status(400).json("Niepoprawne dane")
    }

    let team = req.body

    let matchId = req.params.matchId

    
    let created_at = Date()

    let name_team_1 = 'Team BLUE'
    let name_team_2 = 'Team RED'

    let team_1
    let team_2

    console.log(team)

    console.log(matchId)

    try {
        await db.run(`INSERT INTO team (name,created_at) 
        VALUES (?,?)`, [name_team_1, created_at])

        try {
            await db.get("SELECT last_insert_rowid() as id", function (err, row) {
                team_1 =  row['id']
                console.log("Id teamu 1: " + team_1)
    
                var inputData1 = [team_1, matchId]
    
                db.run(`UPDATE match SET team_1_id = ? WHERE id = ?`,inputData1, function(err) {
                    if (err) {
                      return console.error(err.message);
                    }
                    console.log(`Row(s) updated: ${this.changes}`);
                  
                  })
           })
        } catch (error) {
            
        }
       


        

        await db.run(`INSERT INTO team (name,created_at) 
            VALUES (?,?)`, [name_team_2, created_at])
            try {
                await db.get("SELECT last_insert_rowid() as id", function (err, row) {
                    team_2 =  row['id']
                    console.log("Id teamu 2: " + team_2)
                    
        
                    var inputData2 = [team_2, matchId]
        
                    db.run(`UPDATE match SET team_2_id = ? WHERE id = ?`,inputData2, function(err) {
                        if (err) {
                          return console.error(err.message);
                        }
                        console.log(`Row(s) updated: ${this.changes}`);
                      
                      })
               })
            } catch (error) {
                
            }

        
            


        }catch (err) {
            console.error(err)
            res.status(500).send("Ups! Coś poszło nie tak")
            return
    }





    


    // try {
    //     await db.run(`INSERT INTO team (name,created_at) 
    //     VALUES (?,?)`, [name_team_2, created_at])
    //     }catch (err) {
    //         console.error(err)
    //         res.status(500).send("Ups! Coś poszło nie tak")
    //         return
    //     }




    res.json({
        "message": "success",
        "data": matchId,
        "id" : this.lastID
    })


})



module.exports = route;