const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const Users = require("./models/usersModal");
// Import Routes
const userRoutes = require("./routes/users");
const playlistRoutes = require("./routes/playlists");
const songRoutes = require("./routes/songs");

const PORT = 8000;
// const CONNECTION_URL = "mongodb+srv://music:system2024@musicsystem.b4ps5zm.mongodb.net/music-system";
const CONNECTION_URL = "mongodb://localhost:27017/music-system";

app.use(cors({
    origin: ["http://localhost:3000", "https://music-playlist-client.vercel.app"]
}));
app.use(express.json());


app.use("/user", userRoutes);
app.use("/playlist", playlistRoutes);
app.use("/songs", songRoutes);

app.get("/", (req, res) => {
    return res.send({ message: "Server for Music System is Started : Version - 1" });
});
app.get("/vercel", (req, res) => {
    return res.send({ message: "Express running on vercel : Version -  1" });
});
app.get("/test", async (req, res) => {
    try {
        const data = await Users.find({});
        console.log("data :::: ", data);
        return res.send({ message: "Test Data", data: data });
    } catch (error) {
        return res.send({ message: "Error", data: error.message });
    }
});

app.listen(PORT, () => {
    console.log("Server is running on port 8000");
    mongoose.connect(CONNECTION_URL).then(() => {
        console.log("Database is connected successfully");
    });
});