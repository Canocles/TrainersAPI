var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var crypto =  require('crypto')
var Schema = mongoose.Schema

var UsuarioSchema = Schema ({
    email: { type: String, unique: true, lowercase: true },
    login: String,
    nombre: String,
    apellidos: String,
    fechaNacimiento: Date,
    sexo: String,
    password: { type: String },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date,
    entrenamientos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entrenamiento'
    }]
})

UsuarioSchema.pre('save', function (next) {
    var usuario = this
    if (!this.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) return next(err)

            usuario.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('Usuario', UsuarioSchema)