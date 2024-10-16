import React, { useState } from "react";
import "./App.css";
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";

function App() {
  // State to store the list of notes
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);

  // State to handle note creation
  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState<Note>(initialNote);

  // State to track selected note for editing
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // State to handle theme toggle (light/dark)
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Toggle favorite status for a note
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Handle new note creation
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createNote.id = notes.length + 1; // Assign new note ID based on the length
    setNotes([createNote, ...notes]); // Add new note to the notes array
    setCreateNote(initialNote); // Reset the form
  };

  // Handle note update
  const updateNoteHandler = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setSelectedNote(null); // Close the editing mode
  };
