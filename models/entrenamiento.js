var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EntrenamientoSchema = Schema({
    nombre: String,
    descripcion: String,
    dificultad: Number,
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

module.exports = mongoose.model('Entrenamiento', EntrenamientoSchema)