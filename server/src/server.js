const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
// const { loadWordsData } = require("./models/words.model");

const PORT = process.env.PORT || 5000;

const MONGO_URL =
  "mongodb+srv://nasa-api:2dAdJsc6KorEpEaP@nasacluster.iygrw.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });
  // await loadWordsData();

  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}

startServer();