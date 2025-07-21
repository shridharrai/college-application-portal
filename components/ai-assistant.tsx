"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Search, Trash2 } from "lucide-react";
import { useChatHistory } from "@/hooks/use-chat-history";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import type { Message } from "ai";

export function AIAssistant() {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial messages from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setInitialMessages(parsedHistory);
      } catch (error) {
        console.error("Error loading initial chat history:", error);
        setInitialMessages([]);
      }
    }
    setIsInitialized(true);
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: initialMessages,
    });

  const { searchHistory, clearHistory } = useChatHistory(messages);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = searchQuery ? searchHistory(searchQuery) : messages;

  // Don't render until we've loaded the initial messages
  if (!isInitialized) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Loading chat history...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Assistant
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search chat history..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-48"
                  />
                </div>
                <Button
                  onClick={clearHistory}
                  variant="outline"
                  size="sm"
                  title="Clear chat history"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <ScrollArea
              className="flex-1 pr-4"
              role="log"
              aria-label="Chat conversation"
              aria-live="polite"
            >
              <div className="space-y-4">
                {filteredMessages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation with your AI assistant!</p>
                    <p className="text-sm mt-2">
                      Ask about application requirements, essay tips, or any
                      college-related questions.
                    </p>
                  </div>
                )}

                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    role="article"
                    aria-label={`${
                      message.role === "user" ? "Your message" : "AI response"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <MarkdownRenderer content={message.content} />
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          AI is typing...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSubmit}
              className="flex gap-2 mt-4"
              role="search"
            >
              <label htmlFor="chat-input" className="sr-only">
                Ask a question about college applications
              </label>
              <Input
                id="chat-input"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything about college applications..."
                disabled={isLoading}
                className="flex-1"
                aria-describedby="chat-help"
              />
              <p id="chat-help" className="sr-only">
                Type your question and press enter or click send to get AI
                assistance
              </p>
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto p-3 bg-transparent"
              onClick={() =>
                handleInputChange({
                  target: {
                    value:
                      "What documents do I need for my college application?",
                  },
                } as any)
              }
            >
              What documents do I need?
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto p-3 bg-transparent"
              onClick={() =>
                handleInputChange({
                  target: {
                    value: "How do I write a compelling personal statement?",
                  },
                } as any)
              }
            >
              Personal statement tips
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto p-3 bg-transparent"
              onClick={() =>
                handleInputChange({
                  target: { value: "What are the application deadlines?" },
                } as any)
              }
            >
              Application deadlines
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto p-3 bg-transparent"
              onClick={() =>
                handleInputChange({
                  target: {
                    value: "How can I improve my chances of acceptance?",
                  },
                } as any)
              }
            >
              Improve acceptance chances
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Chat Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Messages:</span>
                <Badge variant="secondary">{messages.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Questions Asked:</span>
                <Badge variant="secondary">
                  {messages.filter((m) => m.role === "user").length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">AI Responses:</span>
                <Badge variant="secondary">
                  {messages.filter((m) => m.role === "assistant").length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {messages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {messages
                  .filter((m) => m.role === "user")
                  .slice(-3)
                  .map((message, index) => (
                    <p
                      key={index}
                      className="text-xs text-muted-foreground truncate"
                    >
                      • {message.content.substring(0, 40)}...
                    </p>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
