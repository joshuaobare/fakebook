const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.post_get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.find({ _id: id }).exec();
  const comments = await Comment.find({postId: id}).exec();

  res.json({ post, comments });
});

exports.posts_get = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}).exec();

  res.json({ posts });
});
