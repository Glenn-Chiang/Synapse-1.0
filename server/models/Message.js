const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: String,
  sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  recipient: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  timestamp: Date
})

messageSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
    delete object.passwordHash;
  },
});

const Message = mongoose.model('Message', messageSchema)

module.exports = Message