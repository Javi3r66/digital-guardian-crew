// Server-only: envía el correo de aviso usando Resend.
export const NOTIFY_EMAIL = "info@redvioletaciberprevencion.es";
const RESEND_FROM = "Red Violeta Ciberprevención <alertas@redvioletaciberprevencion.es>";

export type NotifyPayload = {
  kind: string;
  centro: string;
  contacto: string;
  cargo?: string | undefined;
  telefono?: string | undefined;
  email: string;
  num_alumnos?: string | undefined;
  publico?: string | undefined;
  mensaje?: string | undefined;
  riesgo?: number | undefined;
};

const KIND_LABEL: Record<string, string> = {
  auditoria: "Test institucional",
  charla: "Charla presencial",
};

function summary(p: NotifyPayload) {
  const rows: [string, string | undefined][] = [
    ["Tipo de solicitud", KIND_LABEL[p.kind] ?? p.kind],
    ["Centro", p.centro],
    ["Persona de contacto", p.contacto],
    ["Cargo", p.cargo],
    ["Teléfono", p.telefono],
    ["Correo", p.email],
    ["Nº de alumnos", p.num_alumnos],
    ["Destinatarios", p.publico],
    ["Puntuación orientativa", p.riesgo !== undefined ? `${p.riesgo}%` : undefined],
    ["Mensaje", p.mensaje],
  ];
  return rows
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
    .join("\n");
}

async function sendMail(p: NotifyPayload) {
  const key = process.env["RESEND_API_KEY"];
  if (!key) throw new Error("RESEND_API_KEY no configurada");
  const subject = `Nueva solicitud (${KIND_LABEL[p.kind] ?? p.kind}): ${p.centro}`;
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
    throw new Error(`Resend [${res.status}]: ${text}`);
  }
}

export async function notifyLead(p: NotifyPayload) {
  await sendMail(p);
  return { email: true };
}
