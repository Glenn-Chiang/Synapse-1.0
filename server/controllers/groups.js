const groupsRouter = require("express").Router();
const Group = require("../models/Group");
const User = require("../models/User");
const mongoose = require("mongoose");

// Create group
groupsRouter.post("/groups", async (req, res, next) => {
  try {
    const { name, creatorId, description } = req.body;
    const group = new Group({
      name,
      description,
      creator: new mongoose.Types.ObjectId(creatorId),
      members: [new mongoose.Types.ObjectId(creatorId)],
      admins: [new mongoose.Types.ObjectId(creatorId)],
      dateCreated: new Date(),
    });
    const newGroup = await group.save();

    // Add group chat to creator's groupchats
    await User.findByIdAndUpdate(creatorId, {
      $push: { groups: newGroup._id },
    });

    res.json(newGroup);
  } catch (error) {
    next(error);
  }
});

// Get user's groups
groupsRouter.get("/users/:userId/groups", async (req, res, next) => {
  try {
    const groups = await Group.find({
      members: { $in: req.params.userId },
    }).populate("messages");
    res.json(groups);
  } catch (error) {
    next(error);
  }
});

// Get individual group
groupsRouter.get('/groups/:groupId', async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.groupId)
    res.json(group)
  } catch (error) {
    next(error)
  }
})

module.exports = groupsRouter;
