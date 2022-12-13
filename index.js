const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PagesController = require('./controllers/PagesController')

const userRoute = require('./controllers/controllerUser/routes/getList')


app.use(bodyParser.text())
app.use(bodyParser.json())

app.use("/api", PagesController)
// app.use("/user", userRoute)

// let routes = require('./routes.js')
// routes(app)

app.listen(8080, function(){
    console.log('Listening!')
})