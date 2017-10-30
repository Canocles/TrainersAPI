module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/trainnersAPI',
    SECRET_TOKEN: 'mitokenespracticamenteimposiblededesdifraren2017',
    url: 'https://api-rest-trainners.herokuapp.com'
}