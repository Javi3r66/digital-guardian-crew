import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Gavel, Users, LineChart, Presentation } from "lucide-react";
import { InstitutionalAuditor } from "@/components/InstitutionalAuditor";
import { B2BLeadForm } from "@/components/B2BLeadForm";

export const Route = createFileRoute("/colegios")({
  head: () => ({
    meta: [
      { title: "Colegios e Instituciones | Red Violeta Ciberprevención" },
      {
        name: "description",
        content:
          "Orientación LOPIVI para centros educativos: test institucional orientativo, información sobre protocolos, y charlas presenciales para alumnado, docentes y familias.",
      },
      { property: "og:title", content: "Colegios e Instituciones | Red Violeta" },
      {
        property: "og:description",
        content:
          "Orientación LOPIVI, información sobre protocolos y formación presencial contra el ciberacoso para centros educativos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Colegios,
});

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Orientación sobre la LOPIVI",
    text: "Información general sobre el protocolo de protección y la figura del coordinador de bienestar y protección exigidos por la LO 8/2021, como punto de partida para que el centro organice su propia documentación.",
  },
  {
    icon: Gavel,
    title: "Orientación ante incidentes",
    text: "Información general sobre cómo preservar evidencia digital, criterios de comunicación a familias, y el marco del RGPD, la LO 3/2018 y el Reglamento (UE) 2024/1689 de IA.",
  },
  {
    icon: Users,
    title: "Atención por IA 24/7 para la comunidad",
    text: "Alumnado, familias y docentes acceden a los cuatro agentes (técnico, psicológico, social y legal) fuera del horario lectivo, sin guardar conversaciones.",
  },
  {
    icon: LineChart,
    title: "Diagnóstico y seguimiento medible",
    text: "Índice de Exposición al Riesgo del centro, plan de mejora priorizado y revisión periódica para demostrar avances ante inspección y familias.",
  },
];

const CHARLAS = [
  {
    publico: "Alumnado",
    text: "Sesiones por ciclos: identificación del ciberacoso, huella digital, sexting, retos virales y cómo pedir ayuda sin miedo.",
  },
  {
    publico: "Docentes",
    text: "Detección temprana, activación del protocolo, recogida correcta de evidencias y límites legales de la actuación del centro.",
  },
  {
    publico: "Familias y AMPAs",
    text: "Acompañamiento sin revictimizar, control parental razonable, señales de alarma y vías de denuncia en España.",
  },
];

const PUBLICOS = ["Alumnado", "Docentes", "Familias y AMPAs", "Comunidad completa"];

function Colegios() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 px-safe sm:px-5 sm:py-14">
      <section className="max-w-3xl">
        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Colegios e Instituciones
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          El ciberacoso ya no termina en la puerta del colegio
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          La LO 8/2021 (LOPIVI) obliga a todos los centros educativos a contar con protocolos de
          protección y con un coordinador de bienestar. Red Violeta acompaña a la dirección del
          centro con orientación general, un test institucional orientativo y formación presencial,
          con atención por inteligencia artificial disponible las 24 horas para toda la comunidad
          educativa.
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {BENEFITS.map((b) => (
          <article key={b.title} className="rounded-2xl border border-border bg-card p-5">
            <b.icon className="size-6 text-primary" />
            <h2 className="mt-3 text-base font-semibold">{b.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          Auditor de Vulnerabilidad Institucional
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Siete preguntas sobre protocolos, evidencias y blindaje legal. Al terminar obtendrás el
          Índice de Exposición al Riesgo de tu centro.
        </p>
        <div className="mt-6">
          <InstitutionalAuditor />
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-center gap-2">
          <Presentation className="size-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">Charlas presenciales</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Formación adaptada a cada público, impartida en el propio centro y compatible con el plan
          de convivencia.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {CHARLAS.map((c) => (
            <article key={c.publico} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-primary">{c.publico}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h3 className="text-base font-semibold">Solicita fechas y presupuesto</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Indícanos el público destinatario y las fechas que barajáis; te enviamos propuesta y
            presupuesto sin compromiso.
          </p>
          <div className="mt-5">
            <B2BLeadForm
              kind="charla"
              publicoOptions={PUBLICOS}
              submitLabel="Solicitar fechas y presupuesto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
