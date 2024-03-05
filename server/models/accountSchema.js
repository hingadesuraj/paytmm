const mongoose = require("mongoose");
const User = require("../models/user")

const accountSchema = new mongoose.Schema({
    // user Id with User referance schema and required
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});


const Account = mongoose.model("Account", accountSchema);

module.exports = Account