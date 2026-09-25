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
              Prevención, información y orientación frente al ciberacoso, mediante inteligencia artificial.
            </p> 
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Servicios
            </p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                          <li>
                <Link to="/#servicios" className="hover:text-foreground transition-colors">
                  Preservación de evidencia digital
                </Link>
              </li>
              <li>
                <Link to="/#servicios" className="hover:text-foreground transition-colors">
                  Retirada de contenido
                </Link>
              </li>
              <li>
                <Link to="/#servicios" className="hover:text-foreground transition-colors">
                  Información jurídica
                </Link>
              </li>
              <li>
                <Link to="/#servicios" className="hover:text-foreground transition-colors">
                  Apoyo emocional
                </Link>
              </li> 
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
              Contacto
            </p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
                           <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Orientación automatizada disponible 24/7</span>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3 text-muted-foreground">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-2">
              Ante una emergencia, llama
            </p>
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs">
                         {EMERGENCY_RESOURCES.map((r) => (
                <span key={r.label}>
                  {r.label}{" "}
                  <a href={`tel:${r.value?.replace(/\s/g, "") ?? ''}`} className="font-bold text-foreground hover:underline">
                    {r.value}
                  </a>
                </span>
              ))}   
            </div>
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
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
