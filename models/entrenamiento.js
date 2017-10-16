var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EntrenamientoSchema = Schema({
    nombre: String,
    descripcion: String,
    dificultad: Number
})

module.exports = mongoose.model('Entrenamiento', EntrenamientoSchema)