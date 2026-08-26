import { ShieldCheck } from "lucide-react";

export function ResponsibleAiNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`glass gradient-border relative flex gap-4 overflow-hidden rounded-2xl p-5 text-sm text-muted-foreground ${className}`}
    >
      <div className="pointer-events-none absolute -left-10 -top-10 size-32 rounded-full bg-accent/20 blur-2xl" />
      <span className="bg-primary-gradient relative flex size-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
        <ShieldCheck className="size-4" />
      </span>
      <p className="relative leading-relaxed">
        <span className="font-semibold text-foreground">Responsible AI:</span> EnO generates
        drafts that can be incomplete or inaccurate. Review and edit every output, avoid sharing
        confidential or personal data, and keep a human decision-maker accountable for anything
        you send or act on.
      </p>
    </div>
  );
}
