// Server-only: envía el correo de aviso (Gmail)
// usando la cuenta de Google conectada al proyecto (info@redvioletaciberprevencion.es).

const GATEWAY = "https://connector-gateway.lovable.dev";
export const NOTIFY_EMAIL = "info@redvioletaciberprevencion.es";

function gatewayHeaders(connectionKey: string) {
  return {
    Authorization: `Bearer ${process.env['LOVABLE_API_KEY']}`,
    "X-Connection-Api-Key": connectionKey,
    "Content-Type": "application/json",
  };
}

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);

function rawEmail(to: string, subject: string, body: string) {
  const email = [
    `To: ${to}`,
    `Subject: ${header(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");
  return b64(email).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

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
  auditoria: "Informe de Vulnerabilidad Digital",
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
    ["Índice de riesgo", p.riesgo !== undefined ? `${p.riesgo}%` : undefined],
    ["Mensaje", p.mensaje],
  ];
  return rows
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

async function sendMail(p: NotifyPayload) {
  const key = process.env['GOOGLE_MAIL_API_KEY'];
  if (!key) throw new Error("GOOGLE_MAIL_API_KEY no configurada");
  const subject =
    p.kind === "auditoria"
      ? `📊 Informe de Vulnerabilidad Digital: ${p.centro}`
      : `Nueva solicitud (${KIND_LABEL[p.kind] ?? p.kind}): ${p.centro}`;
  const body = `Nueva solicitud recibida desde redvioletaciberprevencion.es\n\n${summary(p)}\n`;
  const res = await fetch(`${GATEWAY}/google_mail/gmail/v1/users/me/messages/send`, {
    method: "POST",
    headers: gatewayHeaders(key),
    body: JSON.stringify({ raw: rawEmail(NOTIFY_EMAIL, subject, body) }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gmail [${res.status}]: ${text}`);
  }
}

export async function notifyLead(p: NotifyPayload) {
  await sendMail(p);
  return { email: true };
}
