import { createFileRoute } from "@tanstack/react-router";

const ALLOWED_ORIGIN = "https://www.redvioletaciberprevencion.es";
const RESEND_FROM = "Red Violeta Ciberprevención <alertas@redvioletaciberprevencion.es>";
const NOTIFY_EMAIL = "info@redvioletaciberprevencion.es";

const KIND_LABEL: Record<string, string> = {
  auditoria: "Test institucional",
  charla: "Charla presencial",
};

function trunc(v: unknown, max: number): string | undefined {
  if (typeof v !== "string" || !v) return undefined;
  return v.slice(0, max);
}

function summary(p: Record<string, string | undefined>) {
  const rows: [string, string | undefined][] = [
    ["Tipo de solicitud", KIND_LABEL[p["kind"] ?? ""] ?? p["kind"]],
    ["Centro", p["centro"]],
    ["Persona de contacto", p["contacto"]],
    ["Cargo", p["cargo"]],
    ["Teléfono", p["telefono"]],
    ["Correo", p["email"]],
    ["Nº de alumnos", p["num_alumnos"]],
    ["Destinatarios", p["publico"]],
    ["Puntuación orientativa", p["riesgo"] ? `${p["riesgo"]}%` : undefined],
    ["Mensaje", p["mensaje"]],
  ];
  return rows
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
    .join("\n");
}

export const Route = createFileRoute("/api/notify-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (origin !== ALLOWED_ORIGIN) {
          return new Response("Origen no permitido", { status: 403 });
        }

        const key = process.env["RESEND_API_KEY"];
        if (!key) {
          console.error("notify-lead: RESEND_API_KEY no configurada");
          return new Response("Error de configuración", { status: 500 });
        }

        try {
          const body = (await request.json()) as Record<string, unknown>;
          const p: Record<string, string | undefined> = {
            kind: trunc(body["kind"], 30),
            centro: trunc(body["centro"], 120),
            contacto: trunc(body["contacto"], 120),
            cargo: trunc(body["cargo"], 60),
            telefono: trunc(body["telefono"], 20),
            email: trunc(body["email"], 160),
            num_alumnos: trunc(body["num_alumnos"], 20),
            publico: trunc(body["publico"], 60),
            mensaje: trunc(body["mensaje"], 1000),
            riesgo: typeof body["riesgo"] === "number" ? String(body["riesgo"]) : undefined,
          };

          const subject = `Nueva solicitud (${KIND_LABEL[p["kind"] ?? ""] ?? p["kind"]}): ${p["centro"]}`;

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: RESEND_FROM,
              to: [NOTIFY_EMAIL],
              subject,
              html: `<p>Nueva solicitud recibida desde redvioletaciberprevencion.es</p>${summary(p)}`,
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("notify-lead: Resend error", res.status, text);
            return new Response("Error al enviar el aviso", { status: 502 });
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("notify-lead: error", err);
          return new Response("Error interno", { status: 500 });
        }
      },
    },
  },
});
