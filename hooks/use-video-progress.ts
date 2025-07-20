"use client";

import { useState, useEffect } from "react";

interface Note {
  content: string;
  timestamp: number;
  createdAt: Date;
}

export function useVideoProgress(videoId: number) {
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);

  const storageKey = `video_${videoId}`;
  const notesKey = `notes_${videoId}`;

  // Reset progress and notes when videoId changes
  useEffect(() => {
    // Load saved progress for this specific video
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      setProgress(Number.parseInt(savedProgress));
    } else {
      setProgress(0); // Reset to 0 if no saved progress
    }

    // Load saved notes for this specific video
    const savedNotes = localStorage.getItem(notesKey);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Error loading notes:", error);
        setNotes([]); // Reset to empty array on error
      }
    } else {
      setNotes([]); // Reset to empty array if no saved notes
    }
  }, [videoId, storageKey, notesKey]); // Add videoId as dependency

  const updateProgress = (newProgress: number | ((prev: number) => number)) => {
    setProgress((prev) => {
      const updated =
        typeof newProgress === "function" ? newProgress(prev) : newProgress;
      localStorage.setItem(storageKey, updated.toString());
      return updated;
    });
  };

  const addNote = (content: string, timestamp: number) => {
    const newNote: Note = {
      content,
      timestamp: Math.round(timestamp),
      createdAt: new Date(),
    };

    setNotes((prev) => {
      const updated = [...prev, newNote].sort(
        (a, b) => a.timestamp - b.timestamp
      );
      localStorage.setItem(notesKey, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    progress,
    updateProgress,
    notes,
    addNote,
  };
}
