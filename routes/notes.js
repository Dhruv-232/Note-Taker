const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express.Router();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"))
})

app.post("/", (req, res) => {
  console.log("Post route")
  let notes = JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"), "utf-8"));
  let note = req.body;
  let id = notes.length.toString();
  note.id = id;
  notes.push(note);

  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes));
  res.json(notes);
})

module.exports = app;