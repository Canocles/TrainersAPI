var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UsuarioSchema = Schema({
    login: String,
    nombre: String,
    apellidos: String,
    email: String,
    sexo: { type: String, enum: ['hombre', 'mujer'] },
    edad: Number
})

module.exports = mongoose.model('Usuario', UsuarioSchema)