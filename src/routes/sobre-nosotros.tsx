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
  { icon: ShieldCheck, title: "Ciberseguridad", text: "Contención del incidente y preservación de evidencia digital." },
  { icon: HeartPulse, title: "Psicología", text: "Atención al trauma del ciberacoso para el menor y su familia." },
  { icon: Users, title: "Trabajo social", text: "Coordinación con el centro educativo y los servicios sociales." },
  { icon: Scale, title: "Derecho digital", text: "Asesoramiento sobre derechos y vías de protección legal." },
];

function Sobre() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl tracking-tight text-foreground">Nuestra misión</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
        Red Violeta Ciberprevención nace para transformar la respuesta al ciberacoso. Cuando una
        familia detecta que algo va mal, se encuentra con recursos dispersos: un informático por un
        lado, un psicólogo por otro, el colegio por otro y un abogado al final del camino. Ese
        recorrido consume semanas que la víctima no tiene.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Nuestra propuesta es unir las cuatro disciplinas sobre el mismo caso y desde la primera
        hora, con una respuesta en menos de 24 horas y un plan de acción escrito.
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
