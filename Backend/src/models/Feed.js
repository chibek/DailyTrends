const {Schema, model} = require('mongoose');

const feedSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String
  },
  image: {
    type: String,
  },
  source : {
    type: String,
    required: true,
    unique: true
  },
  publisher : {
    type: String,
    required: true,
  },
  origen :{
    type: String
  }
}, { timestamps: true });

module.exports =  model('Feed', feedSchema);
