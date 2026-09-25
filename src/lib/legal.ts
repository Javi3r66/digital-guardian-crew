export const EMERGENCY_WARNING = {
  title: "AVISO IMPORTANTE DE SEGURIDAD",
  body: "Red Violeta es un sistema automatizado de orientación y triaje preventivo asistido por IA. NO ES UN SERVICIO DE EMERGENCIAS NI SUSTITUYE A LAS FUERZAS Y CUERPOS DE SEGURIDAD DEL ESTADO. En caso de peligro inminente, agresión, riesgo vital o emergencia real, contacte inmediatamente al 112, 091 (Policía Nacional), 062 (Guardia Civil) o al 016.",
};

export const LIABILITY_DISCLAIMER =
  "Naturaleza y límites del servicio: Red Violeta es una plataforma tecnológica de información, prevención y orientación inicial. Las respuestas de sus sistemas de inteligencia artificial tienen carácter general e informativo y se generan de forma automática: no constituyen asesoramiento jurídico, psicológico, sanitario, educativo o social profesional, ni sustituyen la intervención de profesionales cualificados, del centro educativo o de las autoridades competentes. Red Violeta no garantiza que una respuesta automatizada sea adecuada para las circunstancias particulares de cada persona. Ante una situación que requiera intervención profesional o institucional, se recomienda acudir al recurso competente; ante un peligro inmediato, contacte con los servicios de emergencia.";

export const AI_CHAT_BADGE =
  "Respuesta generada por Inteligencia Artificial Multi-Agente. Esta herramienta ofrece orientación previa y borradores informativos que deben ser validados por profesionales.";

export const B2B_CONSENT =
  "Acepto el tratamiento de datos para la emisión del informe institucional y el envío de comunicaciones de ciberseguridad según el RGPD y la LOPDGDD 3/2018. Responsable: Red Violeta Ciberprevención.";

export const CONTACT_EMAIL = "info@redvioletaciberprevencion.es";

export const LEGAL_LINKS = [
  { to: "/legal/terminos", label: "Términos y Condiciones" },
  { to: "/legal/privacidad", label: "Política de Privacidad (RGPD)" },
  { to: "/legal/cookies", label: "Política de Cookies" },
  { to: "/legal/lopivi", label: "Protocolo de Protección del Menor (LOPIVI)" },
] as const;

export const EMERGENCY_PHONES = [
  { label: "Emergencias", value: "112" },
  { label: "Policía Nacional", value: "091" },
  { label: "Guardia Civil", value: "062" },
  { label: "Violencia de género", value: "016" },
];
