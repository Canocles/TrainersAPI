var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log("API REST corriendo en http://localhost:" + port)
})