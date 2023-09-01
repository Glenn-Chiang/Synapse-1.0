import * as express from "express";
const channelsRouter = express.Router();
import mongoose from "mongoose";
import Channel from "../models/Channel";

// Get all user's channels
channelsRouter.get("/users/:userId/channels", async (req, res, next) => {
  try {
    const channels = await Channel.find({ members: { $in: req.params.userId } })
      .populate("messages")
      .populate("members");
    res.json(channels);
  } catch (error) {
    next(error);
  }
});

// Get individual channel by channelId
channelsRouter.get("/channels/:channelId", async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.channelId)
      .populate("members")
      .populate("admins")
      .populate("creator");
    res.json(channel);
  } catch (error) {
    next(error);
  }
});

// Create new channel
channelsRouter.post("/channels", async (req, res, next) => {
  const { name, description, creatorId } = req.body;
  try {
    const channel = new Channel({
      name,
      description,
      creator: new mongoose.Types.ObjectId(creatorId),
      dateCreated: new Date(),
      members: [new mongoose.Types.ObjectId(creatorId)],
      admins: [new mongoose.Types.ObjectId(creatorId)],
    });
    const newChannel = await channel.save();
    res.json(newChannel);
  } catch (error) {
    next(error);
  }
});

export default channelsRouter;
