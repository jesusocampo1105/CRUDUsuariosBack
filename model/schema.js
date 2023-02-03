const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: { type: String },
  lastname: { type: String },
  username: { type: String },
  password: { type: String }
});

module.exports = mongoose.model("users", TodoSchema);
