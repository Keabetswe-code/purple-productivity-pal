# Aurora — AI Workplace Productivity Assistant

A modern, responsive SaaS-style web app that helps professionals automate everyday workplace
tasks with AI: drafting emails, summarizing meetings, planning work, researching topics and
chatting with an assistant.

## Features

| Module | What it does |
| --- | --- |
| **Smart Email Generator** (`/email`) | Structured prompt (recipient, purpose, tone, length, key points) → polished email draft. |
| **Meeting Notes Summarizer** (`/meetings`) | Paste a transcript → summary, key decisions, action items with owners, risks. |
| **AI Task Planner** (`/planner`) | Goals + capacity + working style → prioritised, time-blocked plan with next actions. |
| **AI Research Assistant** (`/research`) | Research question + context → overview, findings, options, recommendation, what to verify. |
| **AI Chatbot** (`/chat`) | Streaming conversational assistant for anything in between. |

Every generated output is **editable** (edit/preview toggle), copyable and downloadable as
Markdown. Each screen carries a **Responsible AI disclaimer**.

## Design

- Purple-led SaaS palette with orange and maroon accents on a clean white/near-white surface.
- All colors, gradients and shadows are semantic tokens in `src/styles.css` (oklch).
- Collapsible sidebar navigation, sticky header, fully responsive from mobile to desktop.

## Tech stack

- **Framework:** TanStack Start (React 19, Vite 7, SSR)
- **Routing:** TanStack Router (file-based, `src/routes`)
- **Styling:** Tailwind CSS v4 + shadcn/ui + AI Elements
- **AI:** Vercel AI SDK via the Lovable AI Gateway (`google/gemini-3.7-flash`)

## Project structure

```
src/
  components/
    ai-elements/        Chat primitives (conversation, message, prompt input, shimmer)
    ui/                 shadcn/ui components
    app-sidebar.tsx     Sidebar navigation
    tool-workspace.tsx  Shared prompt form + editable output surface
    responsible-ai.tsx  Responsible AI disclaimer
  lib/
    ai-gateway.server.ts  Server-only AI Gateway provider
    ai.functions.ts       Server function powering the 4 generator tools
  routes/
    __root.tsx          App shell (sidebar, header, footer, toasts, metadata)
    index.tsx           Dashboard
    email | meetings | planner | research | chat
    api/chat.ts         Streaming chat endpoint (AI SDK UI message stream)
```

## Backend

There is no separate server to run — backend logic lives in the same app:

- `src/lib/ai.functions.ts` — a typed `createServerFn` RPC endpoint. It validates input with Zod,
  selects a tool-specific system prompt, calls the model and returns the completed text.
- `src/routes/api/chat.ts` — an HTTP POST route that streams chat responses back to the browser
  using the AI SDK UI message stream protocol.
- `src/lib/ai-gateway.server.ts` — creates the AI Gateway provider. Server-only.

The `LOVABLE_API_KEY` secret is injected at runtime and is **never** exposed to the browser.

## Frontend

- `ToolWorkspace` renders the structured prompt form (text, textarea and select fields), calls the
  server function, renders Markdown output and supports inline editing, copy and download.
- The chat page uses `useChat` with `DefaultChatTransport` pointed at `/api/chat`, rendering
  `message.parts`, an optimistic thinking state and a focused composer. It is a single
  session conversation — "New conversation" clears it.

## Running locally

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # production build
bun run lint
```

## Responsible AI

Aurora produces drafts that can be incomplete or inaccurate. Review and edit every output, avoid
entering confidential or personal data, and keep a human accountable for anything sent or acted
upon. AI outputs are not legal, financial, medical or HR advice.
