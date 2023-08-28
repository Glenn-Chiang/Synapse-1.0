const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  chat: { type: String, ref: "Chat", required: true },
  timestamp: Date,
});

messageSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();

    object.timestamp =
      object.timestamp.toDateString() < new Date().toDateString()
        ? object.timestamp.toLocaleDateString() // If earlier than today, show date
        : object.timestamp.toLocaleTimeString(); // If today, show time

    delete object._id;
    delete object.__v;
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
