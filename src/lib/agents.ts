import { ShieldCheck, HeartPulse, Users, Scale, type LucideIcon } from "lucide-react";

export type AgentId = "ciberseguridad" | "psicologia" | "social" | "legal";

export type Agent = {
  id: AgentId;
  name: string;
  pillar: string;
  role: string;
  icon: LucideIcon;
  summary: string;
  capabilities: string[];
  legalBasis: string[];
  limits: string;
  examples: string[];
  greeting: string;
};

export const AGENTS: Agent[] = [
  {
    id: "ciberseguridad",
    name: "AURA",
    pillar: "Técnico",
    role: "Agente de ciberseguridad",
    icon: ShieldCheck,
    summary:
      "Guía la contención técnica del incidente: preservación de pruebas, cierre de vectores de ataque y cálculo del Grado de Vulnerabilidad Digital.",
    capabilities: [
      "Checklist de preservación de evidencia digital (capturas con fecha, URL y usuario, hashes, acta notarial)",
      "Bastionado de cuentas: 2FA, revisión de sesiones activas, privacidad por defecto",
      "Rutas de denuncia y retirada de contenido en cada plataforma (canales de reporte y Canal Prioritario de la AEPD)",
      "Cuestionario estructurado de Grado de Vulnerabilidad Digital",
    ],
    legalBasis: [
      "RGPD (UE) 2016/679 y LO 3/2018 (LOPDGDD), art. 84",
      "Canal Prioritario de la AEPD para difusión de contenido sexual o violento",
      "Ley 34/2002 (LSSI) — retirada de contenidos por prestadores de servicios",
      "Reglamento (UE) 2022/2065 (DSA) — mecanismos de notificación y acción",
    ],
    limits:
      "No accede a dispositivos, no hackea, no rastrea autores ni realiza periciales. La prueba con validez procesal la elabora un perito informático.",
    examples: [
      "Han creado un perfil falso con las fotos de mi hija, ¿qué hago primero?",
      "¿Cómo guardo las capturas para que sirvan como prueba?",
      "Quiero cerrar el acceso a sus cuentas, guíame paso a paso",
    ],
    greeting:
      "Soy AURA, el agente técnico de Red Violeta. Te ayudo a contener el incidente y a preservar las pruebas correctamente. Cuéntame qué ha pasado, sin incluir datos personales identificativos.",
  },
  {
    id: "psicologia",
    name: "CALMA",
    pillar: "Clínico",
    role: "Agente de apoyo psicológico",
    icon: HeartPulse,
    summary:
      "Primeros auxilios psicológicos ante ciberacoso: contención emocional, psicoeducación familiar y detección de señales de alarma para derivación urgente.",
    capabilities: [
      "Contención y validación emocional para la víctima y su familia",
      "Psicoeducación: impacto del ciberacoso, culpa, aislamiento y vergüenza",
      "Pautas de comunicación entre familia y menor sin revictimizar",
      "Cribado de señales de riesgo con derivación inmediata a recursos humanos",
    ],
    legalBasis: [
      "Ley 44/2003 de ordenación de las profesiones sanitarias",
      "Código Deontológico del Consejo General de la Psicología de España",
      "Ley 4/2015 del Estatuto de la víctima del delito",
      "LO 8/2021 (LOPIVI) — buen trato y protección del interés superior del menor",
    ],
    limits:
      "No diagnostica, no prescribe y no sustituye a un psicólogo colegiado. Ante riesgo vital deriva de inmediato al 024, 112 o urgencias.",
    examples: [
      "Mi hijo no quiere ir al instituto y no habla, ¿cómo le acompaño?",
      "Me siento culpable por no haberlo visto antes",
      "¿Qué señales indican que necesita ayuda urgente?",
    ],
    greeting:
      "Soy CALMA, el agente de apoyo psicológico. Estoy aquí para escucharte y darte pautas de primeros auxilios psicológicos. Si en algún momento hay riesgo para la vida, te derivaré al 024 o al 112.",
  },
  {
    id: "social",
    name: "PUENTE",
    pillar: "Social",
    role: "Agente de trabajo social y mediación",
    icon: Users,
    summary:
      "Activa el circuito de protección: centro educativo, servicios sociales y recursos públicos, y prepara la mediación cuando procede.",
    capabilities: [
      "Activación del protocolo del centro educativo y del coordinador de bienestar (LOPIVI)",
          "Ayuda a organizar la información para un escrito de solicitud a dirección, inspección educativa o servicios sociales",
      "Mapa de recursos públicos y de tercer sector según la comunidad autónoma",
      "Preparación de la mediación escolar y familiar, y criterios para descartarla",
    ],
    legalBasis: [
      "LO 8/2021 (LOPIVI) — coordinador de bienestar y protección en todos los centros educativos",
      "Ley 26/2015 de modificación del sistema de protección a la infancia y a la adolescencia",
      "Ley 39/2015 del procedimiento administrativo común",
      "Código Deontológico del Trabajo Social (Consejo General del Trabajo Social)",
    ],
    limits:
      "No sustituye al trabajador social de referencia ni tramita expedientes. No media cuando hay desequilibrio de poder o delito grave: en ese caso deriva.",
    examples: [
      "El colegio no activa el protocolo, ¿qué puedo exigir?",
      "Escríbeme un escrito para la dirección del centro",
      "¿Qué recursos públicos tengo disponibles?",
    ],
    greeting:
      "Soy PUENTE, el agente de trabajo social. Te ayudo a activar el protocolo del centro y los recursos públicos que te corresponden. ¿En qué situación estás?",
  },
  {
    id: "legal",
    name: "LEX",
    pillar: "Legal",
      role: "Sistema de IA de información jurídica",
    icon: Scale,
    summary:
      "Orientación jurídica preliminar sobre la vía penal, civil y administrativa aplicable al ciberacoso en España, y preparación de la denuncia.",
    capabilities: [
           "Información general sobre qué conductas pueden estar reguladas en el Código Penal, sin determinar si un caso concreto constituye delito", 
      "Explicación de la responsabilidad del menor infractor según su edad",
      "Guion de denuncia y documentación a aportar ante Policía, Guardia Civil o juzgado",
      "Derechos de la víctima, protección de datos y derecho al olvido",
    ],
    legalBasis: [
      "Código Penal: arts. 172 ter (acoso), 173.1 (trato degradante), 197 y 197.7 (intimidad y difusión de imágenes), 205-216 (injurias y calumnias), 510 (delitos de odio), 143.4",
      "LO 5/2000 de responsabilidad penal del menor (14-18 años); menores de 14 quedan fuera de la vía penal",
      "LO 1/1982 de protección del honor, la intimidad y la propia imagen",
      "Ley 4/2015 del Estatuto de la víctima del delito y Ley 15/2022 de igualdad de trato",
      "Ley 31/1995 de Prevención de Riesgos Laborales para el ciberacoso en el ámbito laboral",
    ],
    limits:
      "Es orientación jurídica general, no asesoramiento legal. No sustituye a un abogado colegiado ni redacta escritos procesales firmables.",
    examples: [
      "¿Esto que le hacen a mi hija es delito?",
      "El acosador tiene 13 años, ¿qué se puede hacer?",
      "¿Qué necesito para poner la denuncia?",
    ],
    greeting:
      "Soy LEX, el agente de orientación jurídica. Trabajo con la legislación vigente en España y te doy orientación general, nunca asesoramiento legal personalizado. ¿Qué ha ocurrido?",
  },
];

export const AGENT_MAP = Object.fromEntries(AGENTS.map((a) => [a.id, a])) as Record<AgentId, Agent>;

export const EMERGENCY_RESOURCES = [
  { label: "Emergencias", value: "112" },
  { label: "Policía Nacional", value: "091" },
  { label: "INCIBE — Ayuda en Ciberseguridad", value: "017" },
  { label: "Fundación ANAR (menores)", value: "900 20 20 10" },
  { label: "Conducta suicida", value: "024" },
  { label: "Violencia de género", value: "016" },
];
