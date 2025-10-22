import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  duration: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Song = mongoose.model("song", songSchema);
export default Song;
