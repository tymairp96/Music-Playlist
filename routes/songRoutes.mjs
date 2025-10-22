import express from "express";
import Song from "../models/songModel.mjs";

const router = express.Router();

// Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new song
router.post("/", async (req, res) => {
  const song = new Song(req.body);
  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH a song by ID
router.patch("/:id", async (req, res) => {
  try {
    // Find the song by ID and update
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a song by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSong = await Song.findByidAndDelete(req.params.id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json({ message: "Song deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
