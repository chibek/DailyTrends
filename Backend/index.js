
const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./config/Database');
const routes = require('./src/routes/auth/routesAuth')


const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use('/api',routes);

app.listen(port, () => {
    const db = new database();    
});

