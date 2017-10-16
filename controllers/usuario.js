var mongoose = require('mongoose')
var Usuario = require('../models/usuario')
var service = require('../services')

function signUp (req, res) {
    var usuario = new Usuario({
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    })

    usuario.save((err) => {
        if (err) res.status(500).send({ message: 'Error al crear el usuario' })

        return res.status(200).send({ token: service.createToken(usuario) })
    })
}

function signIn (req, res) {
    Usuario.find({ email: req.body.email }, (err, usuario) => {
        if (err) return res.status(500).send({ message: err })
        if (!usuario) return res.status(404).send({ message: 'No existe el usuario' })

        req.usuario = usuario
        res.status(200).send({ 
            message: 'Te has logeado correctamente',
            token: service.createToken(usuario)
        })
    })
}

module.exports = {
    signUp,
    signIn
}