const {Schema, model} = require('mongoose');

const feedSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  source : {
    type: String,
    required: true,
  },
  publisher : {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports =  model('Feed', feedSchema);
