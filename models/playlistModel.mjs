import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Playlist name is required"],
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "song"
    }]
});

export default mongoose.model("Playlist", playlistSchema);
