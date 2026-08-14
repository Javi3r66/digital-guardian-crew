import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/native";
import { usePersistentState } from "@/hooks/use-persistent-state";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Test gratuito de vulnerabilidad digital | Red Violeta" },
      {
        name: "description",
        content:
          "Cuestionario orientativo y anónimo para estimar el Grado de Vulnerabilidad Digital ante el ciberacoso. No se guarda ningún dato.",
      },
      { property: "og:title", content: "Test gratuito de vulnerabilidad digital" },
      {
        property: "og:description",
        content: "Ocho preguntas para orientarte sobre tu situación frente al ciberacoso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Test,
});

const QUESTIONS = [
  "¿Se han recibido mensajes, comentarios o llamadas hostiles de forma repetida en las últimas semanas?",
  "¿Existen perfiles falsos, suplantaciones o publicaciones con fotos o vídeos sin consentimiento?",
  "¿El acoso proviene de personas del entorno cercano (centro educativo, trabajo, familia)?",
  "¿Se ha difundido contenido íntimo o sexual, o se ha amenazado con difundirlo?",
  "¿Se han guardado pruebas (capturas con fecha, URL y nombre de usuario) de lo ocurrido?",
  "¿Se han observado cambios de conducta: aislamiento, insomnio, absentismo o abandono del móvil?",
  "¿Se ha comunicado ya la situación al centro educativo, a la empresa o a la policía?",
  "¿Las cuentas afectadas tienen verificación en dos pasos y la privacidad restringida?",
];

// Preguntas 5, 7 y 8 puntúan al revés: un "sí" reduce el riesgo.
const PROTECTIVE = new Set([4, 6, 7]);

function Test() {
  const [answers, setAnswers, { reset }] = usePersistentState<Record<number, boolean>>(
    "rv.test.answers",
    {},
  );
  const [sent, setSent] = useState(false);
  const answered = Object.keys(answers).length;

  const risk = QUESTIONS.reduce((acc, _q, i) => {
    const a = answers[i];
    if (a === undefined) return acc;
    const bad = PROTECTIVE.has(i) ? !a : a;
    return acc + (bad ? 1 : 0);
  }, 0);

  const level =
    risk >= 6
      ? { label: "Alto", tone: "text-destructive", bg: "border-destructive/40 bg-destructive/5" }
      : risk >= 3
        ? { label: "Medio", tone: "text-primary", bg: "border-primary/40 bg-primary/5" }
        : { label: "Bajo", tone: "text-foreground", bg: "border-border bg-card" };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Test gratuito de vulnerabilidad digital
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Ocho preguntas orientativas para situar tu caso. Es anónimo: no pide ningún dato personal y
        no se envía nada a nuestros servidores. Tus respuestas quedan guardadas solo en este
        dispositivo para que puedas continuar el test sin conexión, y puedes borrarlas cuando
        quieras con «Reiniciar». No es un diagnóstico ni una valoración jurídica.
      </p>

      <div className="mt-8 space-y-3">
        {QUESTIONS.map((q, i) => (
          <div key={q} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm leading-relaxed text-foreground">{q}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:flex">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => {
                    void haptic("light");
                    setAnswers((a) => ({ ...a, [i]: v }));
                  }}
                  className={cn(
                    "rounded-xl border px-4 py-2.5 text-sm font-medium transition-transform active:scale-95 sm:py-1.5 sm:text-xs",
                    answers[i] === v
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground active:bg-accent",
                  )}
                >
                  {v ? "Sí" : "No"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            void haptic(risk >= 6 ? "warning" : "success");
            setSent(true);
          }}
          disabled={answered < QUESTIONS.length}
          className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform active:scale-95 disabled:opacity-40 sm:w-auto sm:py-3"
        >
          Ver resultado
        </button>
        <button
          onClick={() => {
            void haptic("light");
            reset();
            setSent(false);
          }}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground active:text-primary"
        >
          <RotateCcw className="size-3.5" /> Reiniciar
        </button>

        <span className="text-xs text-muted-foreground">
          {answered}/{QUESTIONS.length} respondidas
        </span>
      </div>

      {sent && answered === QUESTIONS.length && (
        <div className={cn("mt-8 rounded-2xl border p-6", level.bg)}>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Grado de vulnerabilidad digital orientativo
          </p>
          <p className={cn("mt-1 text-2xl font-bold", level.tone)}>
            {level.label} · {risk} de {QUESTIONS.length} indicadores de riesgo
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {risk >= 6
              ? "La situación presenta varios indicadores graves. Contacta cuanto antes con el equipo humano y, si hay difusión de contenido íntimo, amenazas o riesgo para la integridad, acude a la Policía (091) o al 112. Puedes usar el Canal Prioritario de la AEPD para solicitar la retirada urgente de contenido sexual o violento."
              : risk >= 3
                ? "Hay señales que conviene atender pronto. Empieza por preservar las pruebas y por activar el protocolo del centro educativo o de la empresa. Los agentes pueden guiarte paso a paso en cada uno de esos frentes."
                : "No se detectan indicadores graves con esta información. Aun así, refuerza la prevención: verificación en dos pasos, revisión de privacidad y conversación abierta en casa."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/agentes"
              className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Hablar con un agente
            </Link>
            <Link
              to="/contacto"
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground"
            >
              Contactar con el equipo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
