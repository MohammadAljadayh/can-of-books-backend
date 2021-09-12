const mongoose = require('mongoose');
const bookSchema = require('./bookSchema');

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;