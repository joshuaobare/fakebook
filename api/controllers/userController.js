const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.user_get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).exec();

  res.json({ user });
});
