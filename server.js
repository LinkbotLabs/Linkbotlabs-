const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

// Your Google API key and CSE ID
const API_KEY = "AIzaSyB9YwW8EVXQJsVwSMbJrk-NU9B9ZrzzkGs";
const CX = "f7e219616fe1d4629";

app.use(express.static("public")); // serve your HTML & JS

// Endpoint to search Google for a product
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send({ error: "Missing query" });

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    res.json(data.items || []);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Google search failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
