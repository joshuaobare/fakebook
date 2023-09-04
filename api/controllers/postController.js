const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.post_get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.find({ _id: id }).exec();
  const comments = await Comment.find({ postId: id }).exec();

  res.json({ post, comments });
});

exports.posts_get = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}).exec();

  res.json({ posts });
});

exports.user_posts_get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const posts = await Post.find({ userId: id }).exec();

  res.json({ posts });
});

exports.like_post = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const post = await Post.findById(id).exec();

  const likePost = post.likes.some((like) => like === userId);

  if (likePost) {
    await Post.findByIdAndUpdate(id, {
      $pull: { likes: userId },
    }).exec();
    res.json({ message: "unliked post" });
  } else {
    await Post.findByIdAndUpdate(id, {
      $push: { likes: userId },
    }).exec();
    res.json({ message: "liked post" });
  }
});
