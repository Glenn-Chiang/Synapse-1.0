import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
  text: string
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomType: 'Channel' | 'Chat',
  room: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "roomType",
    required: true,
  },
  timestamp: Date,
  isRead: boolean
}

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomType: { type: String, required: true, enum: ["Channel", "Chat"] },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "roomType",
    required: true,
  },
  timestamp: Date,
  isRead: {type: Boolean, default: false}
});

messageSchema.set("toJSON", {
  transform: (_, object) => {
    object.id = object._id.toString();
    object.timestamp =
      object.timestamp.toLocaleDateString() < new Date().toLocaleDateString()
        ? object.timestamp.toLocaleDateString() // If earlier than today, show date
        : object.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }); // If today, show time

    delete object._id;
    delete object.__v;
  },
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
