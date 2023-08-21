const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now() },
  likes: { type: Array, default: [] },
});

module.exports = mongoose.model("Post", PostSchema);
