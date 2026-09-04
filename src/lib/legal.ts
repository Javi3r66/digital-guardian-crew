export const EMERGENCY_WARNING = {
  title: "AVISO IMPORTANTE DE SEGURIDAD",
  body: "Red Violeta es un sistema automatizado de orientación y triaje preventivo asistido por IA. NO ES UN SERVICIO DE EMERGENCIAS NI SUSTITUYE A LAS FUERZAS Y CUERPOS DE SEGURIDAD DEL ESTADO. En caso de peligro inminente, agresión, riesgo vital o emergencia real, contacte inmediatamente al 112, 091 (Policía Nacional), 062 (Guardia Civil) o al 016.",
};

export const LIABILITY_DISCLAIMER =
  "Descargo de responsabilidad: Red Violeta Ciberprevención y sus administradores/creadores quedan totalmente eximidos de responsabilidad civil, penal o administrativa derivada de decisiones tomadas por los centros educativos, usuarios o terceros basándose en la información proporcionada por los agentes de IA. La plataforma actúa exclusivamente como una herramienta facilitadora de apoyo y generación de borradores informativos bajo supervisión humana (Art. 50 Reglamento UE 2024/1689).";

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
