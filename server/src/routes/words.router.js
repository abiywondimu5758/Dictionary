const express = require('express');
const {httpGetAllWords, httpAddNewWord, httpDeleteWord } = require('../controllers/words.controller');

const wordsRouter = express.Router();

wordsRouter.get('/', httpGetAllWords);
wordsRouter.post('/',httpAddNewWord);
wordsRouter.delete('/:word',httpDeleteWord);
module.exports = {
  wordsRouter
}