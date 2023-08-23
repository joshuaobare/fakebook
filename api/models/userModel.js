const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now() },
  avatar: { type: String },
  isAdmin: { type: Boolean, default: false, required: true },
});

UserSchema.virtual("url").get(function () {
  return ``;
});

module.exports = mongoose.model("User", UserSchema);
