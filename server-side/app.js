if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index.js')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors())
app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`PORT is running on ${PORT}`)
})
module.exports = app