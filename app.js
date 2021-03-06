var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genres = require('./models/genres.js');
Book = require('./models/book.js');


// connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res) {
  res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', function(req, res) {
  Genres.getGenres(function(err, genres) {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.post('/api/genres', function(req, res) {
  var genres = req.body;
  Genres.addGenres(genres,function(err, genres){
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.put('/api/genres/:_id', function(req, res) {
  var id = req.params._id;
  var genres = req.body;
  Genres.updateGenres(id, genres, {}, function(err, genres){
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.delete('/api/genres/:_id', function(req, res) {
  var id = req.params._id;
  Genres.removeGenres(id, function(err, genres){
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.get('/api/books', function(req, res) {
  Book.getBooks(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get('/api/books/:_id', function(req, res) {
  Book.getBookById(req.params._id,function(err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.post('/api/books', function(req, res) {
  var book = req.body;
  Book.addBook(book,function(err, book){
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.put('/api/books/:_id', function(req, res) {
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, {}, function(err, book){
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.delete('/api/books/:_id', function(req, res) {
  var id = req.params._id;
  Book.removeBook(id, function(err, book){
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.listen(3000);
console.log('connection est...')
