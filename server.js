import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());


app.get("/api/emojis", async (req, res) => {
  try {
    const response = await fetch("https://emojihub.yurace.pro/api/all");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching emojis:", error);
    res.status(500).json({ error: "Failed to fetch emojis" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
