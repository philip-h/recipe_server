const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

require('./routes')(app);

app.listen(process.env.PORT || 8081, () =>
  console.log('Server up and running'));

