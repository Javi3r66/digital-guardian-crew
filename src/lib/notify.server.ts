// Server-only: envía el correo de aviso (Gmail) y crea el evento en Google Calendar
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
  fecha?: string | undefined;
  riesgo?: number | undefined;
};

const KIND_LABEL: Record<string, string> = {
  videollamada: "Videollamada de diagnóstico",
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
    ["Fecha solicitada", p.fecha],
    ["Índice de riesgo", p.riesgo !== undefined ? `${p.riesgo}%` : undefined],
    ["Mensaje", p.mensaje],
  ];
  return rows
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

function eventWindow(fecha?: string) {
  const start = fecha ? new Date(fecha) : new Date(Date.now() + 24 * 60 * 60 * 1000);
  const safeStart = Number.isNaN(start.getTime())
    ? new Date(Date.now() + 24 * 60 * 60 * 1000)
    : start;
  const end = new Date(safeStart.getTime() + 45 * 60 * 1000);
  return { start: safeStart.toISOString(), end: end.toISOString() };
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

async function createEvent(p: NotifyPayload) {
  const key = process.env['GOOGLE_CALENDAR_API_KEY'];
  if (!key) throw new Error("GOOGLE_CALENDAR_API_KEY no configurada");
  const { start, end } = eventWindow(p.fecha);
  const res = await fetch(
    `${GATEWAY}/google_calendar/calendar/v3/calendars/primary/events?conferenceDataVersion=1`,
    {
      method: "POST",
      headers: gatewayHeaders(key),
      body: JSON.stringify({
        summary: `${KIND_LABEL[p.kind] ?? p.kind} — ${p.centro}`,
        description: summary(p),
        start: { dateTime: start, timeZone: "Europe/Madrid" },
        end: { dateTime: end, timeZone: "Europe/Madrid" },
        conferenceData: {
          createRequest: {
            requestId: `rv-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
        reminders: { useDefault: true },
      }),
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Calendar [${res.status}]: ${text}`);
  }
}

export async function notifyLead(p: NotifyPayload) {
  const results = await Promise.allSettled([sendMail(p), createEvent(p)]);
  for (const r of results) {
    if (r.status === "rejected") console.error("[notifyLead]", r.reason);
  }
  return {
    email: results[0]?.status === "fulfilled",
    calendar: results[1]?.status === "fulfilled",
  };
}
