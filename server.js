const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve frontend files

const API_URL = "https://p.oceansaver.in/ajax/download.php?format=mp3&url=";

app.get("/search", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    try {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=YOUR_YOUTUBE_API_KEY`;
        const response = await axios.get(searchUrl);
        const results = response.data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high.url
        }));

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch search results" });
    }
});

app.get("/download", async (req, res) => {
    const { videoId } = req.query;
    if (!videoId) return res.status(400).json({ error: "Video ID is required" });

    try {
        const downloadUrl = `${API_URL}https://www.youtube.com/watch?v=${videoId}`;
        res.json({ success: true, downloadUrl });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate download link" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));