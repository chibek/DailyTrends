const mongo = require('mongoose');

class Connection {
    constructor() {
      
      const url = process.env.MONGODB_URI || `mongodb://localhost:27017/DailyTrends`;
      console.log("Establish new connection with url", url);
      mongo.Promise = global.Promise;
      mongo.set("useNewUrlParser", true);
      mongo.set("useFindAndModify", false);
      mongo.set("useCreateIndex", true);
      mongo.set("useUnifiedTopology", true);
      mongo.connect(url) .then(dbc => {
        console.log('[SUCESS] Conexion Correcta BD');
        })
      .catch(err => {
        console.log('[Error] Conexion bd');
        process.exit(1);
      });

      
    }
  }
  
  module.exports = Connection;