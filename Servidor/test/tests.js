var api = require('../app')
var supertest = require('supertest');
var assert = require('assert')

var token
var entrenamiento

describe('Pruebas de la API para Entrenadores', function(){
    it ('Login correcto', function() {
        supertest(api).post('/login')
            .send({ email: 'prueba@gmail.com', password: '1'})
            .expect(200)
            .end(function(err, res) {
                assert(res.body.token)
                usuarioID = res.body.usuario
            })
    });

    it ('Registro correcto', function() {
        supertest(api).post('/registro')
            .send({ email: 'prueba@gmail.com', login: 'prueba', password: 'prueba'})
            .expect(201)
            .end(function(err, res) {
                assert(res.body.token)
                usuarioID = res.body.usuario
            })
    });

    it ('Lista de usuarios correcta', function() {
        supertest(api)
            .get('/usuarios')
            .set('Authorization', `${token}`)
            .expect(200, function(err, res) {
                assert(res.body.usuarios)
            })
    });

    it ('Creación de entrenamiento', function() {
        supertest(api)
            .post('/usuarios/59e54006d9376e1e00ecbbb9/entrenamientos')
            .set('Authorization', `${token}`)
            .send({ nombre: 'Prueba', descripcion: 'Prueba', dificultad: '2'})
            .expect(201)
            .end(function(err, res) {
                entrenamiento = res.body.entrenamientoGuardado._id
                assert(res.body.entrenamientoGuardado)
            })
    });

    it ('Lista de entrenamientos', function() {
        supertest(api)
            .get(`/usuarios/59e54006d9376e1e00ecbbb9/entrenamientos`)
            .set('Authorization', `${token}`)
            .expect(200, function(err, res) {
                assert(res.body.entrenamientos)
            })
    });

    it ('Mostrar entrenamiento', function() {
        supertest(api)
            .get(`/usuarios/59e54006d9376e1e00ecbbb9/entrenamientos/${entrenamiento}`)
            .set('Authorization', `${token}`)
            .expect(200, function(err, res) {
                assert(res.body.entrenamiento)
            })
    });

    it ('Modificar entrenamiento', function() {
        supertest(api)
            .put(`/usuarios/59e54006d9376e1e00ecbbb9/entrenamientos/${entrenamiento}`)
            .set('Authorization', `${token}`)
            .send({ nombre: 'Modificado', descripcion: 'Modificado', dificultad: '4'})
            .expect(200)
            .end(function(err, res) {
                assert(res.body.entrenamientoUpdate)
            })
    });

    it ('Borrar entrenamiento', function() {
        supertest(api)
        .put(`/usuarios/59e54006d9376e1e00ecbbb9/entrenamientos/${entrenamiento}`)
        .set('Authorization', `${token}`)
        .send({ nombre: 'Modificado', descripcion: 'Modificado', dificultad: '4'})
        .expect(200)
        .end(function(err, res) {
            assert(res.body.entrenamientoUpdate)
        })
    })
})