const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {type: String, required: true},
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  chat: { type: String, ref: "Chat", required: true },
  timestamp: Date,
});

messageSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
    delete object.passwordHash;
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
