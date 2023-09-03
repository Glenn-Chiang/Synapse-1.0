import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel"},
  chat: {type: mongoose.Schema.Types.ObjectId, ref: "Chat"},
  timestamp: Date,
});

messageSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    object.timestamp =
      object.timestamp.toLocaleDateString() < new Date().toLocaleDateString()
        ? object.timestamp.toLocaleDateString() // If earlier than today, show date
        : object.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false }); // If today, show time

    delete object._id;
    delete object.__v;
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message
