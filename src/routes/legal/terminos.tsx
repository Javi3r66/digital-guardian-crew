import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/legal/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones | Red Violeta Ciberprevención" },
      {
        name: "description",
        content:
          "Términos y condiciones de uso de la plataforma Red Violeta Ciberprevención, agentes de IA de orientación contra el ciberacoso.",
      },
      { property: "og:title", content: "Términos y Condiciones — Red Violeta" },
      {
        property: "og:description",
        content:
          "Condiciones de uso de los agentes de IA de Red Violeta Ciberprevención.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terminos,
});

function Terminos() {
  return (
    <LegalLayout title="Términos y Condiciones">
      <p>
        Estos Términos regulan el acceso y uso de la plataforma{" "}
        <strong>Red Violeta Ciberprevención</strong> (en adelante, «la Plataforma»), operada por Red
        Violeta Ciberprevención, con correo de contacto{" "}
        <a href="mailto:info@redvioletaciberprevencion.es">info@redvioletaciberprevencion.es</a>.
      </p>
      <h2>1. Naturaleza del servicio</h2>
      <p>
        La Plataforma ofrece orientación preventiva y triaje inicial asistido por agentes de
        inteligencia artificial (AURA, CALMA, PUENTE y LEX). Conforme al{" "}
        <strong>artículo 50 del Reglamento (UE) 2024/1689</strong>, actúa como herramienta de apoyo
        bajo supervisión humana y <strong>no sustituye</strong> a profesionales colegiados ni a las
        fuerzas y cuerpos de seguridad.
      </p>
      <h2>2. Uso aceptable</h2>
      <p>
        El usuario se compromete a no aportar datos personales identificativos (DNI, nombres
        completos, direcciones, teléfonos) en el chat. Si lo hace, el sistema le advertirá y no los
        reproducirá, de acuerdo con el <strong>RGPD (UE) 2016/679</strong> y la{" "}
        <strong>LO 3/2018 (LOPDGDD)</strong>.
      </p>
      <h2>3. Exclusión de responsabilidad</h2>
      <p>
       Red Violeta es una plataforma tecnológica de información y orientación. Las respuestas de sus sistemas de inteligencia artificial no constituyen asesoramiento profesional y no sustituyen la intervención de profesionales cualificados ni de las autoridades competentes. Red Violeta no garantiza que una respuesta automatizada sea adecuada para las circunstancias particulares de cada persona.
      </p>
      <h2>4. Urgencias</h2>
      <p>
        La Plataforma no es un servicio de emergencias. Ante peligro inminente, contacte con el{" "}
        <strong>112</strong>, <strong>091</strong> (Policía Nacional), <strong>062</strong> (Guardia
        Civil) o <strong>016</strong>.
      </p>
      <h2>5. Modificaciones</h2>
      <p>
        Podremos actualizar estos Términos. La fecha de la última revisión se indica al final del
        documento. El uso continuado implica aceptación de los cambios.
      </p>
      <p className="text-xs text-muted-foreground">Última actualización: septiembre 2026.</p>
    </LegalLayout>
  );
}
