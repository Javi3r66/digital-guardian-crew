import { useEffect, useRef, useState } from "react";

/**
 * KPIs de Impacto — Red Violeta Ciberprevención
 *
 * Bloque de prueba social para la fase inicial de lanzamiento.
 * Diseñado para evitar "prueba social negativa": sin contadores en
 * tiempo real ni cifras absolutas bajas. Las cifras cualitativas
 * (24/7, 100%, +100) transmiten rigor sin revelar volumen real.
 *
 * Para escalar los números en el futuro, edita únicamente el array
 * `STATS` de abajo: `value` admite números con sufijos (ej. "+5.000",
 * "98%"). El count-up anima el componente numérico si lo detecta.
 */

type Stat = {
  /** Etiqueta corta del eje del KPI. */
  label: string;
  /**
   * Valor mostrado. Puede ser:
   *  - un número puro ("100")
   *  - número con sufijo no numérico ("100%", "24/7", "+100")
   *  - texto cualitativo
   * El count-up solo anima el tramo numérico inicial.
   */
  value: string;
  /** Subtexto explicativo bajo la cifra. */
  caption: string;
};

const STATS: Stat[] = [
  {
    label: "Disponibilidad",
    value: "24/7",
    caption: "Orientación automatizada disponible en todo momento",
  },
  {
    label: "Especialización",
    value: "4",
    caption: "Sistemas de IA especializados: seguridad, apoyo emocional, orientación social y jurídica",
  },
  {
    label: "Enfoque en privacidad",
    value: "Anónimo",
    caption: "No se piden datos identificativos para usar el chat",
  },
];

const FOOTNOTE =
  "Sistema diseñado bajo normativas de protección de datos y confidencialidad.";

/**
 * Extrae el tramo numérico inicial de un valor para animarlo.
 * "100%"   -> { prefix: "",  digits: "100", suffix: "%" }
 * "+100"   -> { prefix: "+",  digits: "100", suffix: "" }
 * "24/7"   -> { prefix: "",   digits: "24",  suffix: "/7" }  (no animado: sufijo no numérico)
 * "Alto"   -> null (sin count-up)
 */
function splitNumeric(value: string) {
  const match = value.match(/^([^\d]*)(\d[\d.\s]*)(.*)$/);
  if (!match) return null;
  const prefix = match[1] ?? "";
  const digitsRaw = match[2] ?? "";
  const suffix = match[3] ?? "";
  const digits = digitsRaw.replace(/\s/g, "").replace(/\./g, "");
  // Solo animamos si el sufijo es numérico/porcentaje/vacío (evita "24/7").
  if (suffix && !/^[%]?$/.test(suffix)) return null;
  const target = parseInt(digits, 10);
  if (Number.isNaN(target)) return null;
  return { prefix, target, suffix };
}

function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, options]);
  return { ref, inView };
}

/** Count-up discreto: ~900ms con easing, sin rebotes agresivos. */
function useCountUp(target: number, active: boolean, duration = 900) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic — entrada rápida, llegada suave.
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return active ? current : 0;
}

function StatItem({ stat, animate }: { stat: Stat; animate: boolean }) {
  const parts = splitNumeric(stat.value);
  const count = useCountUp(parts?.target ?? 0, animate && !!parts);
  const display = parts
    ? `${parts.prefix}${count}${parts.suffix}`
    : stat.value;

  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {stat.label}
      </span>
      <span
        className="mt-2 text-4xl font-bold tabular-nums tracking-tight text-primary sm:text-5xl"
        aria-label={stat.value}
      >
        {display}
      </span>
      <span className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
        {stat.caption}
      </span>
    </div>
  );
}

export function ImpactStats() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      aria-label="Indicadores de impacto"
      className="border-b border-border bg-muted/40"
    >
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="rounded-2xl border border-border bg-card px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} animate={inView} />
            ))}
          </div>
          <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground/80">
            {FOOTNOTE}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ImpactStats;
