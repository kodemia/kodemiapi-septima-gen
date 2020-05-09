
const express = require('express')
const koders = require('../usecases/koders')

const auth = require('../middlewares/auth')

const router = express.Router()

// middleware a nivel del router
router.use((request, response, next) => {
  console.log('middleware router koders')
  next()
})

// GET /koders
// endpoint
router.get('/', auth, async (request, response) => {
  try {
    const allKoders = await koders.getAll()
    response.json({
      message: 'all koders',
      data: {
        koders: allKoders
      }
    })
  } catch (error) {
    response.json({
      success: false,
      error: error.message
    })
  }
})

router.post('/', auth, async (request, response) => {
  try {
    const newKoder = await koders.create(request.body)
    response.json({
      success: true,
      message: 'koder created',
      data: {
        koder: newKoder
      }
    })
  } catch (error) {
    const errorsArray = Object.entries(error.errors)
      .map(([key, value]) => {
        return { [key]: value.message }
      })

    response.status(400)
    response.json({
      success: false,
      error: error.message,
      errors: error.errors,
      errorsArray
    })
  }
})

// DELETE /koders/:id
// PATCH /koders/:id

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const koderDeleted = await koders.deleteById(id)

    response.json({
      success: true,
      message: `koder with id ${id} deleted`,
      data: {
        koder: koderDeleted
      }
    })
  } catch (error) {
    console.log('ERROR: ', error)
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

router.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const koderUpdated = await koders.updateById(id, request.body)
    response.json({
      success: true,
      message: `koder with id ${id} updated`,
      data: {
        koderUpdated
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// signup -> registro
// signin -> login

router.post('/signup', async (request, response) => {
  try {
    const newKoder = await koders.signup(request.body)
    response.json({
      success: true,
      message: 'Koder registered',
      data: {
        koder: newKoder
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router
