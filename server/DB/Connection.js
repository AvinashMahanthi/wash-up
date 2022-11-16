const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGOURI = process.env.MONGOURI;
// "mongodb://avinash:7cJML4R9JrteCcl7@cluster0-shard-00-00.cnbyw.mongodb.net:27017,cluster0-shard-00-01.cnbyw.mongodb.net:27017,cluster0-shard-00-02.cnbyw.mongodb.net:27017/?ssl=true&replicaSet=atlas-2c2mgd-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports = () => {
  mongoose
    .connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connection sucessfull!🚀");
    })
    .catch((e) => {
      console.log(e);
    });
};
