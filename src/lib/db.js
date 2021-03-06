
const mongoose = require('mongoose')

const DB_USER = 'devcharles'
const DB_PASSWORD = 'kodemia123'
const DB_HOST = 'septimageneracion-3qmpe.mongodb.net'
const DB_NAME = 'kodemia'
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

function connect () {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
}

module.exports = {
  connect
}

// del otro lado...
// const db = require('...db.js')
// db() -> asi se exportamos directo la funcion
// db.connect()
