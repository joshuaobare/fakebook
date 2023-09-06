const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose')
const objId = mongoose.Types.ObjectId

exports.friend_request = asyncHandler(async (req, res, next) => {
  const { friendId, userId } = req.body;

  const friend = User.findByIdAndUpdate(friendId, {
    $push: { friendRequests: new objId(userId) },
  });

  try {
    await friend.exec();
    res.json({ message: "friend request sent successfully" });
  } catch (error) {
    res.json({ error });
  }
});

exports.delete_friend_request = asyncHandler(async (req, res, next) => {
    const { friendId, userId } = req.body;
  
    const user = User.findByIdAndUpdate(userId, {
      $pull: { friendRequests: new objId(friendId) },
    });
  
    try {
      await user.exec();
      res.json({ message: "friend request deleted successfully" });
    } catch (error) {
      res.json({ error });
    }
  });

exports.add_friend = asyncHandler(async (req, res, next) => {
  const { friendId, userId } = req.body;

  const user = User.findByIdAndUpdate(userId, {
    $pull: { friendRequests: new objId(friendId) },
    $push: { friends: new objId(friendId) },
  });
  const friend = User.findByIdAndUpdate(friendId, {
    $push: { friends: new objId(userId) },
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
      $pull: { friends: new objId(friendId) },
    });
    const friend = User.findByIdAndUpdate(friendId, {
      $pull: { friends: new objId(userId) },
    });
  
    try {
      await user.exec();
      await friend.exec();
      res.json({ message: "removed friend successfully" });
    } catch (error) {
      res.json({ error });
    }
  });