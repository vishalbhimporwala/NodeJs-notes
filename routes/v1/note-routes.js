const express = require('express');
const NoteController = require('../../controllers/notes/note-controller');

const noteRouter = express.Router();
const noteController = new NoteController();

noteRouter .post("/create",noteController.createNote);
noteRouter .get("/fetch",noteController.fetchAllNotes);
noteRouter .post("/update",noteController.updateNote);

module.exports = noteRouter ;