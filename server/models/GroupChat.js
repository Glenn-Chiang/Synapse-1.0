const mongoose = require('mongoose')

const GroupChatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateCreated: Date,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

GroupChatSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

const GroupChat = mongoose.model('GroupChat', GroupChatSchema)

module.exports = GroupChat
