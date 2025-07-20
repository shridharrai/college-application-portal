"use client"

import { useState, useEffect } from "react"
import type { Message } from "ai"

export function useChatHistory(messages: Message[]) {
  const [chatHistory, setChatHistory] = useState<Message[]>([])

  useEffect(() => {
    setChatHistory(messages)
    // Save to localStorage
    localStorage.setItem("chatHistory", JSON.stringify(messages))
  }, [messages])

  const searchHistory = (query: string): Message[] => {
    if (!query.trim()) return messages

    return messages.filter((message) => message.content.toLowerCase().includes(query.toLowerCase()))
  }

  const clearHistory = () => {
    setChatHistory([])
    localStorage.removeItem("chatHistory")
    window.location.reload() // Simple way to clear chat state
  }

  return {
    chatHistory,
    searchHistory,
    clearHistory,
  }
}
