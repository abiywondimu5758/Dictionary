// const { deleteModel } = require("mongoose");
const {
  getAllWords,
  addNewWord,
  deleteWordByName,
  wordExists,
} = require("../models/words.model");

async function httpGetAllWords(req, res) {
  return res.status(200).json(await getAllWords());
}
async function httpAddNewWord(req, res) {
  const word = req.body;
  if (!word.word || !word.count || !word.pos || !word.definition) {
    return res.status(400).json({
      error: "Missing required word property",
    });
  } else {
    await addNewWord(word);
    return res.status(201).json(word);
  }
}
async function httpDeleteWord(req, res) {
  const word = req.params.word;
  console.log(word);
  const existsWord = await wordExists(word);
  if (!existsWord) {
    return res.status(404).json({
      error: "Word not found",
    });
  } else {
    const deleted = await deleteWordByName(word);
    return res.status(200).json(deleted);
  }
}

module.exports = {
  httpGetAllWords,
  httpAddNewWord,
  httpDeleteWord
};
