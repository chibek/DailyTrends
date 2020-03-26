
const express = require('express');
const multer = require('multer');
const app = express();
const cors = require('cors');
const database = require('./config/Database');
const auth = require('./src/routes/auth/auth.routes')
const feedRoute = require('./src/routes/feeds.route')
const axios = require('axios');
const cheerio = require('cheerio');
const feed = require('./src/models/Feed')


var urls = {
  "elpais": "https://elpais.com/",
  "elmundo": "https://www.elmundo.es/"
};


const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());

app.use('/api',auth);
app.use('/api', feedRoute)

app.listen(port, () => {
    const db = new database();    
});


//Save file in uploads
  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../Frontend/src/assets/img/')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  // validations
  var upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

//upload single file
  app.post('/api/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })
  
  axios(urls.elmundo)
  .then(response => {
    const html = response.data;
        const $ = cheerio.load(html);
        const articles = $('article.has-image');
        console.log(articles.length);
        var size = 5;
        var articlesLimit = articles.slice(0, size);
        console.log(articlesLimit.length);
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
  .catch(console.error);

  axios(urls.elpais)
  .then(response => {
    const html = response.data;
        const $ = cheerio.load(html);
        const articles = $('article.story_card.story_photo');
        console.log(articles.length);
        var size = 5;
        var articlesLimit = articles.slice(0, size);
        console.log(articlesLimit.length);
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
  .catch(console.error);
