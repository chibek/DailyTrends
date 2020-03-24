const express = require('express');
const app = express();
const feedRoute = express.Router();

// Feed model
let Feed = require('../models/Feed');

// Add Feed
feedRoute.route('/create').post((req, res, next) => {
    Feed.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Feeds
feedRoute.route('/').get((req, res) => {
  Feed.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Feed
feedRoute.route('/read/:id').get((req, res) => {
  Feed.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Feed
feedRoute.route('/update/:id').put((req, res, next) => {
  Feed.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Feed
feedRoute.route('/delete/:id').delete((req, res, next) => {
  Feed.findOneAndRemove({'_id' : req.params.id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }})
})

module.exports = feedRoute;