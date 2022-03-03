const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schemaEnglish = new Schema({
  origin: {
    type: String,
    required: true
  },
  translate: {
    type: String,
    required: true
  }
})

module.exports = model('English', schemaEnglish)
