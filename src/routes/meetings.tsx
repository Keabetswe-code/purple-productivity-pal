import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { ToolWorkspace } from "@/components/tool-workspace";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | EnO Workplace AI" },
      {
        name: "description",
        content:
          "Paste raw meeting notes or transcripts and get a structured summary with decisions, action items and owners.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | EnO Workplace AI" },
      {
        property: "og:description",
        content: "Turn messy transcripts into decisions, action items and owners.",
      },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <ToolWorkspace
      tool="summary"
      title="Meeting Notes Summarizer"
      description="Turn messy transcripts into decisions, owners and next steps."
      icon={<NotebookPen className="size-5" />}
      fields={[
        { name: "meeting", label: "Meeting title", type: "text", placeholder: "e.g. Q4 Roadmap Review" },
        { name: "attendees", label: "Attendees", type: "text", placeholder: "e.g. Keabetswe, Lerato, Sipho" },
        {
          name: "focus",
          label: "Summary focus",
          type: "select",
          options: ["Balanced overview", "Action items first", "Decisions only", "Executive brief"],
        },
        {
          name: "notes",
          label: "Raw notes or transcript",
          type: "textarea",
          rows: 12,
          placeholder: "Paste your meeting transcript or rough notes here…",
        },
      ]}
      buildPrompt={(v) =>
        `Summarize the following meeting.
Meeting: ${v["meeting"] || "Untitled meeting"}
Attendees: ${v["attendees"] || "Not specified"}
Focus: ${v["focus"]}

Transcript / notes:
${v["notes"]}`
      }
      submitLabel="Summarize notes"
    />
  );
}
