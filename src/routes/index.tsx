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
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsibleAiNotice } from "@/components/responsible-ai";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurora — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate workplace tasks with AI: draft emails, summarize meetings, plan work, research topics and chat with an AI assistant.",
      },
      { property: "og:title", content: "Aurora — AI Workplace Productivity Assistant" },
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
  },
  {
    to: "/meetings",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    copy: "Decisions, action items and owners from any transcript.",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "AI Task Planner",
    copy: "Prioritised, time-blocked plans built around your capacity.",
  },
  {
    to: "/research",
    icon: Telescope,
    title: "AI Research Assistant",
    copy: "Structured briefings, comparisons and recommendations.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "AI Chatbot",
    copy: "A conversational assistant for everything in between.",
  },
] as const;

const stats = [
  { label: "Structured prompt templates", value: "5", icon: Sparkle },
  { label: "Editable, exportable outputs", value: "100%", icon: Clock },
  { label: "Human-in-the-loop by design", value: "Always", icon: ShieldCheck },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="bg-hero-gradient relative overflow-hidden rounded-3xl p-8 text-primary-foreground shadow-elegant md:p-12">
        <div className="relative max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            <Sparkle className="size-3.5" /> Powered by Lovable AI
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            AI Workplace Productivity Assistant
          </h1>
          <p className="text-base opacity-90 md:text-lg">
            Aurora automates the writing, planning and thinking work around your job — so you
            spend your day on decisions, not drafts.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" variant="secondary">
              <Link to="/email">
                Start with an email <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 hover:bg-white/20"
            >
              <Link to="/chat">Open the chatbot</Link>
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-24 size-64 rounded-full bg-maroon/40 blur-3xl" />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-soft">
            <CardContent className="flex items-center gap-4 pt-6">
              <span className="bg-primary-gradient flex size-10 items-center justify-center rounded-xl text-primary-foreground">
                <stat.icon className="size-5" />
              </span>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Your AI workspace</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.to} to={tool.to} className="group">
              <Card className="h-full transition-all group-hover:-translate-y-1 group-hover:shadow-elegant">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <span className="bg-ember-gradient flex size-10 items-center justify-center rounded-xl text-maroon-foreground">
                    <tool.icon className="size-5" />
                  </span>
                  <CardTitle className="text-base">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{tool.copy}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <ResponsibleAiNotice />
    </div>
  );
}
