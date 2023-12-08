require('dotenv').config()
require('./mongo')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const User = require('./models/User')

app.use(express.json())
app.use(cors())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.res(req, res, 'content-length'), '-',
        JSON.stringify(req.body), 
    ].join(' ')   
}))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// Usuaris
app.get('/api/users', (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})

app.get('/api/users/:id', (request, response, next) => {
    const { id } = request.params;
    User.findById(id).then(user => {
        if (user) {
            return response.json(user)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

  // Middleware
  app.use((error, request, response, next) => {
    console.error(error);
    if (error.name == 'CastError') {
        response.status(400).send({error: 'id used is malformed'})
    } else {
        response.status(500).end()
    }
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servei running on port ${PORT}`);
})

