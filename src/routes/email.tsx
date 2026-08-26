import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ToolWorkspace } from "@/components/tool-workspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Aurora Workplace AI" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in seconds with structured AI prompts, tone control and fully editable output.",
      },
      { property: "og:title", content: "Smart Email Generator | Aurora Workplace AI" },
      {
        property: "og:description",
        content: "Generate polished, on-tone workplace emails with editable AI drafts.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <ToolWorkspace
      tool="email"
      title="Smart Email Generator"
      description="Turn a few bullet points into a polished, on-tone workplace email."
      icon={<Mail className="size-5" />}
      fields={[
        { name: "recipient", label: "Recipient & role", type: "text", placeholder: "e.g. Thabo, Head of Finance" },
        { name: "purpose", label: "Purpose of the email", type: "text", placeholder: "e.g. Request budget approval for Q4 tooling" },
        {
          name: "tone",
          label: "Tone",
          type: "select",
          options: ["Professional", "Friendly", "Concise", "Persuasive", "Apologetic", "Formal"],
        },
        { name: "length", label: "Length", type: "select", options: ["Short", "Medium", "Detailed"] },
        {
          name: "points",
          label: "Key points to include",
          type: "textarea",
          rows: 6,
          placeholder: "• Budget of R45 000\n• Needed before 15 October\n• Saves ~8 hours per week",
        },
      ]}
      buildPrompt={(v) =>
        `Write a ${v["tone"]?.toLowerCase()} workplace email.
Recipient: ${v["recipient"] || "the relevant colleague"}
Purpose: ${v["purpose"]}
Preferred length: ${v["length"]}
Key points:
${v["points"]}`
      }
      submitLabel="Generate email"
    />
  );
}
