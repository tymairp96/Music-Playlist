import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
 
import songRoutes from "./routes/songRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import playlistRoutes from "./routes/playlistRoutes.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT;



app.use(express.json());


// Routes
app.use("/api/songs", songRoutes);
app.use("/api/users", userRoutes);
app.use("/api/playlists", playlistRoutes);



mongoose 
.connect(process.env.MONGO_URI)
.then(() => console.log(" connected to MongoDB"))
.catch ((err) => console.error(" MongoDB connection error", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
