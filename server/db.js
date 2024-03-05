const mongoose = require("mongoose");

const URL = "mongodb+srv://firstdata:firstdata@cluster0.tk9trpp.mongodb.net/paytmmm"

const connectToDb = async () => {
  await mongoose
    .connect(URL)
    .then(() => console.log("Database is connected"))
    .catch((error) => console.log(error.message));
};

module.exports = connectToDb;
 