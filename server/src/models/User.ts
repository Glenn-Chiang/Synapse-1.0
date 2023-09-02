import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string
  passwordHash: string
  dateJoined: Date,
  sentMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  dateJoined: Date,
  sentMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
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

export default User