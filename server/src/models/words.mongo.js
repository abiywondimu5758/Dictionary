const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: {
    type:String,
    required: true,
  },
  count: {
    type:String,
    required: true,
  },
  pos: {
    type:String,
    required: true,
  },
  definition: {
    type:String,
    required: true,
  },
  example: {
    type: String,
  },
  seen: {
    type: Boolean
  },
});

module.exports = mongoose.model('Word',wordSchema);