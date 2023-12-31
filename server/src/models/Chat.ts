import mongoose from "mongoose";

export interface IChat extends mongoose.Document {
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
}

const chatSchema = new mongoose.Schema({
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
})

chatSchema.set('toJSON', {
  transform: (_, object) => {
    object.id = object.id || object._id.toString();
    delete object._id;
    delete object.__v;
  }
})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat