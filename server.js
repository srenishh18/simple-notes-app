const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const port = 3000;
const mongoUri = "mongodb://127.0.0.1:27017/notes_app";
let notes;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/notes", async (req, res) => {
  res.json(await notes.find().sort({ _id: -1 }).toArray());
});

app.post("/api/notes", async (req, res) => {
  const text = String((req.body && req.body.text) || "").trim();
  if (!text) {
    return res.status(400).json({ error: "Write a note first." });
  }

  const result = await notes.insertOne({ text });
  res.status(201).json({ _id: result.insertedId, text });
});

app.delete("/api/notes/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid note ID." });
  }

  const result = await notes.deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Note not found." });
  }
  res.sendStatus(204);
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ error: "Something went wrong." });
});

async function start() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  notes = client.db().collection("notes");
  app.listen(port, () => {
    console.log(`Open http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Could not connect to MongoDB Community Server. Is it running?", error.message);
  process.exitCode = 1;
});
