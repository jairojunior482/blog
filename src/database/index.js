const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URL;

async function start() {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    return console.log("Mongodb conectado com sucesso");
  } catch (error) {
    return console.log(`Mongodb houve um erro: ${error}`);
  }
}

module.exports = start()