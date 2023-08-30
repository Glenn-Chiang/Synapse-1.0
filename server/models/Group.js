const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateCreated: Date,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

groupSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

const Group = mongoose.model('Group', groupSchema)

module.exports = Group
