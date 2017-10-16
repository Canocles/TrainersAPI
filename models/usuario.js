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
    avatar: String,
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
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

UsuarioSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    var md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('Usuario', UsuarioSchema)