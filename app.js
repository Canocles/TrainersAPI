var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var auth = require('./middlewares/auth')

var entrenamientoController = require('./controllers/entrenamiento')
var usuarioController = require('./controllers/usuario')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/entrenamientos', entrenamientoController.getEntrenamientos)
app.get('/api/entrenamientos/:entrenamientoId', entrenamientoController.getEntrenamiento)
app.post('/api/entrenamientos', entrenamientoController.addEntrenamiento)
app.put('/api/entrenamientos/:entrenamientoId', entrenamientoController.updateEntrenamiento)
app.delete('/api/entrenamientos/:entrenamientoId', entrenamientoController.deleteEntrenamiento)

app.post('/api/signup', usuarioController.signUp)
app.post('/api/signin', auth, usuarioController.signIn)
app.get('/api/admin', auth, (req, res) => {
    res.status(200).send('Prueba')
})

module.exports = app