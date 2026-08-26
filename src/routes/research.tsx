import { createFileRoute } from "@tanstack/react-router";
import { Telescope } from "lucide-react";
import { ToolWorkspace } from "@/components/tool-workspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | EnO Workplace AI" },
      {
        name: "description",
        content:
          "Get structured briefings, comparisons and recommendations on any work topic, with clear notes on what to verify.",
      },
      { property: "og:title", content: "AI Research Assistant | EnO Workplace AI" },
      {
        property: "og:description",
        content: "Structured briefings, comparisons and recommendations for work topics.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <ToolWorkspace
      tool="research"
      title="AI Research Assistant"
      description="Structured briefings, comparisons and recommendations on any work topic."
      icon={<Telescope className="size-5" />}
      fields={[
        { name: "topic", label: "Research question", type: "text", placeholder: "e.g. Which CRM suits a 20-person agency?" },
        { name: "context", label: "Business context", type: "textarea", rows: 4, placeholder: "Industry, team size, budget, constraints…" },
        {
          name: "depth",
          label: "Depth",
          type: "select",
          options: ["Quick brief", "Standard analysis", "Deep dive"],
        },
        {
          name: "audience",
          label: "Audience",
          type: "select",
          options: ["Executive team", "Project team", "Client", "Personal use"],
        },
      ]}
      buildPrompt={(v) =>
        `Research question: ${v["topic"]}
Context: ${v["context"] || "Not specified"}
Depth: ${v["depth"]}
Audience: ${v["audience"]}`
      }
      submitLabel="Run research"
    />
  );
}
