var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var auth = require('./middlewares/auth')

var entrenamientoController = require('./controllers/entrenamiento')
var usuarioController = require('./controllers/usuario')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/usuarios/:usuarioId/entrenamientos', auth, entrenamientoController.getEntrenamientos)
app.get('/usuarios/:usuarioId/entrenamientos/:entrenamientoId', auth, entrenamientoController.getEntrenamiento)
app.post('/usuarios/:usuarioId/entrenamientos', auth, entrenamientoController.addEntrenamiento)
app.put('/usuarios/:usuarioId/entrenamientos/:entrenamientoId', auth, entrenamientoController.updateEntrenamiento)
app.delete('/usuarios/:usuarioId/entrenamientos/:entrenamientoId', auth, entrenamientoController.deleteEntrenamiento)

app.post('/registro', usuarioController.signUp)
app.post('/login', usuarioController.signIn)
app.get('/usuarios', auth, usuarioController.getUsuarios)
app.get('/usuarios/:usuarioId', auth, usuarioController.getUsuario)

module.exports = app