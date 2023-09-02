import mongoose, { mongo } from "mongoose";

const chatSchema = new mongoose.Schema({
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
})

chatSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object.id || object._id.toString();
    delete object._id;
    delete object.__v;
  }
})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat