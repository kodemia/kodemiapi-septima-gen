
const express = require('express')

const kodersRouter = require('./routes/koders')
const authRouter = require('./routes/auth')

const app = express() // creando la linea de produccion (servidor)

// Middleware
// Parsea cada request a json, solo en caso de que contenga
// el header 'content-type' con valor 'application/json'
// toma el body y lo transforma en un json que nos lo entrega
// en el objeteo request.body
app.use(express.json())

// middleware global (afecta a toda la apllicacion)
// app.use((request, response, next) => {
//   console.log(`> [${request.method}] ${request.url} body: ${JSON.stringify(request.body)}`)
//   console.log('> midd  leware in app')
//   next()
// })

// montamos el router de koders
app.use('/koders', kodersRouter)
app.use('/auth', authRouter)

module.exports = app
