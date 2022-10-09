const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
    enum: ["Admin", "User"]
  }
});

module.exports = mongoose.model("User", userSchema);
