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

exports.add_friend = asyncHandler(async (req, res, next) => {
  const { friendId, userId } = req.body;

  const user = User.findByIdAndUpdate(userId, {
    $pull: { friendRequests: friendId },
    $push: { friends: friendId },
  });
  const friend = User.findByIdAndUpdate(friendId, {
    $push: { friends: userId },
  });

  try {
    await user.exec();
    await friend.exec();
    res.json({ message: "added friend successfully" });
  } catch (error) {
    res.json({ error });
  }
});

exports.remove_friend = asyncHandler(async (req, res, next) => {
    const { friendId, userId } = req.body;
  
    const user = User.findByIdAndUpdate(userId, {      
      $pull: { friends: friendId },
    });
    const friend = User.findByIdAndUpdate(friendId, {
      $pull: { friends: userId },
    });
  
    try {
      await user.exec();
      await friend.exec();
      res.json({ message: "added friend successfully" });
    } catch (error) {
      res.json({ error });
    }
  });