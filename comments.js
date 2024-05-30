// Create web server
// Express is a web application framework for Node.js
const express = require('express');
const app = express();
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors');
app.use(cors());
// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');
// Connect to the database
mongoose.connect('mongodb://localhost/comments');
// Create a model for comments
const Comment = mongoose.model('Comment', {
  username: String,
  body: String,
  date: Date
});
// Create a route for getting all comments
app.get('/comments', (req, res) => {
  Comment.find({}, 'username body date', function (error, comments) {
    if (error) { console.error(error); }
    res.send({
      comments: comments
    });
  }).sort({_id: -1});
});
// Create a route for posting a new comment
app.post('/comments', (req, res) => {
  const username = req.body.username;
  const body = req.body.body;
  const date = new Date();
  const comment = new Comment({
    username: username,
    body: body,
    date: date
  });
  comment.save(function (error) {
    if (error) { console.error(error); }
    res.send({
      success: true,
      message: 'Comment saved successfully!'
    });
  });
});
// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
