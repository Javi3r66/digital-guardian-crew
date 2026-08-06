import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  MessageSquare,
  BookOpen,
  RefreshCcw,
  Lock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { AgentChat } from "@/components/AgentChat";
import { AGENTS, EMERGENCY_RESOURCES, type AgentId } from "@/lib/agents";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agentes IA contra el ciberacoso | Red Violeta Ciberprevención" },
      {
        name: "description",
        content:
          "Prueba de concepto de cuatro agentes de IA especializados en ciberseguridad, psicología, trabajo social y orientación legal frente al ciberacoso, conforme a la legislación española.",
      },
      { property: "og:title", content: "Agentes IA contra el ciberacoso | Red Violeta" },
      {
        property: "og:description",
        content:
          "Cuatro agentes especializados en prevención y respuesta al ciberacoso, alineados con LOPIVI, RGPD y el Código Penal español.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    icon: MessageSquare,
    title: "1. Elige el agente",
    text: "Selecciona el pilar que necesitas: técnico, clínico, social o legal. Puedes cambiar de agente en cualquier momento; cada uno mantiene su propia conversación.",
  },
  {
    icon: BookOpen,
    title: "2. Describe el caso sin datos personales",
    text: "Cuenta qué ha pasado evitando nombres, DNI, teléfonos o direcciones. El agente te pedirá los detalles que necesite para orientarte.",
  },
  {
    icon: CheckCircle2,
    title: "3. Recibe pasos accionables",
    text: "Obtienes un máximo de cinco pasos concretos, con la norma española en la que se apoyan y los recursos oficiales a los que acudir.",
  },
  {
    icon: RefreshCcw,
    title: "4. Valora la respuesta",
    text: "El pulgar arriba/abajo alimenta el ciclo de mejora: las respuestas marcadas pasan a revisión de un profesional humano antes de incorporarse a la base de conocimiento.",
  },
];

function Index() {
  const [active, setActive] = useState<AgentId>("ciberseguridad");

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-4" />
            </span>
            <span className="font-semibold tracking-tight">Red Violeta · Agentes</span>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            Prueba de concepto
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pt-14 pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Cuatro pilares, cuatro agentes
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          Agentes automatizados especializados en prevención y respuesta al ciberacoso
        </h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">
          Réplica de los cuatro pilares de Red Violeta —ciberseguridad, apoyo psicológico, mediación
          social y protección legal— como agentes independientes, cada uno con su propio ámbito,
          sus límites y su base normativa española. Esto es una demostración funcional previa a
          cualquier instalación en el sitio.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {["LOPIVI (LO 8/2021)", "RGPD y LO 3/2018", "Código Penal", "Reglamento (UE) 2024/1689 de IA"].map(
            (t) => (
              <span key={t} className="rounded-full bg-muted px-3 py-1.5">
                {t}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-3">
            {AGENTS.map((a) => (
              <button
                key={a.id}
                onClick={() => setActive(a.id)}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left transition-colors",
                  active === a.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg",
                      active === a.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <a.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {a.name}{" "}
                      <span className="font-normal text-muted-foreground">· {a.pillar}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{a.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{a.summary}</p>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <AgentChat key={active} agentId={active} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Qué hace este agente</h3>
                <ul className="mt-3 space-y-2">
                  {AGENTS.find((a) => a.id === active)!.capabilities.map((c) => (
                    <li key={c} className="flex gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Base normativa y límites</h3>
                <ul className="mt-3 space-y-2">
                  {AGENTS.find((a) => a.id === active)!.legalBasis.map((c) => (
                    <li key={c} className="text-xs leading-relaxed text-muted-foreground">
                      · {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-border pt-3 text-xs leading-relaxed text-foreground">
                  <Lock className="mr-1 inline size-3" />
                  {AGENTS.find((a) => a.id === active)!.limits}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Cómo se usan los agentes
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Cuatro pasos. El usuario no necesita saber nada técnico ni jurídico.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-4" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">
              Aprendizaje y autoentrenamiento: cómo funciona realmente
            </h3>
            <div className="mt-3 grid gap-4 text-xs leading-relaxed text-muted-foreground sm:grid-cols-3">
              <p>
                <strong className="text-foreground">Memoria de caso.</strong> Dentro de una
                conversación el agente conserva todo el contexto y refina sus respuestas. En esta
                demostración nada se guarda al recargar la página.
              </p>
              <p>
                <strong className="text-foreground">Base de conocimiento viva.</strong> El
                aprendizaje entre casos se implementa como recuperación sobre una base de
                conocimiento (protocolos, normativa, casuística anonimizada) que se amplía sin
                reentrenar el modelo. Es lo que hace que el agente "aprenda" de forma trazable.
              </p>
              <p>
                <strong className="text-foreground">Revisión humana obligatoria.</strong> El
                feedback del usuario no modifica al agente automáticamente: entra en una cola que
                valida un profesional del pilar correspondiente. Un autoentrenamiento sin
                supervisión sobre datos de víctimas no sería admisible bajo el RGPD ni bajo el
                Reglamento (UE) 2024/1689 de IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <h2 className="text-sm font-semibold text-foreground">
            Límites de los agentes y recursos oficiales
          </h2>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Los agentes son sistemas de inteligencia artificial. No son profesionales colegiados, no
            emiten diagnósticos ni asesoramiento jurídico y no sustituyen al equipo humano de Red
            Violeta. Ante riesgo inmediato, se deriva siempre a los recursos públicos:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {EMERGENCY_RESOURCES.map((r) => (
              <span
                key={r.value}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground"
              >
                {r.label} <strong>{r.value}</strong>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <ArrowRight className="size-4 text-primary" />
          Esta prueba se integraría en redvioletaciberprevencion.es como una sección
          "Agentes 24/7", accesible desde el menú y desde el Test Gratuito.
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-8 text-xs text-muted-foreground">
          Prueba de concepto para Red Violeta Ciberprevención · Contenido generado por IA, sujeto a
          verificación profesional.
        </div>
      </footer>
    </main>
  );
}
