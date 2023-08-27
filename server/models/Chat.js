const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  _id: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  dateCreated: Date
});

chatSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id.toString()
    delete object._id;
    delete object.__v;
  }
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
