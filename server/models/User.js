const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  dateJoined: Date,
  sentMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  groupchats: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupChat" }], 
});

userSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object.id || object._id.toString();
    delete object._id;
    delete object.__v;
    delete object.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
