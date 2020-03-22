
const express = require('express');
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

