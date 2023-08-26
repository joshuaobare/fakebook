const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");

exports.comments_get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const comments = await Comment.find({ postId: id }).exec();

  res.json({ comments });
});
