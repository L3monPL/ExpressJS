const express = require('express')
const bodyParser = require('body-parser')


const PagesController = require('./controllers/PagesController')

const app = express()
app.use(bodyParser.text())
app.use(bodyParser.json())

app.use('/api', PagesController)

// let routes = require('./routes.js')
// routes(app)

app.listen(8080, function(){
    console.log('Listening!')
})