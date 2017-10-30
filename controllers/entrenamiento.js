var Entrenamiento = require('../models/entrenamiento')
var Usuario = require('../models/usuario')
var hal = require('hal');

function getEntrenamientos (req, res) {
    var usuarioId = req.params.usuarioId
    var usuario = Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!usuario) return res.status(404).send({ message: 'El usuario no existe'})
        else {
            Entrenamiento.find({creador: usuarioId}, (err, entrenamientos) => {
                if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
                if (!entrenamientos) return res.status(404).send({ message: 'No existen entrenamientos'})

                var resource = new hal.Resource();
                resource.link('self', `/usuarios/${usuarioId}/entrenamientos`)
                resource.link('usuario', `/usuarios/${usuarioId}`)
                var resultado = Object.assign({ entrenamientos }, req.body, resource.toJSON())
                return res.status(200).send(resultado)
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

                var resource = new hal.Resource();
                resource.link('self', `/usuarios/${usuarioId}/entrenamientos/${entrenamientoId}`)
                resource.link('entrenamientos', `/usuarios/${usuarioId}/entrenamientos`)
                resource.link('usuario', `/usuarios/${usuarioId}`)
                var resultado = Object.assign({ entrenamientos }, req.body, resource.toJSON())
                return res.status(200).send(resultado)
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
                        
                        var resource = new hal.Resource();
                        resource.link('entrenamientos', `/usuarios/${req.params.usuarioId}/entrenamientos`)
                        resource.link('usuario', `/usuarios/${req.params.usuarioId}`)
                        var resultado = Object.assign({entrenamientoGuardado, usuarioStored}, resource.toJSON())
                        res.status(201).send(resultado)
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

                var resource = new hal.Resource();
                resource.link('self', `/usuarios/${usuarioId}/entrenamientos/${entrenamientoId}`)
                resource.link('entrenamientos', `/usuarios/${usuarioId}/entrenamientos`)
                resource.link('usuario', `/usuarios/${usuarioId}`)
                var resultado = Object.assign({entrenamientoUpdate}, resource.toJSON())
                return res.status(201).send(resultado)
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

                entrenamiento.remove((err, entrenamientoDeleted) => {
                    if (err) return res.status(500).send({ message: 'Error al eliminar el entrenamiento'})

                    var resource = new hal.Resource();
                    resource.link('self', `/usuarios/${usuarioId}/entrenamientos/${entrenamientoId}`)
                    resource.link('entrenamientos', `/usuarios/${usuarioId}/entrenamientos`)
                    resource.link('usuario', `/usuarios/${usuarioId}`)
                    var resultado = Object.assign({message: 'El entremmiento ha sido eliminado con éxito'}, {entrenamientoDeleted}, resource.toJSON())
                    return res.status(201).send(resultado)
                    res.status(200).send(resultado)
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