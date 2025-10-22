import express from "express";
import Playlist from "../models/playlistModel.mjs";

const router = express.Router();

// Get all playlists 
router.get("/", async (req, res) => {
    try {
        const playlists = await Playlist.find()
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: err.message});

    }
});

// POST a new playlist
router.post("/", async (req, res) => {
    const playlist = new Playlist(req.body);
    try {
        const newPlaylist = await playlist.save();
        res.status(201).json(newPlaylist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    
    }
});

// PATCH a playlist by ID
router.patch("/:id", async (req, res) => {
    try {

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            req.params.id,  
            req.body,       
            { new: true }   
        );

        if (!updatedPlaylist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.json(updatedPlaylist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a playlist by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);

        if (!deletedPlaylist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.json({ message: "Playlist deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;