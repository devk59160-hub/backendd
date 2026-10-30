import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdata",
    required: true
  },
  userIddata: {
    type: String,
    required: true
  },
  idpadata: {
    type: String,
    required: true
  }
});

const userdata = mongoose.model("textdata", userschema);

export default userdata;