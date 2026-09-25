import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, HeartPulse, Users, Scale } from "lucide-react";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre nosotros | Red Violeta Ciberprevención" },
      {
        name: "description",
        content:
          "Red Violeta Ciberprevención integra ciberseguridad, psicología, trabajo social y derecho digital para dar una respuesta coordinada al ciberacoso en España.",
      },
      { property: "og:title", content: "Sobre nosotros | Red Violeta Ciberprevención" },
      {
        property: "og:description",
        content:
          "Una respuesta coordinada al ciberacoso: cuatro disciplinas trabajando sobre el mismo caso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sobre,
});

const TEAM = [
  { icon: ShieldCheck, title: "AURA · Seguridad digital", text: "Orientación inmediata para proteger cuentas y preservar evidencia digital." },
  { icon: HeartPulse, title: "CALMA · Apoyo emocional", text: "Contención emocional inicial y psicoeducación para el menor y su familia." },
  { icon: Users, title: "PUENTE · Orientación social", text: "Información sobre cómo activar el protocolo del centro y los recursos sociales disponibles." },
  { icon: Scale, title: "LEX · Información jurídica", text: "Información jurídica general sobre derechos y posibles vías de actuación." },
];

function Sobre() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl tracking-tight text-foreground">Nuestra misión</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
        Red Violeta Ciberprevención nace para facilitar el primer paso frente al ciberacoso. Cuando
        una familia detecta que algo va mal, a menudo no sabe por dónde empezar ni a quién acudir
        primero.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Por eso creamos cuatro sistemas de inteligencia artificial especializados —AURA, CALMA,
        PUENTE y LEX— que ofrecen orientación inmediata desde el primer momento, disponibles las
        24 horas. Los agentes de Red Violeta son sistemas de IA: no son profesionales sanitarios,
        abogados, trabajadores sociales ni servicios públicos de emergencia, y no sustituyen su
        intervención cuando esta es necesaria.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {TEAM.map((t) => (
          <div key={t.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <t.icon className="size-5" />
            </span>
            <h2 className="mt-4 text-base font-semibold text-foreground">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
        <h2 className="text-base font-semibold text-foreground">Marco normativo de referencia</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Todo nuestro trabajo se ajusta a la legislación vigente en España: la LO 8/2021 de
          protección integral a la infancia y la adolescencia frente a la violencia (LOPIVI), el
          Reglamento (UE) 2016/679 y la LO 3/2018 de protección de datos, la Ley 4/2015 del
          Estatuto de la víctima del delito, el Código Penal en los tipos aplicables al ciberacoso
          y, para los sistemas de IA que operan en esta web, el Reglamento (UE) 2024/1689 de
          Inteligencia Artificial.
        </p>
      </div>
    </div>
  );
}
