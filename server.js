"use strict";

const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookModel = require("./bookModel");

const seedBook = () => {
  const book1 = new bookModel({
    title: "The Old Man and the Sea",
    description:
      "The Old Man and the Sea is a short novel written by the American author Ernest Hemingway in 1951 in Cayo Blanco, and published in 1952. It was the last major work of fiction written by Hemingway that was published during his lifetime.",
    status: "3.8/5",
    email: "mjedayh@gmail.com",
    img: "https://images-na.ssl-images-amazon.com/images/I/71KloredONL.jpg",
  });

  const book2 = new bookModel({
    title: "Peter Pan",
    description:
      "Peter Pan; or, the Boy Who Wouldn t Grow Up or Peter and Wendy, often known simply as Peter Pan, is a work by J. M. Barrie, in the form of a 1904 play and a 1911 novel.",
    status: "4/5",
    email: "mjedayh@gmail.com",
    img: "https://i.harperapps.com/hcanz/covers/9780062362223/y648.jpg",
  });

  const book3 = new bookModel({
    title: "The Outsiders",
    description:
      "The Outsiders is a coming-of-age novel by S. E. Hinton, first published in 1967 by Viking Press. Hinton was 15 when she started writing the novel; however, did most of the work when she was 16 and a junior in high school. Hinton was 18 when the book was published.",
    status: "4.1/5",
    email: "mjedayh@gmail.com",
    img: "https://images-na.ssl-images-amazon.com/images/I/71wFE5GskML.jpg",
  });

  book1.save();
  book2.save();
  book3.save();
};

//seedBook();

// console.log("data seeded");

const getBooksHandler = (req, res) => {
  bookModel.find({ email: req.query.email }, (err, resultData) => {
    if (err) {
      console.log("Error");
    } else {
      console.log(resultData);
      res.json(resultData);
    }
  });
};

const createBookHandler = (req, res) => {
  console.log(req.body);
  const { title, description, status, email, img } = req.body;

  const newBookModel = new bookModel({
    title,
    description,
    status,
    email,
    img,
  });
  newBookModel.save();
  console.log(newBookModel);
  res.send(newBookModel);
};
const deleteBooksHandler = (req, res) => {
  const bookId = req.params.books_id;

  bookModel.deleteOne({ _id: bookId }, (error, deletedData) => {
    res.json(deletedData);
  });
};

const updateBookHandler = (req, res) => {
  const { title, description, status, email, img } = req.body;
  const bookId = req.params.books_id;

  bookModel.findByIdAndUpdate(
    { _id: bookId },
    { title, description, status, email, img },
    { new: true },
    (error, updatedBookData) => {
      res.json(updatedBookData);
    }
  );
};

app.get("/books", getBooksHandler);
app.post("/books", createBookHandler);
app.delete("/books/:books_id", deleteBooksHandler);
app.put("/books/:books_id", updateBookHandler);
app.get("/test", (request, response) => {
  response.send("test request received");
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));
