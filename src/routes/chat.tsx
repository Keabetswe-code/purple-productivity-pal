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
      { title: "AI Chatbot | EnO Workplace AI" },
      {
        name: "description",
        content:
          "Chat with EnO, an AI workplace assistant that drafts, plans, summarizes and researches alongside you.",
      },
      { property: "og:title", content: "AI Chatbot | EnO Workplace AI" },
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
    <div className="flex flex-col gap-8">
      <header className="bg-hero-gradient shadow-elegant relative flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] p-7 text-primary-foreground md:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
        <div className="animate-float pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-accent/50 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur">
            <MessagesSquare className="size-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">AI Chatbot</h1>
            <p className="mt-1 text-sm opacity-85 md:text-base">
              Ask EnO anything about your work day.
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="secondary" size="sm" className="relative rounded-full" onClick={() => setMessages([])}>
            <RotateCcw /> New conversation
          </Button>
        )}
      </header>

      <div className="glass gradient-border flex min-h-[58vh] flex-col overflow-hidden rounded-2xl">
        <Conversation className="flex-1">
          <ConversationContent>
            {messages.length === 0 && (
              <div className="mx-auto max-w-md space-y-4 py-14 text-center">
                <span className="bg-primary-gradient animate-pulse-ring mx-auto flex size-12 items-center justify-center rounded-2xl text-primary-foreground">
                  <MessagesSquare className="size-5" />
                </span>
                <p className="text-sm text-muted-foreground">
                  Start a conversation, or try one of these:
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      style={{ animationDelay: `${i * 70}ms` }}
                      className="animate-rise card-lift rounded-xl border border-border/70 bg-secondary/50 px-4 py-3 text-left text-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}


            {messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <MessageResponse key={index}>{part.text}</MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))}

            {status === "submitted" && <Shimmer>EnO is thinking…</Shimmer>}
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  submit(input);
                }
              }}
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
