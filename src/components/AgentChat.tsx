import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import { Send, ThumbsUp, ThumbsDown, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AGENT_MAP, type AgentId } from "@/lib/agents";
import { cn } from "@/lib/utils";

export function AgentChat({ agentId }: { agentId: AgentId }) {
  const agent = AGENT_MAP[agentId];
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({});
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: agentId,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { agentId },
    }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    inputRef.current?.focus();
  }, [agentId, status]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  function submit() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    void sendMessage({ text });
  }

  return (
    <div className="flex h-[560px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <agent.icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {agent.name} · {agent.role}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            Sistema de IA · no sustituye a un profesional colegiado
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        <div className="rounded-xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground">
          {agent.greeting}
        </div>

        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {agent.examples.map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  if (!busy) void sendMessage({ text: ex });
                }}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        {messages.map((m) => {
          const text = m.parts
            .map((p) => (p.type === "text" ? p.text : ""))
            .join("");
          const mine = m.role === "user";
          return (
            <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                  mine
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground",
                )}
              >
                {mine ? (
                  <p className="whitespace-pre-wrap">{text}</p>
                ) : (
                  <>
                    <div className="agent-md">
                      <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                    <div className="mt-3 flex items-center gap-2 border-t border-border pt-2">
                      <span className="text-[11px] text-muted-foreground">
                        ¿Te ha sido útil?
                      </span>
                      {(["up", "down"] as const).map((v) => (
                        <button
                          key={v}
                          aria-label={v === "up" ? "Útil" : "No útil"}
                          onClick={() => setFeedback((f) => ({ ...f, [m.id]: v }))}
                          className={cn(
                            "rounded-md p-1 text-muted-foreground transition-colors hover:text-primary",
                            feedback[m.id] === v && "bg-primary/10 text-primary",
                          )}
                        >
                          {v === "up" ? (
                            <ThumbsUp className="size-3.5" />
                          ) : (
                            <ThumbsDown className="size-3.5" />
                          )}
                        </button>
                      ))}
                      {feedback[m.id] && (
                        <span className="flex items-center gap-1 text-[11px] text-primary">
                          <Sparkles className="size-3" /> registrado para revisión experta
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {status === "submitted" && (
          <div className="flex gap-1.5 px-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-2 animate-bounce rounded-full bg-primary/50"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>
              No se ha podido contactar con el agente. Vuelve a intentarlo en unos segundos.
            </span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            placeholder="Describe la situación sin incluir nombres ni datos personales…"
            className="max-h-32 min-h-11 resize-none"
          />
          <Button onClick={submit} disabled={busy || !input.trim()} size="icon" className="size-11">
            <Send className="size-4" />
          </Button>
        </div>
        <p className="mt-2 px-1 text-[11px] text-muted-foreground">
          Emergencias 112 · Policía 091 · INCIBE 017 · ANAR 900 20 20 10 · Conducta suicida 024
        </p>
      </div>
    </div>
  );
}
