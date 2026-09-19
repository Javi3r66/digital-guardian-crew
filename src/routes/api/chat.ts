import { createFileRoute } from "@tanstack/react-router";
import { convertToCoreMessages, streamText, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { buildSystemPrompt } from "@/lib/agent-prompts.server";
import type { AgentId } from "@/lib/agents";

const VALID: AgentId[] = ["ciberseguridad", "psicologia", "social", "legal"];

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: unknown; agentId?: unknown };
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
          const groq = createOpenAICompatible({
            name: "groq",
            baseURL: "https://api.groq.com/openai/v1",
            headers: {
              Authorization: `Bearer ${key}`,
            },
          });

          const result = streamText({
            model: groq("llama-3.3-70b-versatile"),
            system: buildSystemPrompt(agentId),
            messages: convertToCoreMessages(messages as UIMessage[]),
          });

          return result.toDataStreamResponse();
        } catch (error) {
          console.error("chat error", error);
          return new Response("Error al contactar con el servicio de IA", { status: 502 });
        }
      },
    },
  },
});
