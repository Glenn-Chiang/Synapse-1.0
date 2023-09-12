import mongoose from "mongoose";

export interface IChannel extends mongoose.Document {
  name: string;
  description: string;
  members: [{ type: mongoose.Schema.Types.ObjectId; ref: "User" }];
  admins: [{ type: mongoose.Schema.Types.ObjectId; ref: "User" }];
  dateCreated: Date;
  creator: { type: mongoose.Schema.Types.ObjectId; ref: "User" };
  messages: [{ type: mongoose.Schema.Types.ObjectId; ref: "Message" }];
}

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dateCreated: Date,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

channelSchema.set("toJSON", {
  transform: (_, object) => {
    object.id = object.id || object._id.toString();
    object.dateCreated = object.dateCreated.toLocaleDateString();
    delete object._id;
    delete object.__v;
  },
});

const Channel = mongoose.model<IChannel>("Channel", channelSchema);

export default Channel;
