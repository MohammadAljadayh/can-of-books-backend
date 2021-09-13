'use strict';

const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
mongoose.connect(`${MONGO_URL}`, {useNewUrlParser: true, useUnifiedTopology: true});


const bookModel = require('./bookModel');


const seedBook = () =>{
  const book1 = new bookModel({
    title : 'The Old Man and the Sea',
    description :'The Old Man and the Sea is a short novel written by the American author Ernest Hemingway in 1951 in Cayo Blanco, and published in 1952. It was the last major work of fiction written by Hemingway that was published during his lifetime.',
    status : '3.8/5',
    email : 'mjedayh@gmail.com',
   
  });

  const book2 = new bookModel({
    title : 'Peter Pan',
    description :'Peter Pan; or, the Boy Who Wouldn t Grow Up or Peter and Wendy, often known simply as Peter Pan, is a work by J. M. Barrie, in the form of a 1904 play and a 1911 novel.' ,
    status : '4/5',
    email : 'mjedayh@gmail.com',
   
  });

  const book3 = new bookModel({
    title : 'The Outsiders',
    description : 'The Outsiders is a coming-of-age novel by S. E. Hinton, first published in 1967 by Viking Press. Hinton was 15 when she started writing the novel; however, did most of the work when she was 16 and a junior in high school. Hinton was 18 when the book was published.',
    status : '4.1/5',
    email : 'mjedayh@gmail.com',
  });

  book1.save();
  book2.save();
  book3.save();
};

//seedBook();

console.log("data seeded");


const getBooksHandler = (req, res) => {
  bookModel.find((err,resultData)=>{
    if(err) {
        console.log('Error');
    }
    else {
        console.log(resultData);
        res.json(resultData)
    }
});
};

app.get('/books',getBooksHandler);

app.get('/test', (request, response) => {

  response.send('test request received')

})
app.listen(PORT, () => console.log(`listening on ${PORT}`));





