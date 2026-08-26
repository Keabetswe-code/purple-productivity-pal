import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { MessagesSquare, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { ResponsibleAiNotice } from "@/components/responsible-ai";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot | Aurora Workplace AI" },
      {
        name: "description",
        content:
          "Chat with Aurora, an AI workplace assistant that drafts, plans, summarizes and researches alongside you.",
      },
      { property: "og:title", content: "AI Chatbot | Aurora Workplace AI" },
      {
        property: "og:description",
        content: "A conversational AI assistant for everyday workplace tasks.",
      },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Draft a polite follow-up to a client who hasn't paid",
  "Help me prepare an agenda for a 30-minute standup",
  "Summarise the pros and cons of a 4-day work week",
];

function ChatPage() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
    onError: (error) => toast.error(error.message || "The assistant is unavailable right now."),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy]);

  function submit(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    void sendMessage({ text: value });
    setInput("");
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="bg-hero-gradient flex flex-wrap items-center justify-between gap-3 rounded-2xl p-6 text-primary-foreground shadow-elegant">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/15">
            <MessagesSquare className="size-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">AI Chatbot</h1>
            <p className="text-sm opacity-85">Ask Aurora anything about your work day.</p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="secondary" size="sm" onClick={() => setMessages([])}>
            <RotateCcw /> New conversation
          </Button>
        )}
      </header>

      <div className="flex min-h-[55vh] flex-col rounded-2xl border border-border bg-card shadow-soft">
        <Conversation className="flex-1">
          <ConversationContent>
            {messages.length === 0 && (
              <div className="mx-auto max-w-md space-y-4 py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Start a conversation, or try one of these:
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="rounded-xl border border-border bg-secondary/50 px-4 py-3 text-left text-sm transition-colors hover:bg-secondary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent variant={message.role === "user" ? "contained" : "flat"}>
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <MessageResponse key={index}>{part.text}</MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))}

            {status === "submitted" && <Shimmer>Aurora is thinking…</Shimmer>}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border p-4">
          <PromptInput
            onSubmit={(_message, event) => {
              event.preventDefault();
              submit(input);
            }}
          >
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              autoFocus
              placeholder="Ask about emails, planning, meetings or research…"
              onChange={(e) => setInput(e.target.value)}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={!input.trim() && !busy} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>

      <ResponsibleAiNotice />
    </div>
  );
}
