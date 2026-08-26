import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

const GenerateInput = z.object({
  tool: z.enum(["email", "summary", "planner", "research"]),
  prompt: z.string().trim().min(1).max(8000),
});

const SYSTEM_PROMPTS: Record<string, string> = {
  email: [
    "You are a professional workplace email writer.",
    "Return a complete email with a 'Subject:' line, greeting, concise body paragraphs and a sign-off.",
    "Match the requested tone, keep it clear, courteous and free of filler.",
    "Format the answer in markdown.",
  ].join(" "),
  summary: [
    "You are a meeting notes summarizer for busy professionals.",
    "Return markdown with these sections: ## Summary, ## Key Decisions, ## Action Items (owner + task + due date when stated), ## Risks & Open Questions.",
    "Never invent facts that are not in the transcript; write 'Not specified' when unknown.",
  ].join(" "),
  planner: [
    "You are an AI task planner.",
    "Turn the user's goals into a realistic plan in markdown: ## Priorities (MoSCoW), ## Schedule (table of time block, task, effort), ## Dependencies & Risks, ## Next 3 Actions.",
    "Be specific and time-aware.",
  ].join(" "),
  research: [
    "You are an AI research assistant for workplace analysis.",
    "Answer in markdown: ## Overview, ## Key Findings (bulleted), ## Comparison or Options, ## Recommendation, ## What to verify.",
    "Clearly flag uncertainty and note that facts should be independently verified.",
  ].join(" "),
};

export const generateAiOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured (missing LOVABLE_API_KEY).");

    const { createLovableAiGatewayProvider, DEFAULT_MODEL } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    const result = streamText({
      model: gateway(DEFAULT_MODEL),
      system: SYSTEM_PROMPTS[data.tool],
      prompt: data.prompt,
    });

    // Stream server-side, return the completed text to the client.
    const text = await result.text;
    return { text };
  });
