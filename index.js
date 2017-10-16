var mongoose = require('mongoose')
var app = require('./app')
var port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/trainnersAPI', (err, res) => {
    if (err)
        return console.log(`Error al conectar a la base de datos: ${err}`)
    console.log("COnexión a la base de datos establecida...")

    app.listen(port, () => {
        console.log("API REST corriendo en http://localhost:" + port)
    })
})