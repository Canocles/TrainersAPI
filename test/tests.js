var api = require('../app')
var supertest = require('supertest');
var assert = require('assert')

var token
var usuarioID

describe('Pruebas de la API para Entrenadores', function(){
    it ('Login correcto', function(done) {
        supertest(api).post('/login')
            .send({ email: 'prueba@gmail.com', password: '1'})
            .expect(200, done) 

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

    it ('Lista de entrenamientos', function() {
        supertest(api)
            .get(`/usuarios/59e54006d9376e1e00ecbbb9/entrenamientos`)
            .set('Authorization', `${token}`)
            .expect(200, function(err, res) {
                assert(res.body.entrenamientos)
            })
    });
})