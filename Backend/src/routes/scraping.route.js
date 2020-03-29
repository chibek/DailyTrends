const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const scrapingRoute = express.Router();
let Feed = require('../models/Feed');

const urls = {
  "elpais": "https://elpais.com/",
  "elmundo": "https://www.elmundo.es/"
};



scrapingRoute.route('/elmundo').get((req, res,error) => {
  var fechaFeed;
  Feed.findOne({"origen":"elmundo"}).sort({"createdAt" : -1})
  .then( response => {
    fechaFeed = response.createdAt
    var data1 = new Date()
    data1  = new Date(data1.setHours(0,0,0,0))
    var data2 = new Date(Date.parse(fechaFeed))
    data2 = new Date(data2.setHours(0,0,0,0))
    var todayFeed  = data1.getTime() === data2.getTime()

    if(!todayFeed){
      axios(urls.elmundo)
    .then(response => {
      const html = response.data;
          const $ = cheerio.load(html);
          const articles = $('article.has-image');
          var size = 10;
          var articlesLimit = articles.slice(0, size);
          articlesLimit.each(function () {
            const image =  $(this).find('img.ue-c-cover-content__image').attr('src');
            const title =  $(this).find('h2.ue-c-cover-content__headline').text();
            const body = "Necesitas Premium en elmundo.es";
            const source  = $(this).find('a.ue-c-cover-content__link').attr('href');
            const publisher  = $(this).find('ul.ue-c-cover-content__byline-list > li > span.ue-c-cover-content__byline-name').text().replace("Redacci�n:","").trim();
    
            const article = {
              image : image,
              title : title,
              body : body,
              source  : source,
              publisher  : publisher,
              origen : "elmundo"
            }
      
            axios.post("http://localhost:3000/api/create",article);
          
          });
    })
    
    }

  })
  

});

scrapingRoute.route('/elpais').get((req, res) => {
  var fechaFeed;
  Feed.findOne({"origen":"elpais"}).sort({"createdAt" : -1})
  .then( response => {
    fechaFeed = response.createdAt
    var data1 = new Date()
    data1  = new Date(data1.setHours(0,0,0,0))
    var data2 = new Date(Date.parse(fechaFeed))
    data2 = new Date(data2.setHours(0,0,0,0))
    var todayFeed  = data1.getTime() === data2.getTime()

    if(!todayFeed){
      axios(urls.elpais)
      .then(response => {
        const html = response.data;
            const $ = cheerio.load(html);
            const articles = $('article.story_card.story_photo');
            var size = 10;
            var articlesLimit = articles.slice(0, size);
            articlesLimit.each(function () {

              var image = $(this).find('img').attr('src');
              var title = $(this).find('h2.headline').text();
              var body = $(this).find('p.description').text();
              var source  = $(this).find('h2.headline > a').attr('href');
              var publisher  = $(this).find('a.author').text();

              const article = {
                image : image,
                title : title,
                body : body,
                source  : source,
                publisher  : publisher,
                origen : "elpais"
              }
              axios.post("http://localhost:3000/api/create",article);
            
            });
        })
       
    }

  })
  

});

  




module.exports = scrapingRoute;