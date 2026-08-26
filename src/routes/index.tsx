import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  ListChecks,
  Telescope,
  MessagesSquare,
  ArrowRight,
  Clock,
  Sparkle,
  ShieldCheck,
  Zap,
  Wand2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsibleAiNotice } from "@/components/responsible-ai";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EnO — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate workplace tasks with AI: draft emails, summarize meetings, plan work, research topics and chat with an AI assistant.",
      },
      { property: "og:title", content: "EnO — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "One AI workspace for emails, meeting notes, task planning, research and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    copy: "Turn bullet points into polished, on-tone workplace emails.",
    tag: "Writing",
  },
  {
    to: "/meetings",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    copy: "Decisions, action items and owners from any transcript.",
    tag: "Summarize",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "AI Task Planner",
    copy: "Prioritised, time-blocked plans built around your capacity.",
    tag: "Planning",
  },
  {
    to: "/research",
    icon: Telescope,
    title: "AI Research Assistant",
    copy: "Structured briefings, comparisons and recommendations.",
    tag: "Research",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "AI Chatbot",
    copy: "A conversational assistant for everything in between.",
    tag: "Chat",
  },
] as const;

const stats = [
  { label: "Structured prompt templates", value: "5", icon: Sparkle },
  { label: "Editable, exportable outputs", value: "100%", icon: Clock },
  { label: "Human-in-the-loop by design", value: "Always", icon: ShieldCheck },
];

const highlights = [
  {
    icon: Wand2,
    title: "Guided prompts",
    copy: "Every tool asks the right questions, so the AI answers with real context.",
  },
  {
    icon: Zap,
    title: "Instant drafts",
    copy: "Streamed generation in seconds — then edit, copy or export as Markdown.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible by default",
    copy: "Clear disclaimers and a human decision-maker on every output.",
  },
];

function Dashboard() {
  return (
    <div className="space-y-12">
      <section className="bg-hero-gradient shadow-elegant relative overflow-hidden rounded-[2rem] p-8 text-primary-foreground md:p-14">
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="animate-float pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-accent/50 blur-3xl" />
        <div className="animate-drift pointer-events-none absolute -bottom-32 right-32 size-80 rounded-full bg-maroon/50 blur-3xl" />
        <div className="animate-drift pointer-events-none absolute -left-24 bottom-0 size-72 rounded-full bg-primary-glow/40 blur-3xl" />

        <div className="relative max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <Sparkle className="size-3.5" /> Powered by Lovable AI
          </span>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Do the thinking.
            <br />
            Let EnO do the typing.
          </h1>
          <p className="max-w-xl text-base opacity-90 md:text-lg">
            EnO automates the writing, planning and research work around your job — five AI
            modules in one calm, purple-lit workspace.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" variant="secondary" className="rounded-full px-6 shadow-lg">
              <Link to="/email">
                Start with an email <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 px-6 backdrop-blur hover:bg-white/20"
            >
              <Link to="/chat">Open the chatbot</Link>
            </Button>
          </div>

          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <stat.icon className="size-4 opacity-80" />
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="text-[11px] uppercase tracking-wider opacity-75">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Modules
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Your <span className="text-gradient">AI workspace</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Pick a module, answer a few guided fields, and get an editable draft in seconds.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool, i) => (
            <Link key={tool.to} to={tool.to} className="group">
              <Card
                className="glass card-lift gradient-border animate-rise h-full overflow-hidden rounded-2xl"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <span className="bg-ember-gradient flex size-11 items-center justify-center rounded-2xl text-maroon-foreground shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <tool.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {tool.tag}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{tool.copy}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Open
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="glass rounded-2xl p-6">
            <span className="bg-primary-gradient mb-4 flex size-10 items-center justify-center rounded-xl text-primary-foreground">
              <item.icon className="size-5" />
            </span>
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
          </div>
        ))}
      </section>

      <ResponsibleAiNotice />
    </div>
  );
}
