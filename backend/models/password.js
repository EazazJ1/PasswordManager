const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  iv: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Password', passwordSchema)