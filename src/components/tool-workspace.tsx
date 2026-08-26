import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import { Copy, Download, Loader2, Pencil, Sparkle, Eye } from "lucide-react";
import { toast } from "sonner";

import { generateAiOutput } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsibleAiNotice } from "@/components/responsible-ai";

export type FieldConfig =
  | { name: string; label: string; type: "text"; placeholder?: string }
  | { name: string; label: string; type: "textarea"; placeholder?: string; rows?: number }
  | { name: string; label: string; type: "select"; options: string[] };

type Props = {
  tool: "email" | "summary" | "planner" | "research";
  title: string;
  description: string;
  icon: ReactNode;
  fields: FieldConfig[];
  buildPrompt: (values: Record<string, string>) => string;
  submitLabel?: string;
};

export function ToolWorkspace({
  tool,
  title,
  description,
  icon,
  fields,
  buildPrompt,
  submitLabel = "Generate with AI",
}: Props) {
  const generate = useServerFn(generateAiOutput);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((f) => [f.name, f.type === "select" ? (f.options[0] ?? "") : ""]),
    ),
  );
  const [output, setOutput] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const setValue = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  async function handleGenerate() {
    const prompt = buildPrompt(values).trim();
    if (prompt.length < 12) {
      toast.error("Add a little more detail before generating.");
      return;
    }
    setLoading(true);
    try {
      const result = await generate({ data: { tool, prompt } });
      setOutput(result.text);
      setEditing(false);
      toast.success("Draft ready — review and edit before using it.");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool}-draft.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <header className="bg-hero-gradient shadow-elegant relative overflow-hidden rounded-[1.75rem] p-7 text-primary-foreground md:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
        <div className="animate-float pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-accent/50 blur-3xl" />
        <div className="animate-drift pointer-events-none absolute -bottom-24 right-24 size-56 rounded-full bg-maroon/50 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur">
            {icon}
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">{title}</h1>
            <p className="mt-1 text-sm opacity-85 md:text-base">{description}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <Card className="glass gradient-border animate-rise h-fit rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="bg-primary-gradient size-2 rounded-full" />
              Structured prompt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {field.label}
                </Label>
                {field.type === "text" && (
                  <Input
                    id={field.name}
                    value={values[field.name] ?? ""}
                    placeholder={field.placeholder ?? ""}
                    maxLength={300}
                    className="rounded-xl bg-background/60"
                    onChange={(e) => setValue(field.name, e.target.value)}
                  />
                )}
                {field.type === "textarea" && (
                  <Textarea
                    id={field.name}
                    rows={field.rows ?? 5}
                    maxLength={6000}
                    value={values[field.name] ?? ""}
                    placeholder={field.placeholder ?? ""}
                    className="rounded-xl bg-background/60"
                    onChange={(e) => setValue(field.name, e.target.value)}
                  />
                )}
                {field.type === "select" && (
                  <Select
                    value={values[field.name] ?? ""}
                    onValueChange={(v) => setValue(field.name, v)}
                  >
                    <SelectTrigger id={field.name} className="rounded-xl bg-background/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}

            <Button
              onClick={handleGenerate}
              disabled={loading}
              size="lg"
              className="bg-primary-gradient glow-primary w-full rounded-xl text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkle /> {submitLabel}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="glass gradient-border animate-rise min-h-[460px] rounded-2xl" style={{ animationDelay: "80ms" }}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="bg-ember-gradient size-2 rounded-full" />
              Editable output
            </CardTitle>
            {output && (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => setEditing((e) => !e)}>
                  {editing ? <Eye /> : <Pencil />}
                  {editing ? "Preview" : "Edit"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    void navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy /> Copy
                </Button>
                <Button variant="outline" size="sm" className="rounded-full" onClick={download}>
                  <Download /> Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {!output && !loading && (
              <div className="flex flex-col items-center gap-3 py-20 text-center">
                <span className="bg-primary-gradient animate-pulse-ring flex size-12 items-center justify-center rounded-2xl text-primary-foreground">
                  <Sparkle className="size-5" />
                </span>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Fill in the prompt fields and generate a draft. Everything stays editable.
                </p>
              </div>
            )}
            {loading && !output && (
              <div className="space-y-3 py-10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin text-primary" /> EnO is drafting…
                </div>
                {[92, 80, 96, 70, 88, 60].map((w, i) => (
                  <div
                    key={i}
                    className="bg-primary-gradient h-3 animate-pulse rounded-full opacity-20"
                    style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            )}
            {output &&
              (editing ? (
                <Textarea
                  value={output}
                  rows={20}
                  onChange={(e) => setOutput(e.target.value)}
                  className="rounded-xl bg-background/60 font-mono text-xs"
                />
              ) : (
                <div className="prose-ai animate-rise text-sm">
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      <ResponsibleAiNotice />
    </div>
  );
}

