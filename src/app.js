const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

require('./routes')(app)

app.listen(8081, () => console.log('Listening on port 8081'));

