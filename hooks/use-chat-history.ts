"use client";

import { useState, useEffect } from "react";
import type { Message } from "ai";

export function useChatHistory(messages: Message[]) {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error("Error loading chat history:", error);
        setChatHistory([]);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      setChatHistory(messages);
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  const searchHistory = (query: string): Message[] => {
    if (!query.trim()) return chatHistory;

    return chatHistory.filter((message) =>
      message.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
    // Force a page reload to clear the useChat state
    window.location.reload();
  };

  return {
    chatHistory,
    searchHistory,
    clearHistory,
  };
}
