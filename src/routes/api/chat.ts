import { createFileRoute } from "@tanstack/react-router";
import { buildSystemPrompt } from "@/lib/agent-prompts.server";
import type { AgentId } from "@/lib/agents";

const VALID: AgentId[] = ["ciberseguridad", "psicologia", "social", "legal"];

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: any[]; agentId?: unknown };
        const messages = body.messages;
        const agentId = body.agentId as AgentId;

        if (!Array.isArray(messages)) {
          return new Response("Faltan los mensajes", { status: 400 });
        }
        if (!VALID.includes(agentId)) {
          return new Response("Agente no válido", { status: 400 });
        }

        const key = process.env["GROQ_API_KEY"];
        if (!key) return new Response("Falta GROQ_API_KEY", { status: 500 });

        try {
          const systemPrompt = buildSystemPrompt(agentId);

          const formattedMessages = [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({
              role: m.role ?? "user",
              content: typeof m.content === "string" ? m.content : m.parts?.[0]?.text ?? "",
            })),
          ];

          const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: formattedMessages,
              temperature: 0.6,
            }),
          });

          if (!groqResponse.ok) {
            const errText = await groqResponse.text();
            console.error("Groq API error:", errText);
            return new Response("Error de comunicación con Groq", { status: groqResponse.status });
          }

          const data = await groqResponse.json();
          const replyText = data.choices?.[0]?.message?.content ?? "";

          return new Response(replyText, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        } catch (error) {
          console.error("chat error", error);
          return new Response("Error al contactar con el servicio de IA", { status: 502 });
        }
      },
    },
  },
});
