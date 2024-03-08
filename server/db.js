const mongoose = require("mongoose");

const connectToDb = async () => {
  await mongoose
    .connect(process.env.URL)
    .then(() => console.log("Database is connected"))
    .catch((error) => console.log(error.message));
};

module.exports = connectToDb;
