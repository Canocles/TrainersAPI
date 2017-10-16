var Entrenamiento = require('../models/entrenamiento')

function getEntrenamientos (req, res) {
    Entrenamiento.find({}, (err, entrenamientos) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!entrenamientos) return res.status(404).send({ message: 'No existen entrenamientos'})

        return res.status(200).send({ entrenamientos })
    })
}

function getEntrenamiento (req, res) {
    var entrenamientoId = req.params.entrenamientoId
    
    Entrenamiento.findById(entrenamientoId, (err, entrenamiento) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la petición'})
        if (!entrenamiento) return res.status(404).send({ message: 'El entrenamiento no existe'})

        return res.status(200).send({ entrenamiento })
    })
}

function addEntrenamiento (req, res) {
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
}

function updateEntrenamiento (req, res) {
    var entrenamientoId = req.params.entrenamientoId
    var update = req.body

    Entrenamiento.findByIdAndUpdate(entrenamientoId, update, (err, entrenamientoUpdate) => {
        if (err) return res.status(500).send({ message: 'No existe el entrenamiento'})

        return res.status(200).send({ entrenamiento: entrenamientoUpdate })
    })
}

function deleteEntrenamiento (req, res) {
    var entrenamientoId = req.params.entrenamientoId
    
    Entrenamiento.findById(entrenamientoId, (err, entrenamiento) => {
        if (err) return res.status(500).send({ message: 'No existe el entrenamiento'})

        entrenamiento.remove(err => {
            if (err) return res.status(500).send({ message: 'Error al eliminar el entrenamiento'})
            res.status(200).send({ message: 'El entrenamiento ha sido eliminado '})
        })
    })
}

module.exports = {
    getEntrenamientos,
    getEntrenamiento,
    addEntrenamiento,
    updateEntrenamiento,
    deleteEntrenamiento
}