var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var Usuario = require('./models/usuario')

var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/usuarios', (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!usuarios) return res.status(404).send({ message: 'No existen usuarios'})

        return res.status(200).send({ usuarios })
    })
})

app.get('/api/usuarios/:usuarioId', (req, res) => {
    var usuarioId = req.params.usuarioId

    Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!usuario) return res.status(404).send({ message: 'El usuario no existe'})

        return res.status(200).send({ usuario })
    })
})

app.post('/api/usuarios', (req, res) => {
    console.log('POST /api/usuarios')
    console.log(req.body)

    var usuario = new Usuario()
    usuario.login = req.body.login
    usuario.nombre = req.body.nombre
    usuario.apellidos = req.body.apellidos
    usuario.email = req.body.email
    usuario.sexo = req.body.sexo
    usuario.edad = req.body.edad

    /*
    usuario.save()
        .then(res.status(200).send(req.body))
        */
    usuario.save((err, usuarioStored) => {
        if (err) res.status(500).send({ message: 'Error al guardar en la base de detos' })

        res.status(201).send({ usuario: usuarioStored })
    })
})

app.put('/api/usuarios/:usuarioId', (req, res) => {
    var usuarioId = req.params.usuarioId
    var update = req.body

    Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate) => {
        if (err) return res.status(500).send({ message: 'No existe el usuario'})

        return res.status(200).send({ usuario: usuarioUpdate })
    })
})

app.delete('/api/usuarios/:usuarioId', (req, res) => {
    var usuarioId = req.params.usuarioId

    Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'No existe el usuario'})

        usuario.remove(err => {
            if (err) return res.status(500).send({ message: 'Error al eliminar el usuario'})
            res.status(200).send({ message: 'El usuario ha sido eliminado '})
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