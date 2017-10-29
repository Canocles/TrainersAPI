var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var auth = require('./middlewares/auth')

var entrenamientoController = require('./controllers/entrenamiento')
var usuarioController = require('./controllers/usuario')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/usuarios/:usuarioId/entrenamientos', auth, entrenamientoController.getEntrenamientos)
app.get('/api/usuarios/:usuarioId/entrenamientos/:entrenamientoId', auth, entrenamientoController.getEntrenamiento)
app.post('/api/usuarios/:usuarioId/entrenamientos', auth, entrenamientoController.addEntrenamiento)
app.put('/api/usuarios/:usuarioId/entrenamientos/:entrenamientoId', auth, entrenamientoController.updateEntrenamiento)
app.delete('/api/usuarios/:usuarioId/entrenamientos/:entrenamientoId', auth, entrenamientoController.deleteEntrenamiento)

app.post('/api/signup', usuarioController.signUp)
app.post('/api/signin', usuarioController.signIn)
app.get('/api/admin', auth, usuarioController.getUsuario)

module.exports = app