const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, require: true },
  userId: { type: String, require: true },
  timestamp: { type: Date, default: Date.now() },
  postId: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema)