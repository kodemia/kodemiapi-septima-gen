
const mongoose = require('mongoose')

const koderSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxLength: 100,
    required: true
  },
  generation: {
    type: Number,
    required: true,
    min: 1
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
})

// module.exports -> para decir lo que queremos que el script exporte
// solo se puede exportar una sola cosa

module.exports = mongoose.model('Koders', koderSchema)
