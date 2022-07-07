const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { wordsRouter } = require('./routes/words.router');
// const { getAllWords } = require('./models/words.model'); 


const app = express();

app.use(cors({
  origin:'http://localhost:3000'}));

app.use(morgan('combined'));
app.use(express.json());

app.use('/words', wordsRouter);

module.exports = app;