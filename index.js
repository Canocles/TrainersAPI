var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var Entrenamiento = require('./models/entrenamiento')

var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/entrenamientos', (req, res) => {
    Entrenamiento.find({}, (err, entrenamientos) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!entrenamientos) return res.status(404).send({ message: 'No existen entrenamientos'})

        return res.status(200).send({ entrenamientos })
    })
})

app.get('/api/entrenamientos/:entrenamientoId', (req, res) => {
    var entrenamientoId = req.params.entrenamientoId

    Entrenamiento.findById(entrenamientoId, (err, entrenamiento) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!entrenamiento) return res.status(404).send({ message: 'El entrenamiento no existe'})

        return res.status(200).send({ entrenamiento })
    })
})

app.post('/api/entrenamientos', (req, res) => {
    console.log('POST /api/entrenamientos')
    console.log(req.body)

    var entrenamiento = new Entrenamiento()
    entrenamiento.nombre = req.body.nombre
    entrenamiento.descripcion = req.body.descripcion
    entrenamiento.dificultad = req.body.dificultad

    entrenamiento.save((err, entrenamientoStored) => {
    if (err) res.status(500).send({ message: 'Error al guardar en la base de detos' })

    res.status(201).send({ entrenamiento: entrenamientoStored })
    })
})

app.put('/api/entrenamientos/:entrenamientoId', (req, res) => {
    var entrenamientoId = req.params.entrenamientoId
    var update = req.body

    Entrenamiento.findByIdAndUpdate(entrenamientoId, update, (err, entrenamientoUpdate) => {
        if (err) return res.status(500).send({ message: 'No existe el entrenamiento'})

        return res.status(200).send({ entrenamiento: entrenamientoUpdate })
    })
})

app.delete('/api/entrenamientos/:entrenamientoId', (req, res) => {
    var entrenamientoId = req.params.entrenamientoId

    Entrenamiento.findById(entrenamientoId, (err, entrenamiento) => {
        if (err) return res.status(500).send({ message: 'No existe el entrenamiento'})

        entrenamiento.remove(err => {
            if (err) return res.status(500).send({ message: 'Error al eliminar el entrenamiento'})
            res.status(200).send({ message: 'El entrenamiento ha sido eliminado '})
        })
    })
})

mongoose.connect('mongodb://localhost:27017/trainnersAPI', (err, res) => {
    if (err)
        return console.log(`Error al conectar a la base de datos: ${err}`)
    console.log("COnexión a la base de datos establecida...")

    app.listen(port, () => {
        console.log("API REST corriendo en http://localhost:" + port)
    })
})