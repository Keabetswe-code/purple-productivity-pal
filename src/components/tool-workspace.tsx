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
    <div className="space-y-6">
      <header className="bg-hero-gradient relative overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-elegant">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/15">
            {icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm opacity-85">{description}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Structured prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "text" && (
                  <Input
                    id={field.name}
                    value={values[field.name] ?? ""}
                    placeholder={field.placeholder ?? ""}
                    maxLength={300}
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
                    onChange={(e) => setValue(field.name, e.target.value)}
                  />
                )}
                {field.type === "select" && (
                  <Select
                    value={values[field.name] ?? ""}
                    onValueChange={(v) => setValue(field.name, v)}
                  >
                    <SelectTrigger id={field.name}>
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

            <Button onClick={handleGenerate} disabled={loading} className="w-full" size="lg">
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

        <Card className="min-h-[420px]">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-base">Editable output</CardTitle>
            {output && (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing((e) => !e)}>
                  {editing ? <Eye /> : <Pencil />}
                  {editing ? "Preview" : "Edit"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={download}>
                  <Download /> Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {!output && !loading && (
              <p className="py-16 text-center text-sm text-muted-foreground">
                Fill in the prompt fields and generate a draft. Everything stays editable.
              </p>
            )}
            {loading && !output && (
              <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary" />
                <p className="text-sm">EnO is drafting…</p>
              </div>
            )}
            {output &&
              (editing ? (
                <Textarea
                  value={output}
                  rows={20}
                  onChange={(e) => setOutput(e.target.value)}
                  className="font-mono text-xs"
                />
              ) : (
                <div className="prose-ai text-sm">
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
