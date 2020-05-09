
const bcrypt = require('bcrypt')

const jwt = require('../lib/jwt')

const Koder = require('../models/koders')

// los casos de uso son las acciones que peude ejercer un usuario en el sistema

function getAll () {
  // esto no se deberi de hacer
  return Koder.find()
}

function create (koderData) {
  return Koder.create(koderData)
}

// async function create (koderData) {
//   const newKoder = new Koder(koderData)
//   const koderCreated = await newKoder.save()
//   return koderCreated
// }

function deleteById (id) {
  return Koder.findByIdAndRemove(id)
}

function updateById (id, newKoderData) {
  return Koder.findByIdAndUpdate(id, newKoderData)
}

function getById (id) {
  return Koder.findById(id)
}

//
// 1.- validar la existencia
// 2.- crear el hash encriptado del password
// 3.- cramos el koder
//
async function signup (newKoderData) {
  const { email, password } = newKoderData
  if (!email) throw new Error('Email is required')
  if (!password) throw new Error('Password is required')

  const koderAlreadyExists = await Koder.findOne({ email })

  // if inline
  if (koderAlreadyExists) throw new Error('Email is already registered')
  if (password.length < 6) throw new Error('Password must be 6 characters minimum')

  const hash = await bcrypt.hash(password, 10)

  return Koder.create({ ...newKoderData, password: hash })
}

async function login (email, password) {
  console.log('usecase')
  const koder = await Koder.findOne({ email })
  if (!koder) throw new Error('Invalid data')
  console.log('will compare: ', password, koder.password)
  const isPasswordCorrect = await bcrypt.compare(password, koder.password)
  console.log('isPasswordCorrect: ', isPasswordCorrect)
  if (!isPasswordCorrect) throw new Error('Invalid data')

  return jwt.sign({ id: koder._id })
}

module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  signup,
  login
}

// en la ruta
// const koders = require('...koders')
// koders.getAll()
