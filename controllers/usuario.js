var mongoose = require('mongoose')
var Usuario = require('../models/usuario')
var service = require('../services')
var config = require('../config').url
var hal = require('hal');

function signUp (req, res) {
    var usuario = new Usuario({
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    })
    if (usuario.email == undefined || usuario.login == undefined || usuario.password == undefined)
        return res.status(400).send({ message: 'Ha dejado campos sin rellenar' })

    usuario.save((err, usuario) => {
        if (err) res.status(500).send({ message: 'Error al crear el usuario' })
        else {
            var resource = new hal.Resource();
            resource.link('self', `${config}/registro`)
            resource.link('usuario', `${config}/usuarios/${usuario._id}`)
            var resultado = Object.assign({ token: service.createToken(usuario)}, req.body, resource.toJSON())
            return res.status(201).send(resultado)
        }
    })
}

function signIn (req, res) {
    var email = req.body.email
    var password = req.body.password
    if (email == undefined || password == undefined) {
        return res.status(400).send({ message: 'Ha dejado campos sin rellenar'})
    }
    Usuario.findOne({ email }, (err, usuario) => {
        if (err) return res.status(500).send({ message: err })
        if (!usuario) return res.status(404).send({ message: 'No existe el usuario' })
        else {
            var resource = new hal.Resource();
            resource.link('self', `${config}/login`)
            resource.link('usuario', `${config}/usuarios/${usuario._id}`)
            var resultado = Object.assign({ message: 'Te has logeado correctamente', token: service.createToken(usuario) }, resource.toJSON())
            return res.status(200).send(resultado)
        }
    })
}

function getUsuarios (req, res) {
    Usuario.find({}, (err, usuarios) => {
        if (err) return res.status(500).send({ message: err })

        var resource = new hal.Resource();
        resource.link('self', `${config}/usuarios`)
        var resultado = Object.assign({ usuarios }, resource.toJSON())
        return res.status(200).send(resultado)
    })
}

function getUsuario (req, res) {
    var usuarioId = req.params.usuarioId
    Usuario.findById(usuarioId, (err, usuario) => {
        if (err) return res.status(500).send({ message: err })
        if (!usuario) return res.status(404).send({ message: 'No existe el usuario' })

        var resource = new hal.Resource();
        resource.link('self', `${config}/usuarios/${usuario._id}`)
        resource.link('usuario', `${config}/usuarios/`)
        var resultado = Object.assign({ usuario }, resource.toJSON())
        return res.status(200).send(resultado)
    })
}

module.exports = {
    signUp,
    signIn,
    getUsuarios,
    getUsuario
}