const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Database/mysql');
const morgan = require('morgan');
const router = require('./routes')

const app = express();
app.set('port', 4003);

app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/../react-client/dist'));

app.listen(app.get('port'));

app.get('/', (req, res) => res.status(200).send('hello'));

app.use('/', router);

console.log('Listening on', app.get('port'));
