import { ShieldCheck } from "lucide-react";

export function ResponsibleAiNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex gap-3 rounded-xl border border-border bg-secondary/60 p-4 text-sm text-muted-foreground ${className}`}
    >
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
      <p>
        <span className="font-medium text-foreground">Responsible AI:</span> EnO generates
        drafts that can be incomplete or inaccurate. Review and edit every output, avoid sharing
        confidential or personal data, and keep a human decision-maker accountable for anything
        you send or act on.
      </p>
    </div>
  );
}
