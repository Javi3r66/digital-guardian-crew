import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap, Landmark, Building2, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { B2BLeadForm } from "@/components/B2BLeadForm";
import { CONTACT_EMAIL } from "@/lib/legal";

const WORKSHOPS = [
  {
    icon: GraduationCap,
    emoji: "🏫",
    title: "Centros Educativos",
    text: "Sesiones adaptadas para alumnado (Primaria, ESO y Bachillerato), claustro docente y AMPAs/familias.",
    points: [
      "Prevención y detección temprana del ciberbullying.",
      "Uso seguro y ético de redes sociales y pantallas.",
      "Talleres de convivencia digital y Netiqueta.",
    ],
  },
  {
    icon: Landmark,
    emoji: "🏛️",
    title: "Administraciones Públicas",
    text: "Jornadas de sensibilización social, formación de empleados públicos y campañas comunitarias.",
    points: [
      "Protocolos de actuación institucional frente al acoso en línea.",
      "Alfabetización digital para personal técnico y de servicios sociales.",
      "Jornadas abiertas a la ciudadanía y espacios de juventud.",
    ],
  },
  {
    icon: Building2,
    emoji: "💼",
    title: "Centros de Trabajo",
    text: "Capacitación en ciberseguridad humana, concienciación digital y salud mental en entornos corporativos.",
    points: [
      "Prevención del ciberacoso laboral y conductas de riesgo.",
      "Gestión de la desconexión digital y buen uso de canales internos.",
      "Formación en concienciación de ciberseguridad para empleados.",
    ],
  },
] as const;

const ENTITY_OPTIONS = [
  "Centro Educativo",
  "Administración Pública",
  "Centro de Trabajo / Empresa",
  "Otro",
];

export function WorkshopsSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="talleres-presupuestos" className="bg-[#f9f8fc] scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Talleres y Charlas Informativas en tus Instalaciones
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Capacitamos a Centros Educativos, Administraciones Públicas y Centros de Trabajo con
            programas adaptados a las necesidades reales de cada colectivo. Desarrollamos formación
            práctica sobre ciberprevención, uso responsable de la tecnología y respuesta ante el
            ciberbullying.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {WORKSHOPS.map((w) => (
            <div
              key={w.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <w.icon className="size-6" />
                </span>
                <span className="text-2xl" aria-hidden="true">
                  {w.emoji}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
              <ul className="mt-4 space-y-2.5">
                {w.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            ¿Quieres organizar una jornada o taller en tu centro o institución?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/90">
            Solicita un presupuesto personalizado sin compromiso. Diseñamos la formación a medida de
            tus horarios, instalaciones (presencial u online) y número de participantes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform hover:opacity-90 active:scale-95"
            >
              Solicitar Presupuesto <ArrowRight className="size-4" />
            </button>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Solicitud%20de%20presupuesto%20para%20talleres`}
              className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/40 bg-transparent px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <Mail className="size-4" /> Enviar un Email
            </a>
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Solicitar presupuesto para talleres</DialogTitle>
            <DialogDescription>
              Cuéntanos sobre tu entidad y te enviaremos una propuesta personalizada en menos de 24
              horas.
            </DialogDescription>
          </DialogHeader>
          <B2BLeadForm
            kind="charla"
            compact
            publicoLabel="Tipo de Entidad"
            publicoOptions={ENTITY_OPTIONS}
            submitLabel="Solicitar presupuesto"
            onDone={() => setModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
