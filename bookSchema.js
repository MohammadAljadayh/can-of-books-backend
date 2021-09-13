const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : String,
    description : String,
    status : String,
    email : String,
    img : String,
  });


  module.exports = bookSchema;