import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Lock, CheckCircle2, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/native";
import { B2BLeadForm } from "@/components/B2BLeadForm";

type Question = {
  id: string;
  block: string;
  text: string;
  options: { label: string; risk: number }[];
};

const QUESTIONS: Question[] = [
  {
    id: "canal",
    block: "Bloque 1 · Protocolos y tiempos de respuesta",
    text: "¿El centro dispone de un canal de comunicación abierto 24/7 para notificar casos de ciberacoso?",
    options: [
      { label: "Sí, activo y conocido por el alumnado", risk: 0 },
      { label: "Existe, pero solo en horario lectivo", risk: 60 },
      { label: "No existe un canal específico", risk: 100 },
    ],
  },
  {
    id: "tiempo",
    block: "Bloque 1 · Protocolos y tiempos de respuesta",
    text: "Tiempo medio desde la detección hasta activar la comisión de convivencia.",
    options: [
      { label: "Menos de 24 horas", risk: 0 },
      { label: "Entre 2 y 5 días lectivos", risk: 50 },
      { label: "Más de una semana o sin plazo definido", risk: 100 },
    ],
  },
  {
    id: "evidencias",
    block: "Bloque 2 · Recolección de evidencias técnicas",
    text: "¿El equipo conoce la cadena de custodia técnica de evidencias digitales (capturas con metadatos, hashes, acta notarial)?",
    options: [
      { label: "Sí, con procedimiento escrito", risk: 0 },
      { label: "Conocimiento parcial e informal", risk: 60 },
      { label: "No se documentan las evidencias", risk: 100 },
    ],
  },
  {
    id: "visibilidad",
    block: "Bloque 2 · Recolección de evidencias técnicas",
    text: "Visibilidad del centro sobre incidentes que ocurren fuera del horario lectivo (redes sociales, grupos de mensajería).",
    options: [
      { label: "Se recogen y registran de forma sistemática", risk: 0 },
      { label: "Solo cuando lo comunica una familia", risk: 65 },
      { label: "Ninguna visibilidad", risk: 100 },
    ],
  },
  {
    id: "ia",
    block: "Bloque 3 · Blindaje legal y formación",
    text: "¿Habéis adaptado el uso de herramientas de IA del centro al Reglamento (UE) 2024/1689?",
    options: [
      { label: "Sí, con registro de sistemas e información al usuario", risk: 0 },
      { label: "En proceso de revisión", risk: 55 },
      { label: "No se ha valorado", risk: 100 },
    ],
  },
  {
    id: "trazabilidad",
    block: "Bloque 3 · Blindaje legal y formación",
    text: "¿Puede el centro emitir un informe de trazabilidad válido para aportar a la vía penal o a inspección educativa?",
    options: [
      { label: "Sí, con plantilla y responsable asignado", risk: 0 },
      { label: "Se elabora caso a caso, sin criterio fijo", risk: 60 },
      { label: "No se emite ningún informe", risk: 100 },
    ],
  },
  {
    id: "formacion",
    block: "Bloque 3 · Blindaje legal y formación",
    text: "Porcentaje de docentes con formación específica en detección de ciberacoso y LOPIVI.",
    options: [
      { label: "Más del 70 % del claustro", risk: 0 },
      { label: "Entre el 30 % y el 70 %", risk: 55 },
      { label: "Menos del 30 %", risk: 100 },
    ],
  },
];

type Phase = "quiz" | "calculando" | "gate" | "listo";

function riskLabel(score: number) {
  if (score <= 30) return { label: "Exposición baja", tone: "text-primary" };
  if (score <= 65) return { label: "Exposición media", tone: "text-foreground" };
  return { label: "Exposición alta", tone: "text-destructive" };
}

export function InstitutionalAuditor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>("quiz");

  const q = QUESTIONS[step]!;
  const progress = ((step + (answers[q.id] !== undefined ? 1 : 0)) / QUESTIONS.length) * 100;
  const score = Math.round(
    Object.values(answers).reduce((a, b) => a + b, 0) / Math.max(QUESTIONS.length, 1),
  );

  function answer(risk: number) {
    void haptic("light");
    const next = { ...answers, [q.id]: risk };
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setPhase("calculando");
      window.setTimeout(() => setPhase("gate"), 2200);
    }
  }

  if (phase === "calculando") {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-8 text-center">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <p className="text-sm font-medium text-foreground">
          IA calculando matriz de riesgos del centro...
        </p>
        <div className="h-2 w-56 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        </div>
      </div>
    );
  }

  if (phase === "gate" || phase === "listo") {
    const r = riskLabel(score);
    return (
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Gauge className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Índice de Exposición al Riesgo calculado
            </h3>
            <p className="text-xs text-muted-foreground">
              Basado en 7 indicadores de protocolo, evidencia técnica y blindaje legal.
            </p>
          </div>
        </div>

        {phase === "gate" ? (
          <>
            <div className="mt-6 rounded-2xl border border-dashed border-primary/40 bg-accent/40 p-6 text-center">
              <Lock className="mx-auto size-5 text-primary" aria-hidden="true" />
              <p className="mt-3 text-3xl font-bold tracking-tight text-foreground blur-sm select-none">
                {score}%
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Completa los datos del centro para desbloquear el informe institucional completo.
              </p>
            </div>
            <div className="mt-6">
              <B2BLeadForm
                kind="auditoria"
                riesgo={score}
                respuestas={answers}
                submitLabel="Desbloquear y recibir el informe"
                onDone={() => setPhase("listo")}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 rounded-2xl border border-border bg-background p-6">
              <p className={cn("text-4xl font-bold tracking-tight", r.tone)}>{score}%</p>
              <p className="mt-1 text-sm font-medium text-foreground">{r.label}</p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>
              <ul className="mt-5 space-y-2">
                {QUESTIONS.filter((qq) => (answers[qq.id] ?? 0) >= 55).map((qq) => (
                  <li key={qq.id} className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Punto de mejora prioritario: {qq.text}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Hemos registrado tu solicitud. El equipo de Red Violeta te envía el informe detallado
              y una propuesta de reunión de diagnóstico.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-primary">{q.block}</span>
        <span>
          {step + 1} / {QUESTIONS.length}
        </span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary/50 via-primary to-primary/80 transition-all duration-500"
          style={{ width: `${Math.max(progress, 6)}%` }}
        />
      </div>

      <h3 className="mt-6 text-lg font-semibold leading-snug text-foreground">{q.text}</h3>

      <div className="mt-5 space-y-3">
        {q.options.map((o) => (
          <button
            key={o.label}
            onClick={() => answer(o.risk)}
            className={cn(
              "w-full rounded-2xl border p-4 text-left text-sm transition-colors active:scale-[0.99]",
              answers[q.id] === o.risk
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ArrowLeft className="size-4" /> Anterior
        </Button>
        <Button
          size="sm"
          disabled={answers[q.id] === undefined}
          onClick={() => answer(answers[q.id]!)}
        >
          {step + 1 === QUESTIONS.length ? "Calcular índice" : "Siguiente"}{" "}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
