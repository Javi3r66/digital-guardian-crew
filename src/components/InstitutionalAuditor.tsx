import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/native";

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
    block: "Bloque 3 · Marco legal y formación",
    text: "¿Habéis revisado el uso de herramientas de IA del centro conforme al Reglamento (UE) 2024/1689?",
    options: [
      { label: "Sí, con registro de sistemas e información al usuario", risk: 0 },
      { label: "En proceso de revisión", risk: 55 },
      { label: "No se ha valorado", risk: 100 },
    ],
  },
  {
    id: "trazabilidad",
    block: "Bloque 3 · Marco legal y formación",
    text: "¿Puede el centro documentar de forma trazable un incidente, por si hiciera falta aportarlo a inspección educativa o a la vía penal?",
    options: [
      { label: "Sí, con plantilla y responsable asignado", risk: 0 },
      { label: "Se elabora caso a caso, sin criterio fijo", risk: 60 },
      { label: "No se documenta de forma sistemática", risk: 100 },
    ],
  },
  {
    id: "formacion",
    block: "Bloque 3 · Marco legal y formación",
    text: "Porcentaje de docentes con formación específica en detección de ciberacoso y LOPIVI.",
    options: [
      { label: "Más del 70 % del claustro", risk: 0 },
      { label: "Entre el 30 % y el 70 %", risk: 55 },
      { label: "Menos del 30 %", risk: 100 },
    ],
  },
];

function riskNote(score: number) {
  if (score <= 30) return "El centro parece tener bien cubiertos los puntos clave de protocolo y evidencia.";
  if (score <= 65) return "Hay varios puntos que conviene reforzar en el protocolo del centro.";
  return "Se han detectado varios puntos importantes por reforzar en el protocolo del centro.";
}

export function InstitutionalAuditor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

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
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Gauge className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Resultado orientativo del centro
            </h3>
            <p className="text-xs text-muted-foreground">
              Basado en 7 indicadores sobre protocolo, evidencia técnica y formación. No es una
              auditoría oficial ni una certificación.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-background p-6">
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all"
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{riskNote(score)}</p>
          <ul className="mt-5 space-y-2">
            {QUESTIONS.filter((qq) => (answers[qq.id] ?? 0) >= 55).map((qq) => (
              <li key={qq.id} className="flex gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                Punto de mejora: {qq.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Si quieres comentar estos resultados o programar un taller para vuestro centro, puedes
          escribirnos cuando quieras.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/contacto"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Contactar
          </Link>
          <Link
            to="/agentes"
            className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground"
          >
            Hablar con un agente
          </Link>
        </div>
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
          {step + 1 === QUESTIONS.length ? "Ver resultado" : "Siguiente"}{" "}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
