import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  HeartPulse,
  Users,
  Scale,
  Clock,
  EyeOff,
  HeartCrack,
  ArrowRight,
  Bot,
} from "lucide-react";
import heroImg from "@/assets/hero-familia.jpg";
import logo from "@/assets/logo-red-violeta.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Red Violeta Ciberprevención | Respuesta integral al ciberacoso" },
      {
        name: "description",
        content:
          "Detectamos el ciberacoso en menos de 24 horas y combinamos ciberseguridad, apoyo psicológico, mediación familiar y asesoría legal, con agentes de IA disponibles 24/7.",
      },
      { property: "og:title", content: "Red Violeta Ciberprevención" },
      {
        property: "og:description",
        content:
          "Solución integral contra el ciberacoso: ciberseguridad, psicología, trabajo social y protección legal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const PROBLEMS = [
  {
    icon: EyeOff,
    title: "Familias a ciegas",
    text: "Los controles parentales no funcionan y las familias no saben a quién acudir. Se necesita una respuesta empática, rápida y profesional.",
  },
  {
    icon: Clock,
    title: "Llegar demasiado tarde",
    text: "Las líneas de ayuda tradicionales están colapsadas. Los menores esperan semanas para una respuesta y los adultos encuentran desconocimiento generalizado.",
  },
  {
    icon: HeartCrack,
    title: "Impacto emocional",
    text: "El aislamiento, la vergüenza y el miedo son constantes. Necesitan apoyo inmediato, empático y especializado.",
  },
];

const PILLARS = [
  {
    tag: "Técnico",
    icon: ShieldCheck,
    title: "Ciberseguridad especializada",
    text: "Analizamos cómo sucedió el ataque y generamos tu Grado de Vulnerabilidad Digital para identificar los riesgos y protegerte.",
  },
  {
    tag: "Clínico",
    icon: HeartPulse,
    title: "Apoyo psicológico especializado",
    text: "Nuestro equipo de psicólogos entiende el trauma del ciberacoso y ofrece apoyo terapéutico para el menor y su familia.",
  },
  {
    tag: "Social",
    icon: Users,
    title: "Mediación y protección",
    text: "Mediamos entre la familia, el centro educativo y los responsables. Diseñamos protocolos que funcionan porque cada caso es único.",
  },
  {
    tag: "Legal",
    icon: Scale,
    title: "Protección legal completa",
    text: "Abogados especializados en derecho digital te asesoran sobre tus derechos y opciones conforme a la normativa española.",
  },
];

function Home() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 sm:py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <img
              src={logo.url}
              alt="Logotipo de Red Violeta Ciberprevención"
              width={220}
              height={220}
              className="mb-6 h-28 w-auto object-contain"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Solución integral
            </p>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Ciberseguridad con impacto social
            </h1>
            <p className="mt-4 text-lg font-medium text-foreground">
              Ni tu hijo ni tú estáis solos.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Detectamos el ciberacoso en menos de 24 horas. Te ofrecemos una respuesta integral
              que combina ciberseguridad, apoyo psicológico, mediación familiar y asesoría legal.
              Porque cada caso es único y merece atención especializada.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/agentes"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Bot className="size-4" /> Hablar con un agente ahora
              </Link>
              <Link
                to="/test"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary active:border-primary active:bg-accent/60 hover:text-primary"
              >
                Iniciar test gratuito
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <span className="text-2xl font-bold text-primary">+35%</span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Aumento en solicitudes de auxilio (ANAR). Nosotros respondemos en menos de 24
                horas.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border">
            <img
              src={heroImg}
              alt="Madre y adolescente revisando juntas el teléfono móvil en casa"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          El ciberacoso es un problema real
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Millones de personas lo sufren cada año y necesitan respuestas rápidas, coordinadas y
          especializadas.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Cómo funciona Red Violeta
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Integramos cuatro pilares especializados para ofrecerte una respuesta completa y
            coordinada. Cada pilar cuenta además con un agente de IA disponible 24/7.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.tag} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <p.icon className="size-5" />
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
          <Link
            to="/agentes"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Conoce los cuatro agentes automatizados <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
        <div className="rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            ¿Tu hijo sufre ciberacoso?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            No está solo. Los agentes de Red Violeta están disponibles 24/7 y el equipo humano se
            pone en contacto contigo en menos de 24 horas.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/test"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Hacer test gratuito
            </Link>
            <Link
              to="/contacto"
              className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary active:border-primary active:bg-accent/60 hover:text-primary"
            >
              Contactar especialista
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
