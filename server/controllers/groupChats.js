const groupChatsRouter = require("express").Router();
const GroupChat = require("../models/GroupChat");
const User = require("../models/User");
const mongoose = require("mongoose");

// Create groupChat
groupChatsRouter.post("/groupchats", async (req, res, next) => {
  try {
    const { name, creatorId } = req.body;
    const groupChat = new GroupChat({
      name,
      creator: new mongoose.Types.ObjectId(creatorId),
      members: [new mongoose.Types.ObjectId(creatorId)],
      admins: [new mongoose.Types.ObjectId(creatorId)],
      dateCreated: new Date(),
    });
    const newGroupChat = await groupChat.save();

    // Add group chat to creator's groupchats
    await User.findByIdAndUpdate(creatorId, {
      $push: { groupchats: newGroupChat._id },
    });

    res.json(newGroupChat);
  } catch (error) {
    next(error);
  }
});

// Get user's groupChats
groupChatsRouter.get("/users/:userId/groupchats", async (req, res, next) => {
  try {
    const groupChats = await GroupChat.find({
      members: { $in: req.params.userId },
    }).populate("messages");
    res.json(groupChats);
  } catch (error) {
    next(error);
  }
});

module.exports = groupChatsRouter;
