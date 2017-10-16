var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var entrenamientoController = require('./controllers/entrenamiento')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/entrenamientos', entrenamientoController.getEntrenamientos)
app.get('/api/entrenamientos/:entrenamientoId', entrenamientoController.getEntrenamiento)
app.post('/api/entrenamientos', entrenamientoController.addEntrenamiento)
app.put('/api/entrenamientos/:entrenamientoId', entrenamientoController.updateEntrenamiento)
app.delete('/api/entrenamientos/:entrenamientoId', entrenamientoController.deleteEntrenamiento)

module.exports = app