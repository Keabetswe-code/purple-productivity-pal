# EnO — AI Workplace Productivity Assistant

## Project Overview

**EnO** is a modern, responsive SaaS-style web application designed to help professionals improve workplace productivity using Artificial Intelligence (AI).

The application provides AI-powered tools for common workplace activities, including writing professional emails, summarising meeting notes, planning tasks, researching topics, and communicating with an AI assistant.

The application has a clean and modern user interface built around a **purple-led colour palette**, with **orange, maroon, white, and near-white accents**. The design is responsive and works across desktop, tablet, and mobile devices.

EnO uses AI to assist users with workplace tasks while maintaining a **Responsible AI approach**. Users are reminded to review AI-generated content, avoid entering confidential information, and remain accountable for decisions and actions based on AI outputs.

---

## 1. Features Implemented

### Smart Email Generator

**Route:** `/email`

The Smart Email Generator helps users create professional email drafts using structured information.

Users can provide:

* Recipient
* Email purpose
* Tone
* Desired length
* Key points

The AI processes the information and generates a polished email draft that users can edit before using.

### Meeting Notes Summarizer

**Route:** `/meetings`

The Meeting Notes Summarizer allows users to paste a meeting transcript and receive an organised summary.

The generated output can include:

* Meeting summary
* Key decisions
* Action items
* Assigned owners
* Risks or important issues

This feature helps users quickly understand important information from meetings.

### AI Task Planner

**Route:** `/planner`

The AI Task Planner helps users organise their work and prioritise tasks.

Users provide information such as:

* Goals
* Available capacity
* Working style

The AI then generates a prioritised and time-blocked work plan containing practical next actions.

### AI Research Assistant

**Route:** `/research`

The AI Research Assistant helps users explore workplace and general research questions.

Users provide a research question and relevant context. The assistant generates:

* Overview
* Key findings
* Available options
* Recommendation
* Information that should be independently verified

### AI Chatbot

**Route:** `/chat`

The AI Chatbot provides a conversational interface where users can communicate with an AI assistant.

The chatbot supports:

* Conversational questions
* Follow-up questions
* Streaming AI responses
* A focused message composer
* Starting a new conversation

### Editable AI Outputs

All generated outputs can be:

* Edited
* Previewed
* Copied
* Downloaded as Markdown

This allows users to review and customise AI-generated content before using it.

### Responsive User Interface

The application is designed to work across:

* Desktop computers
* Tablets
* Mobile devices

The interface includes a collapsible sidebar, sticky header, responsive layouts, and consistent navigation.

### Responsible AI Disclaimer

Each AI tool includes a Responsible AI disclaimer.

Users are reminded that AI-generated content may be incomplete or inaccurate and should therefore be reviewed before being relied upon.

---

## 2. Technologies and Tools Used

### Frontend

* **React 19** — Used to build the application's user interface.
* **TanStack Start** — Used as the full-stack React framework.
* **TanStack Router** — Used for file-based application routing.
* **Vite 7** — Used as the development and build tool.
* **Tailwind CSS v4** — Used for responsive styling and layout.
* **shadcn/ui** — Used for reusable user interface components.
* **AI Elements** — Used for AI-related interface components such as chat messages, prompts, conversations, and loading states.

### Backend

The application does not require a separate backend server. Backend functionality is integrated into the TanStack Start application.

Important backend files include:

* `src/lib/ai.functions.ts`
* `src/lib/ai-gateway.server.ts`
* `src/routes/api/chat.ts`

### Artificial Intelligence

* **Vercel AI SDK** — Used to integrate AI functionality into the application.
* **Lovable AI Gateway** — Used as the AI gateway provider.
* **Google Gemini 3.7 Flash** — Used as the AI model.
* **Zod** — Used for input validation.

### Development Tools

* **Bun** — Used as the JavaScript runtime and package manager.
* **Visual Studio Code** — Used as the development environment.
* **Git** — Used for version control.
* **GitHub** — Used for source-code hosting and project management.

---

## 3. Project Structure

```text
src/
├── components/
│   ├── ai-elements/
│   │   └── Chat primitives such as conversation,
│   │       message, prompt input and shimmer
│   │
│   ├── ui/
│   │   └── shadcn/ui components
│   │
│   ├── app-sidebar.tsx
│   │   └── Sidebar navigation
│   │
│   ├── tool-workspace.tsx
│   │   └── Shared prompt form and editable output surface
│   │
│   └── responsible-ai.tsx
│       └── Responsible AI disclaimer
│
├── lib/
│   ├── ai-gateway.server.ts
│   │   └── Server-only AI Gateway provider
│   │
│   └── ai.functions.ts
│       └── Server functions powering the AI generator tools
│
└── routes/
    ├── __root__.tsx
    │   └── Application shell
    │
    ├── index.tsx
    │   └── Dashboard
    │
    ├── email
    │   └── Smart Email Generator
    │
    ├── meetings
    │   └── Meeting Notes Summarizer
    │
    ├── planner
    │   └── AI Task Planner
    │
    ├── research
    │   └── AI Research Assistant
    │
    ├── chat
    │   └── AI Chatbot
    │
    └── api/
        └── chat.ts
            └── Streaming chat endpoint
```

---

## 4. Setup Instructions

### Prerequisites

Before running the project, make sure the following are installed:

* Bun
* Git
* Visual Studio Code
* A valid Lovable AI Gateway API key

### Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/Keabetswe-code/purple-productivity-pal.git
```

Move into the project directory:

```bash
cd purple-productivity-pal
```

### Install Dependencies

Install the required project dependencies using Bun:

```bash
bun install
```

### Configure the API Key

The application requires the `LOVABLE_API_KEY` environment variable for AI functionality.

Create a `.env` file in the project root and add:

```env
LOVABLE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key.

**Important:** Do not commit your `.env` file or API key to GitHub.

### Run the Development Server

Start the application using:

```bash
bun run dev
```

The application will be available at:

```text
http://localhost:8080
```

### Build the Application

To create a production build, run:

```bash
bun run build
```

### Run Linting

To check the project for linting issues, run:

```bash
bun run lint
```

---

## Responsible AI

EnO is designed to support human productivity rather than replace human judgement.

AI-generated content may be incomplete, inaccurate, or unsuitable for a particular situation. Users should review and edit generated content before using it.

Users should:

* Review all AI-generated outputs.
* Avoid entering confidential or sensitive information.
* Verify important information independently.
* Remain responsible for anything sent, published, or acted upon.
* Avoid treating AI-generated responses as professional legal, financial, medical, or HR advice.

The AI assistant is intended to be a **productivity support tool**, with final decisions remaining with the user.

---

## Conclusion

EnO combines modern web development technologies with AI capabilities to provide a practical workplace productivity platform.

The application brings multiple workplace tools into one responsive interface, allowing users to generate emails, summarise meetings, plan tasks, conduct research, and communicate with an AI assistant from a single application.
