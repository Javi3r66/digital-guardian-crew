import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios para familias, colegios y empresas | Red Violeta" },
           {
        name: "description",
        content:
          "Orientación, prevención y talleres formativos contra el ciberacoso para familias, centros educativos, empresas y administraciones públicas, alineados con la LOPIVI.",
      },
      { property: "og:title", content: "Servicios especializados | Red Violeta" },
      {
        property: "og:description",
        content:
          "Respuesta al ciberacoso adaptada a familias, colegios, empresas y administraciones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Servicios,
});

const SERVICES = [
  {
    tag: "Familias",
    title: "Orientación integral para tu familia",
    text: "Cuando en la familia se vive una situación de ciberacoso, es fácil sentirse perdido. Nuestros agentes de IA te orientan de inmediato, y puedes solicitar una conversación personalizada sobre tu caso.",
    items: [
      "Orientación inmediata con los 4 agentes de IA",
      "Test orientativo gratuito de vulnerabilidad digital",
      "Conversación personalizada bajo petición",
    ],
  },
  {
    tag: "Colegios",
    title: "Orientación y prevención para el alumnado",
    text: "Ayudamos a tu centro a reforzar la prevención frente al ciberacoso, en línea con la LOPIVI: acceso a los agentes de IA para el alumnado, el test orientativo, y talleres de formación adaptados a vuestras necesidades.",
    items: [
      "Acceso del alumnado a los 4 agentes de IA",
      "Talleres de prevención adaptados al centro",
      "Test orientativo gratuito de vulnerabilidad digital",
    ],
  },
  {
    tag: "Empresas",
    title: "Bienestar digital para tu equipo",
    text: "El ciberacoso también puede darse en el entorno laboral. Ofrecemos formación y recursos de prevención para cuidar el bienestar digital de tu equipo.",
    items: [
      "Talleres de ciberseguridad y bienestar digital",
      "Acceso de empleados y sus familias a los agentes de IA",
      "Recursos de prevención adaptados al entorno laboral",
    ],
  },
  {
    tag: "Administraciones",
    title: "Colaboración con administraciones públicas",
    text: "Colaboramos con administraciones públicas en campañas de sensibilización y programas de prevención del ciberacoso adaptados a cada territorio.",
    items: [
      "Jornadas de sensibilización ciudadana",
      "Formación para personal técnico y de servicios sociales",
      "Conversación para diseñar un programa a medida",
    ],
  },
];

function Servicios() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl tracking-tight text-foreground">
        Servicios especializados
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Soluciones adaptadas para cada segmento. Todos los servicios incorporan el acceso a los
        cuatro agentes automatizados disponibles 24/7.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.tag} className="rounded-2xl border border-border bg-card p-6">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
              {s.tag}
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            <ul className="mt-4 space-y-2">
              {s.items.map((i) => (
                <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
        <p className="text-sm text-foreground">
          ¿No sabes por dónde empezar? Empieza por el test gratuito o habla directamente con uno de
          los agentes.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/test"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Test gratuito
          </Link>
          <Link
            to="/agentes"
            className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground"
          >
            Agentes 24/7
          </Link>
        </div>
      </div>
    </div>
  );
}
