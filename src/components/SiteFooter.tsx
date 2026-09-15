import { Link } from "@tanstack/react-router";
import { Mail, Clock, Instagram, Linkedin, Facebook } from "lucide-react";
import { EMERGENCY_RESOURCES } from "@/lib/agents";
import { LEGAL_LINKS, CONTACT_EMAIL } from "@/lib/legal";
import { EmergencyWarning, LiabilityDisclaimer } from "@/components/LegalNotices";
import logo from "@/assets/logo-red-violeta.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40 px-safe pb-safe">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={logo}
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
                  <span className="hover:text-foreground transition-colors cursor-pointer">{s}</span>
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
                <Link to="/agentes" className="hover:text-foreground transition-colors">
                  Agentes 24/7
                </Link>
              </li>
              <li>
                <Link to="/test" className="hover:text-foreground transition-colors">
                  Test Gratuito
                </Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="hover:text-foreground transition-colors">
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
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="size-3.5" /> {CONTACT_EMAIL}
            </a>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" /> Disponible 24/7
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground shadow-xs">
          <p className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
            Ante una emergencia, llama
          </p>
          <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs">
            {EMERGENCY_RESOURCES.map((r) => (
              <span key={r.label}>
                {r.label}{" "}
                <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="font-bold text-foreground hover:underline">
                  {r.phone}
                </a>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <EmergencyWarning />
        </div>

        <div className="mt-6">
          <LiabilityDisclaimer />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Red Violeta Ciberprevención. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} to={link.href} className="hover:text-foreground transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
