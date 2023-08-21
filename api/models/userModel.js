const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now() },
});

UserSchema.virtual("url").get(function () {
  return ``;
});

module.exports = mongoose.model("User", UserSchema);
