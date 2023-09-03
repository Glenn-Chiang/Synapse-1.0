import mongoose, { mongo } from "mongoose";

export interface IChat extends mongoose.Document {
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}

const chatSchema = new mongoose.Schema({
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
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