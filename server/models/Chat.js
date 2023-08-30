const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dateCreated: Date,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

chatSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object.id || object._id.toString()
    delete object._id;
    delete object.__v;
  }
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
