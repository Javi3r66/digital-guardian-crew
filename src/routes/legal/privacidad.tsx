import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/legal/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad (RGPD) | Red Violeta Ciberprevención" },
      {
        name: "description",
        content:
          "Política de privacidad de Red Violeta Ciberprevención conforme al RGPD (UE) 2016/679 y la LOPDGDD.",
      },
      { property: "og:title", content: "Política de Privacidad — Red Violeta" },
      {
        property: "og:description",
        content:
          "Tratamiento de datos personales en Red Violeta Ciberprevención según RGPD y LOPDGDD.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <LegalLayout title="Política de Privacidad (RGPD)">
      <p>
        Esta Política de Privacidad describe cómo Red Violeta Ciberprevención trata los datos
        personales, conforme al <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y a la{" "}
        <strong>Ley Orgánica 3/2018 (LOPDGDD)</strong>.
      </p>
      <h2>1. Responsable del tratamiento</h2>
      <p>
        Red Violeta Ciberprevención —{" "}
        <a href="mailto:info@redvioletaciberprevencion.es">info@redvioletaciberprevencion.es</a>.
      </p>
      <h2>2. Datos tratados</h2>
      <ul>
        <li>
          <strong>Chat con agentes de IA:</strong> las conversaciones NO se almacenan ni persisten.
          No se conservan mensajes ni historial.
        </li>
        <li>
          <strong>Formularios institucionales:</strong> nombre del centro, persona de contacto,
          cargo, teléfono, correo electrónico y número de alumnos, con consentimiento explícito.
        </li>
      </ul>
      <h2>3. Finalidades</h2>
      <p>
        Atender solicitudes de diagnóstico institucional y charlas; y remitir comunicaciones
        relacionadas, siempre con consentimiento.
      </p>
      <h2>4. Base jurídica</h2>
      <p>
        Consentimiento del interesado (art. 6.1.a RGPD) y, en su caso, interés legítimo para
        respuesta a solicitudes.
      </p>
      <h2>5. Conservación</h2>
      <p>
        Los datos de formularios se conservan el tiempo necesario para atender la solicitud y,
        posteriormente, durante los plazos legalmente exigibles.
      </p>
      <h2>6. Derechos ARCO-POL</h2>
      <p>
        Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación,
        portabilidad y a no ser objeto de decisiones automatizadas escribiendo a{" "}
        <a href="mailto:info@redvioletaciberprevencion.es">info@redvioletaciberprevencion.es</a>.
        Tiene derecho a reclamar ante la <strong>AEPD</strong> (www.aepd.es).
      </p>
      <h2>7. Encargados y transferencias</h2>
      <p>
        Los servicios de IA se prestan a través de proveedores que actúan como encargados del
        tratamiento. No se realizan transferencias internacionales a destinos sin garantías
        adecuadas.
      </p>
      <p className="text-xs text-muted-foreground">Última actualización: septiembre 2026.</p>
    </LegalLayout>
  );
}
