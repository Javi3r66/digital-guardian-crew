import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies | Red Violeta Ciberprevención" },
      {
        name: "description",
        content:
          "Política de cookies de Red Violeta Ciberprevención conforme a la Ley 34/2002 (LSSI) y el RGPD.",
      },
      { property: "og:title", content: "Política de Cookies — Red Violeta" },
      {
        property: "og:description",
        content: "Uso de cookies en Red Violeta Ciberprevención.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalLayout title="Política de Cookies">
      <p>
        Red Violeta Ciberprevención utiliza cookies conforme a la <strong>Ley 34/2002 (LSSI)</strong>{" "}
        y el <strong>RGPD</strong>. Esta política explica qué cookies usamos y por qué.
      </p>
      <h2>1. Tipos de cookies</h2>
      <ul>
        <li>
          <strong>Técnicas (esenciales):</strong> permiten el funcionamiento básico de la
          Plataforma. No requieren consentimiento.
        </li>
        <li>
          <strong>Preferencias:</strong> recuernan ajustes del usuario (p. ej. tema o idioma) en el
          dispositivo.
        </li>
        <li>
          <strong>Analíticas:</strong> si se activan, ayudan a mejorar el servicio de forma
          anónima o agregada.
        </li>
      </ul>
      <h2>2. Conservación</h2>
      <p>
        Las cookies técnicas se borran al cerrar la sesión; las de preferencias y analíticas, si las
        hay, se conservan el tiempo necesario para su finalidad.
      </p>
      <h2>3. Gestión</h2>
      <p>
        Puede configurar o desactivar las cookies desde las preferencias de su navegador. Bloquear
        las cookies técnicas puede impedir el uso de la Plataforma.
      </p>
      <p className="text-xs text-muted-foreground">Última actualización: septiembre 2026.</p>
    </LegalLayout>
  );
}
