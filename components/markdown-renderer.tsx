"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const renderMarkdown = (text: string) => {
    // Split content into lines for processing
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let listType: "ul" | "ol" | null = null;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = "";

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          React.createElement(
            listType || "ul",
            {
              key: `list-${elements.length}`,
              className: "list-disc list-inside mb-4 space-y-1",
            },
            currentList
          )
        );
        currentList = [];
        listType = null;
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre
            key={`code-${elements.length}`}
            className="bg-muted p-4 rounded-lg overflow-x-auto mb-4"
          >
            <code
              className={`text-sm ${
                codeBlockLanguage ? `language-${codeBlockLanguage}` : ""
              }`}
            >
              {codeBlockContent.join("\n")}
            </code>
          </pre>
        );
        codeBlockContent = [];
        codeBlockLanguage = "";
      }
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Handle empty lines
      if (line.trim() === "") {
        flushList();
        if (elements.length > 0) {
          elements.push(<br key={`br-${index}`} />);
        }
        return;
      }

      // Handle headers
      if (line.startsWith("# ")) {
        flushList();
        elements.push(
          <h1 key={`h1-${index}`} className="text-2xl font-bold mb-4 mt-6">
            {line.slice(2)}
          </h1>
        );
        return;
      }

      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={`h2-${index}`} className="text-xl font-semibold mb-3 mt-5">
            {line.slice(3)}
          </h2>
        );
        return;
      }

      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg font-medium mb-2 mt-4">
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // Handle blockquotes
      if (line.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="border-l-4 border-primary pl-4 italic mb-4 text-muted-foreground"
          >
            {renderInlineMarkdown(line.slice(2))}
          </blockquote>
        );
        return;
      }

      // Handle unordered lists
      if (line.match(/^[\s]*[-*+]\s/)) {
        if (listType !== "ul") {
          flushList();
          listType = "ul";
        }
        const content = line.replace(/^[\s]*[-*+]\s/, "");
        currentList.push(
          <li key={`li-${index}`} className="mb-1">
            {renderInlineMarkdown(content)}
          </li>
        );
        return;
      }

      // Handle ordered lists
      if (line.match(/^[\s]*\d+\.\s/)) {
        if (listType !== "ol") {
          flushList();
          listType = "ol";
        }
        const content = line.replace(/^[\s]*\d+\.\s/, "");
        currentList.push(
          <li key={`li-${index}`} className="mb-1">
            {renderInlineMarkdown(content)}
          </li>
        );
        return;
      }

      // Handle horizontal rules
      if (line.match(/^[-*_]{3,}$/)) {
        flushList();
        elements.push(
          <hr key={`hr-${index}`} className="my-6 border-border" />
        );
        return;
      }

      // Handle regular paragraphs
      flushList();
      if (line.trim()) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed">
            {renderInlineMarkdown(line)}
          </p>
        );
      }
    });

    // Flush any remaining lists or code blocks
    flushList();
    flushCodeBlock();

    return elements;
  };

  const renderInlineMarkdown = (text: string): React.ReactNode => {
    // Handle inline code
    text = text.replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>'
    );

    // Handle bold text
    text = text.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );
    text = text.replace(
      /__([^_]+)__/g,
      '<strong class="font-semibold">$1</strong>'
    );

    // Handle italic text
    text = text.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
    text = text.replace(/_([^_]+)_/g, '<em class="italic">$1</em>');

    // Handle strikethrough
    text = text.replace(/~~([^~]+)~~/g, '<del class="line-through">$1</del>');

    // Handle links
    text = text.replace(
      /\[([^\]]+)\]$$([^)]+)$$/g,
      '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Handle auto-links
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      {renderMarkdown(content)}
    </div>
  );
}
