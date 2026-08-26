import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ToolWorkspace } from "@/components/tool-workspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | Aurora Workplace AI" },
      {
        name: "description",
        content:
          "Turn goals and deadlines into a prioritised, time-blocked work plan with dependencies and next actions.",
      },
      { property: "og:title", content: "AI Task Planner | Aurora Workplace AI" },
      {
        property: "og:description",
        content: "Prioritised, time-blocked plans generated from your goals and deadlines.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <ToolWorkspace
      tool="planner"
      title="AI Task Planner"
      description="Prioritise your workload into a realistic, time-blocked plan."
      icon={<ListChecks className="size-5" />}
      fields={[
        {
          name: "horizon",
          label: "Planning horizon",
          type: "select",
          options: ["Today", "This week", "Next 2 weeks", "This month", "This quarter"],
        },
        { name: "capacity", label: "Available working hours", type: "text", placeholder: "e.g. 6 focused hours per day" },
        {
          name: "style",
          label: "Working style",
          type: "select",
          options: ["Deep-work blocks", "Short sprints", "Meeting-heavy schedule", "Flexible"],
        },
        {
          name: "tasks",
          label: "Goals, tasks and deadlines",
          type: "textarea",
          rows: 10,
          placeholder: "• Finish client proposal (Friday)\n• Onboard new intern\n• Review Q3 analytics",
        },
      ]}
      buildPrompt={(v) =>
        `Create a work plan.
Horizon: ${v["horizon"]}
Capacity: ${v["capacity"] || "Standard working day"}
Working style: ${v["style"]}

Goals, tasks and deadlines:
${v["tasks"]}`
      }
      submitLabel="Build my plan"
    />
  );
}
