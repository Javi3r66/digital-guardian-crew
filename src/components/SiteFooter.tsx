import { Link } from "@tanstack/react-router";
import { Mail, Clock } from "lucide-react";
import { EMERGENCY_RESOURCES } from "@/lib/agents";
import logo from "@/assets/logo-red-violeta.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40 px-safe pb-safe">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={logo.url}
              alt="Red Violeta Ciberprevención"
              width={140}
              height={140}
              loading="lazy"
              className="h-20 w-auto object-contain"
            />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Solución integral contra el ciberacoso. Respuesta en menos de 24 horas.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Servicios
            </p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {["Familias", "Colegios", "Empresas", "Administraciones"].map((s) => (
                <li key={s}>
                  <Link to="/servicios" className="active:text-primary hover:text-primary">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Recursos
            </p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>
                <Link to="/agentes" className="active:text-primary hover:text-primary">
                  Agentes 24/7
                </Link>
              </li>
              <li>
                <Link to="/test" className="active:text-primary hover:text-primary">
                  Test Gratuito
                </Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="active:text-primary hover:text-primary">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Contacto
            </p>
            <a
              href="mailto:info@redvioletaciberprevencion.es"
              className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
            >
              <Mail className="size-3.5" /> info@redvioletaciberprevencion.es
            </a>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" /> Disponible 24/7
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-background p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground">
            Ante una emergencia, llama
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {EMERGENCY_RESOURCES.map((r) => (
              <span key={r.value}>
                {r.label} <strong className="text-foreground">{r.value}</strong>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Red Violeta Ciberprevención. Los agentes de esta web son
          sistemas de inteligencia artificial (Reglamento UE 2024/1689) y no sustituyen a
          profesionales colegiados.
        </div>
      </div>
    </footer>
  );
}
