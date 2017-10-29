var Entrenamiento = require('../models/entrenamiento')
var Usuario = require('../models/usuario')

function getEntrenamientos (req, res) {var usuarioId = req.params.usuarioId
    var usuarioId = req.params.usuarioId
    var usuario = Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!usuario) return res.status(404).send({ message: 'El usuario no existe'})
        else {
            Entrenamiento.find({creador: usuarioId}, (err, entrenamientos) => {
                if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
                if (!entrenamientos) return res.status(404).send({ message: 'No existen entrenamientos'})

                return res.status(200).send({ entrenamientos })
            })
        }
    })
}

function getEntrenamiento (req, res) {
    var entrenamientoId = req.params.entrenamientoId
    var usuarioId = req.params.usuarioId
    var usuario = Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!usuario) return res.status(404).send({ message: 'El usuario no existe'})
        else {
            Entrenamiento.findById(entrenamientoId, (err, entrenamiento) => {
                if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
                if (!entrenamiento) return res.status(404).send({ message: 'El entrenamiento no existe'})

                return res.status(200).send({ entrenamiento })
            })
        }
    })
}

function addEntrenamiento (req, res) {
    var usuario = Usuario.findById(req.params.usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!usuario) return res.status(404).send({ message: 'El usuario no existe'})
        else {
            var entrenamiento = new Entrenamiento()
            entrenamiento.nombre = req.body.nombre
            entrenamiento.descripcion = req.body.descripcion
            entrenamiento.dificultad = req.body.dificultad
            entrenamiento.creador = usuario._id

            entrenamiento.save((err, entrenamientoGuardado) => {
                if (err) 
                res.status(500).send({ message: 'Error al guardar en la base de detos' })
                else {
                    usuario.entrenamientos.push(entrenamiento)
                    usuario.save((err, usuarioStored) => {
                        if (err)
                            res.statu(500).send({ message: 'Error al guardar los entrenamientos en el usuario' })
                        else
                            res.status(201).send({ entrenamiento: entrenamientoGuardado, usuario: usuarioStored })
                    })
                }
            })
        }
    })
}

function updateEntrenamiento (req, res) {
    var entrenamientoId = req.params.entrenamientoId
    var usuarioId = req.params.usuarioId
    var update = req.body

    var usuario = Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!usuario) return res.status(404).send({ message: 'El usuario no existe'})
        else {
            Entrenamiento.findByIdAndUpdate(entrenamientoId, update, (err, entrenamientoUpdate) => {
                if (err) return res.status(500).send({ message: 'No existe el entrenamiento'})
                if (!entrenamientoUpdate) return res.status(404).send({ message: 'El entrenamiento no existe' })

                return res.status(200).send({ entrenamiento: entrenamientoUpdate })
            })
        }
    })
}

function deleteEntrenamiento (req, res) {
    var entrenamientoId = req.params.entrenamientoId
    var usuarioId = req.params.usuarioId

    var usuario = Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!usuario) return res.status(404).send({ message: 'El usuario no existe'})
        else {
            Entrenamiento.findById(entrenamientoId, (err, entrenamiento) => {
                if (err) return res.status(500).send({ message: 'No existe el entrenamiento'})
                if (!entrenamiento) return res.status(404).send({ message: 'El entrenamiento no existe' })

                entrenamiento.remove((err) => {
                    if (err) return res.status(500).send({ message: 'Error al eliminar el entrenamiento'})
                    res.status(200).send({ message: 'El entrenamiento ha sido eliminado '})
                })
            })
        }
    })
}

module.exports = {
    getEntrenamientos,
    getEntrenamiento,
    addEntrenamiento,
    updateEntrenamiento,
    deleteEntrenamiento
}