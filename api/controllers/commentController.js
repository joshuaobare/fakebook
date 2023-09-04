const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.comments_get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const comments = await Comment.find({ postId: id }).exec();

  res.json({ comments });
});

exports.create_comment = [
  body("text")
    .escape()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment cannot be blank"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const { userId, text, postId } = req.body;

    const comment = new Comment({
      userId,
      text,
      postId
    });

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    } else {
      await comment.save();
      res.json({ message: "Comment created successfully" });
    }
  }),
];
