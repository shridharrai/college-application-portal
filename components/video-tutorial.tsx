"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  BookOpen,
  PenTool,
} from "lucide-react";
import { useVideoProgress } from "@/hooks/use-video-progress";

const TUTORIALS = [
  {
    id: 1,
    title: "Getting Started with College Applications",
    duration: "15:30",
    description:
      "Learn the basics of college applications and what you need to prepare.",
    transcript: `Welcome to our comprehensive guide on college applications. In this tutorial, we'll cover the essential steps you need to take when applying to colleges.

First, let's talk about the timeline. Most college applications are due between November and January of your senior year. However, preparation should start much earlier - ideally in your junior year.

The key components of a college application include:
1. Common Application or school-specific application
2. High school transcript
3. Standardized test scores (SAT/ACT)
4. Letters of recommendation
5. Personal essay or statement
6. Extracurricular activities list
7. Application fee

Let's dive deeper into each of these components...`,
  },
  {
    id: 2,
    title: "Writing Compelling Personal Essays",
    duration: "22:45",
    description:
      "Master the art of writing personal statements that stand out.",
    transcript: `Your personal essay is one of the most important parts of your college application. It's your chance to show admissions officers who you are beyond your grades and test scores.

Here are the key elements of a strong personal essay:
1. A compelling hook that grabs attention
2. A clear narrative structure
3. Specific examples and details
4. Reflection and insight
5. Your authentic voice

Common mistakes to avoid:
- Writing what you think admissions officers want to hear
- Using clichés or generic statements
- Focusing too much on achievements rather than personal growth
- Poor grammar and spelling errors

Let's look at some examples of effective essay openings...`,
  },
];

export function VideoTutorial() {
  const [selectedTutorial, setSelectedTutorial] = useState(TUTORIALS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { progress, updateProgress, notes, addNote } = useVideoProgress(
    selectedTutorial.id
  );
  const [currentNote, setCurrentNote] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stop playing when tutorial changes
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, [selectedTutorial.id]);

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause the video
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Play the video
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        updateProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsPlaying(false);
            return 100;
          }
          return newProgress;
        });
      }, 1000);
    }
  };

  const handleSkipBack = () => {
    updateProgress(Math.max(0, progress - 10));
  };

  const handleSkipForward = () => {
    updateProgress(Math.min(100, progress + 10));
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleAddNote = () => {
    if (currentNote.trim()) {
      addNote(currentNote, progress);
      setCurrentNote("");
    }
  };

  const handleTutorialSelect = (tutorial: (typeof TUTORIALS)[0]) => {
    setSelectedTutorial(tutorial);
    // Focus management for accessibility
    const videoPlayer = document.getElementById("video-player");
    if (videoPlayer) {
      videoPlayer.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" aria-hidden="true" />
              {selectedTutorial.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {selectedTutorial.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Video Player Placeholder */}
              <div
                id="video-player"
                className="aspect-video bg-black rounded-lg flex items-center justify-center relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                tabIndex={0}
                role="application"
                aria-label={`Video player for ${selectedTutorial.title}`}
                aria-describedby="video-description"
              >
                <div className="text-white text-center">
                  <Play className="h-16 w-16 mx-auto mb-4" aria-hidden="true" />
                  <p className="text-lg">Video Player Placeholder</p>
                  <p className="text-sm opacity-75">
                    {selectedTutorial.duration}
                  </p>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20 focus:bg-white/20"
                      onClick={handleSkipBack}
                      aria-label="Skip back 10 seconds"
                    >
                      <SkipBack className="h-4 w-4" aria-hidden="true" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20 focus:bg-white/20"
                      onClick={handlePlayPause}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      aria-pressed={isPlaying}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Play className="h-4 w-4" aria-hidden="true" />
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20 focus:bg-white/20"
                      onClick={handleSkipForward}
                      aria-label="Skip forward 10 seconds"
                    >
                      <SkipForward className="h-4 w-4" aria-hidden="true" />
                    </Button>

                    <div className="flex-1 mx-4">
                      <Progress
                        value={progress}
                        className="h-2"
                        aria-label={`Video progress: ${Math.round(
                          progress
                        )}% complete`}
                      />
                    </div>

                    <span className="text-white text-sm" aria-live="polite">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
              </div>

              <div
                id="video-description"
                className="flex items-center justify-between"
              >
                <Badge
                  variant="secondary"
                  aria-label={`Video progress: ${Math.round(
                    progress
                  )} percent complete`}
                >
                  Progress: {Math.round(progress)}%
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Duration: {selectedTutorial.duration}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              role="region"
              aria-label="Video transcript"
            >
              <p className="whitespace-pre-line">
                {selectedTutorial.transcript}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tutorial Playlist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <nav aria-label="Tutorial playlist">
              {TUTORIALS.map((tutorial) => (
                <Button
                  key={tutorial.id}
                  variant={
                    selectedTutorial.id === tutorial.id ? "default" : "outline"
                  }
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleTutorialSelect(tutorial)}
                  aria-pressed={selectedTutorial.id === tutorial.id}
                  aria-describedby={`tutorial-${tutorial.id}-description`}
                >
                  <div>
                    <p className="font-medium">{tutorial.title}</p>
                    <p
                      id={`tutorial-${tutorial.id}-description`}
                      className="text-xs opacity-75"
                    >
                      {tutorial.duration} - {tutorial.description}
                    </p>
                  </div>
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PenTool className="h-4 w-4" aria-hidden="true" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="note-input" className="sr-only">
                Add a note at current video timestamp
              </label>
              <Textarea
                id="note-input"
                placeholder="Take notes while watching..."
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                className="min-h-[100px]"
                aria-describedby="note-help"
              />
              <p id="note-help" className="text-xs text-muted-foreground mt-1">
                Your note will be saved with the current video timestamp
              </p>
              <Button
                onClick={handleAddNote}
                className="w-full mt-2"
                disabled={!currentNote.trim()}
                aria-describedby="note-timestamp"
              >
                <span id="note-timestamp">
                  Add Note at {Math.round(progress)}%
                </span>
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Your Notes</h4>
              {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notes yet</p>
              ) : (
                <div
                  className="space-y-2 max-h-48 overflow-y-auto"
                  role="log"
                  aria-label="Notes list"
                  aria-live="polite"
                >
                  {notes.map((note, index) => (
                    <div
                      key={index}
                      className="p-2 bg-muted rounded text-sm"
                      role="article"
                      aria-labelledby={`note-${index}-timestamp`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <Badge
                          variant="outline"
                          className="text-xs"
                          id={`note-${index}-timestamp`}
                        >
                          {note.timestamp}%
                        </Badge>
                      </div>
                      <p>{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
