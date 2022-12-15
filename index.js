const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message)

    console.log("Connected to database!")
})


// const sql = 'INSERT INTO user (username, password, email)  VALUES(?,?,?)'

// db.run(sql,["testowy@gmail.com", "admin123", "L3mon", 1], (err) => {
//     if(err) return console.error(err.message)

//     console.log("A new row has been created")
// })


// const sql = 'SELECT * FROM user'

// db.all(sql, [], (err, rows) => {
//     if(err) return console.error(err.message)

//     rows.forEach((row) => {
//         console.log(row)
//     });
// })

// db.run(
//     'DROP TABLE champion'
// )

// db.run(`CREATE TABLE user (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name text, 
//     email text UNIQUE, 
//     password text, 
//     created_at text,
//     CONSTRAINT email_unique UNIQUE (email)
//     )`,
//     (err) => {
//     if (err) {
//         console.log("A table has been created")
//     }
// })

// db.run(`CREATE TABLE champion (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name text, 
//     image text,
//     created_at text,
//     CONSTRAINT name_unique UNIQUE (name)
//     )`,
//     (err) => {
//     if (err) {
//         console.log("A table has been created")
//     }
// })


// db.run(
//     'DROP TABLE match'
// )


// db.run(`CREATE TABLE match (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     team_1_id text,
//     team_2_id text,
//     result text,
//     status text,
//     created_at text,
//     creator_user_id INTEGER
//     )`,
//     (err) => {
//     if (err) {
//         console.log("A table has been created")
//     }
// })


// db.run(`CREATE TABLE team (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     user_id INTEGER,
//     champion_id INTEGER,
//     created_at text
//     )`,
//     (err) => {
//     if (err) {
//         console.log("A table has been created")
//     }
// })

// db.close((err) => {
//     if (err) {
//         return console.error(err.message)
//     }
// })

const PagesController = require('./controllers/PagesController')

app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use("/api", PagesController)

app.listen(8080, function(){
    console.log('Listening at port: 8080')
})




//  /api/user
//  /api/champion
//  /api/champion/image
//  /api/match
//  /api/