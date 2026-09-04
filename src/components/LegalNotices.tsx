import { AlertTriangle, ShieldAlert, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { EMERGENCY_WARNING, LIABILITY_DISCLAIMER, AI_CHAT_BADGE } from "@/lib/legal";

export function EmergencyWarning({ className }: { className?: string }) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
      <p className="text-[12px] leading-relaxed text-foreground">
        <strong className="text-destructive">⚠️ {EMERGENCY_WARNING.title}:</strong>{" "}
        {EMERGENCY_WARNING.body}
      </p>
    </div>
  );
}

export function LiabilityDisclaimer({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3", className)}>
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <p className="text-[11px] leading-relaxed text-muted-foreground">{LIABILITY_DISCLAIMER}</p>
    </div>
  );
}

export function AiChatBadge({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg bg-accent px-3 py-2 text-[11px] leading-relaxed text-accent-foreground",
        className,
      )}
    >
      <Bot className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      <span>🤖 {AI_CHAT_BADGE}</span>
    </p>
  );
}
