import express from "express";
import User from "../models/userModel.mjs";
import Song from "../models/songModel.mjs";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const usersWithSongs = [];

    for (const user of users) {
      const fullPlaylist = [];
      for (const songId of user.playlist) {
        const song = await Song.findById(songId);
        if (song) fullPlaylist.push(song);
      }
      usersWithSongs.push({
        _id: user._id,
        name: user.name,
        email: user.email,
        playlist: fullPlaylist,
      });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH a users playlist
router.patch("/:id/playlist", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.playlist = req.body.playlist || user.playlist;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete a user by ID
router.delete("/:id", async (req, res) =>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found"});
        }
        res.json ({ message: "User deleted successfully"});
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
})

export default router;
