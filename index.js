var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/api/usuarios', (req, res) => {
    res.status(200)
    res.send({ usuarios: [] })
})

app.get('/api/usuarios/:id', (req, res) => {

})

app.post('/api/usuarios', (req, res) => {
    console.log(req.body)
    res.status(200)
    res.send(req.body)
})

app.put('/api/usuarios/:id', (req, res) => {

})

app.delete('/api/usuarios/:id', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/trainnersAPI', (err, res) => {
    if (err)
        return console.log(`Error al conectar a la base de datos: ${err}`)
    console.log("COnexión a la base de datos establecida...")

    app.listen(port, () => {
        console.log("API REST corriendo en http://localhost:" + port)
    })
})