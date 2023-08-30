const groupChatsRouter = require("express").Router();
const Group = require("../models/Group");
const User = require("../models/User");
const mongoose = require("mongoose");

// Create groupChat
groupChatsRouter.post("/groups", async (req, res, next) => {
  try {
    const { name, creatorId, description } = req.body;
    const groupChat = new Group({
      name,
      description,
      creator: new mongoose.Types.ObjectId(creatorId),
      members: [new mongoose.Types.ObjectId(creatorId)],
      admins: [new mongoose.Types.ObjectId(creatorId)],
      dateCreated: new Date(),
    });
    const newGroupChat = await groupChat.save();

    // Add group chat to creator's groupchats
    await User.findByIdAndUpdate(creatorId, {
      $push: { groups: newGroupChat._id },
    });

    res.json(newGroupChat);
  } catch (error) {
    next(error);
  }
});

// Get user's groupChats
groupChatsRouter.get("/users/:userId/groups", async (req, res, next) => {
  try {
    const groupChats = await Group.find({
      members: { $in: req.params.userId },
    }).populate("messages");
    res.json(groupChats);
  } catch (error) {
    next(error);
  }
});

module.exports = groupChatsRouter;
