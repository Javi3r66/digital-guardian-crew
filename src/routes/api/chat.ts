import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
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

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Falta LOVABLE_API_KEY", { status: 500 });

        try {
          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway("google/gemini-3.6-flash"),
            system: buildSystemPrompt(agentId),
            messages: await convertToModelMessages(messages as UIMessage[]),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
          });
        } catch (error) {
          console.error("chat error", error);
          return new Response("Error al contactar con el servicio de IA", { status: 502 });
        }
      },
    },
  },
});
