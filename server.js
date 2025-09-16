const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;


app.get("/api/emojis", async (req, res) => {
  try {
    const response = await axios.get("https://emojihub.yurace.pro/api/all");
    let data = response.data;


    const { search, category, letter } = req.query;

    if (category && category !== "All") {
      data = data.filter((e) =>
        e.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (letter && letter !== "All") {
      data = data.filter((e) => e.name[0].toUpperCase() === letter.toUpperCase());
    }

    if (search) {
      data = data.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error" });
  }
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
