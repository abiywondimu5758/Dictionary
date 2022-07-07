// const { parse } = require("csv-parse");
// const path = require("path");
// const fs = require("fs");
const words = require("./words.mongo");
// const { finished } = require("stream");

// const words = [];

// function loadWordsData() {
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(
//       path.join(__dirname, "..", "..", "..", "Dictionary", "b.csv")
//     )
//       .pipe(
//         parse({
//           // delimiter: ',',

//           // escape: '',
//           comment: "#",
//           columns: true,
//           // raw:true
//         })
//       )
//       .on("data", async (data) => {
//         // console.log('loading words');
//         // words.push(data);
//         saveWords(data);
//       })
//       .on("error", (error) => {
//         console.log(error);
//       })
//       .on("end",async () => {
//         const countWordsFound = (await getAllWords()).length;
//         console.log(`${ countWordsFound } words found!`);
//       });
//         resolve();
//   });
// }
async function wordExists(word){
  return await words.findOne({
    word:word,
  });
}
async function getAllWords() {
  console.log(words.length);
  return await words.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

// async function saveWords(word){
//   let i = 0 ;
//   try{
//     await words.updateOne({
//       word: word.Word,
//     }, {
//       word: word.Word,
//       count: word.Count,
//       pos:word.Pos,
//       definition:word.Definition,
//       example:'',
//       seen:true,
//     },{
//       upsert: true,
//     });
//   }
//   catch(err){
//     console.error(`Could not save Word ${err} `);
//   }

// }

async function saveWord(addWord) {
  // console.log(await addWord);
  const word = await words.findOne({
    word: addWord.word.charAt(0).toUpperCase() + addWord.word.slice(1),
  });
  if (word) {
    throw new Error("Word Already in Database");
  } else {
    await words.findOneAndUpdate(
      {
        word: addWord.word.charAt(0).toUpperCase() + addWord.word.slice(1),
        pos: addWord.pos,
        count: addWord.count,
        definition: addWord.definition,
        example: '',
        seen: true,
      },
      {
        addWord,
      },
      {
        upsert: true,
      }
    );
  }
}
  async function addNewWord(word) {
    const newWord = Object.assign(word);

    await saveWord(newWord);
  }
  // catch(err){
  //   console.error(`Could not save planet ${err} `);
  // }
async function deleteWordByName(word){
  return await words.updateOne({
    word: word,
  },
  {
    seen: false,
  });
}

module.exports = {
  // loadWordsData,
  wordExists,
  getAllWords,
  addNewWord,
  deleteWordByName,
};

// {
//   word: word.Word,
//   count: word.Count,
//   pos:word.Pos,
//   definition:word.Definition
// }
