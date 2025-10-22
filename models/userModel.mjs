import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  playlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
    },
  ],
});

export default mongoose.model("User", userSchema);
