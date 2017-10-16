var jwt = require('jwt-simple')
var moment = require('moment')
var config = require('../config')
var service = require('../services')

function createToken (usuario) {
    var payload = {
        sub: usuario._id,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
    var decoded = new Promise((resolve, reject) => {
        try {
            var payload = jwt.decode(token, config.SECRET_TOKEN)
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }

            resolve(payload.sub)

        } catch (err) {
            reject({
                status: 500,
                message: 'Token inválido'
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}