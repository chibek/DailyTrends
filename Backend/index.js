
const express = require('express');
const multer = require('multer');
const app = express();
const cors = require('cors');
const database = require('./config/Database');
const routes = require('./src/routes/auth/auth.routes')
const feedRoute = require('./src/routes/feeds.route')


const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());

app.use('/api',routes);
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