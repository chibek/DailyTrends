const express = require('express');
const feedRoute = express.Router();

// Feed model
let Feed = require('../models/Feed');

// Add Feed
feedRoute.route('/create').post((req, res, next) => {
    Feed.create(req.body, (error, data) => {
    if (error) {
      return ""
    } else {
      res.json(data)
    }
  })
});

// Get All Feeds
feedRoute.route('/').get((req, response) => {
  Feed.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
feedRoute.route('/mundotoday').get((req, response) => {
 var startOfToday = new Date();
 startOfToday.setHours(0,0,0,0);
 var _id = Math.floor(startOfToday.getTime() / 1000).toString(16) + "0000000000000000";

  Feed.find({"origen":"elmundo", "createdAt": {$gte: new Date(new Date().setDate(new Date().getDate()-1)), $lt: new Date()}},(req,res,error) => {
    if (error) {
      return ""
    } else {
      if(res !== "undefined"){
        response.json(res)
      }
    }

  })
})

feedRoute.route('/paistoday').get((req, response) => {
  var startOfToday = new Date();
  startOfToday.setHours(0,0,0,0);
  var _id = Math.floor(startOfToday.getTime() / 1000).toString(16) + "0000000000000000";

  Feed.find({"origen":"elpais","createdAt": {$gte: new Date(new Date().setDate(new Date().getDate()-1)), $lt: new Date()}},(req,res,error) => {
    if (error) {
      return ""
    } else {
      if(res !== "undefined"){
        response.json(res)
        
      }
  
    }
  
  })
 })

 feedRoute.route('/customFeeds').get((req, response) => {
  Feed.find({"origen":"custom"}).sort({"createdAt": -1})
  .exec(function(err, result) {
    if (err) throw err;
    response.json(result);
  });
 })

// Get single Feed
feedRoute.route('/read/:id').get((req, res) => {
  Feed.findById(req.params.id, (error, data) => {
    if (error) {
      return ""
    } else {
      res.json(data)
    }
  })
})
//check source exist
feedRoute.route('/article/:source').get((req, res) => {
  Feed.find({ "source":req.params.source}, (error, data) => {
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