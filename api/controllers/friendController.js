const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.friend_request = asyncHandler(async (req, res, next) => {
  const { friendId, userId } = req.body;

  const friend = User.findByIdAndUpdate(friendId, {
    $push: { friendRequests: userId },
  });

  try {
    await friend.exec();
    res.json({ message: "friend request sent successfully" });
  } catch (error) {
    res.json({ error });
  }
});