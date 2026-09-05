import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/legal/lopivi")({
  head: () => ({
    meta: [
      { title: "Protocolo de Protección del Menor (LOPIVI) | Red Violeta Ciberprevención" },
      {
        name: "description",
        content:
          "Protocolo de protección del menor de Red Violeta conforme a la LO 8/2021 (LOPIVI) y la Ley 26/2015.",
      },
      { property: "og:title", content: "Protocolo LOPIVI — Red Violeta" },
      {
        property: "og:description",
        content:
          "Protocolo de protección del menor conforme a LOPIVI y la Ley 26/2015.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Lopivi,
});

function Lopivi() {
  return (
    <LegalLayout title="Protocolo de Protección del Menor (LOPIVI)">
      <p>
        Red Violeta Ciberprevención aplica el siguiente protocolo de protección del menor conforme
        a la <strong>Ley Orgánica 8/2021 (LOPIVI)</strong> y la <strong>Ley 26/2015</strong> de
        protección a la infancia y la adolescencia.
      </p>
      <h2>1. Interés superior del menor</h2>
      <p>
        Toda intervención prioriza el interés superior del menor y su derecho al buen trato, sin
        discriminación.
      </p>
      <h2>2. Coordinador de bienestar y protección</h2>
      <p>
        Los centros educativos deben contar con un coordinador de bienestar y protección (art.
        LOPIVI). Red Violeta orienta a las familias para activar el protocolo del centro y, en su
        caso, de la inspección educativa autonómica.
      </p>
      <h2>3. Detección y derivación</h2>
      <p>
        Ante indicios de ciberacoso, los agentes de IA orientan sobre los pasos inmediatos y derivan
        a recursos humanos y profesionales. No sustituyen al coordinador ni a los servicios sociales
        de referencia.
      </p>
      <h2>4. Riesgo vital o delito en curso</h2>
      <p>
        Si existe riesgo para la vida, autolesión, agresión sexual o delito en curso, se deriva de
        inmediato al <strong>112</strong>, <strong>091</strong>, <strong>024</strong> (conducta
        suicida), <strong>900 20 20 10</strong> (ANAR, menores) o <strong>016</strong>.
      </p>
      <h2>5. Protección de datos del menor</h2>
      <p>
        No se recaban datos identificativos del menor en el chat. En los formularios
        institucionales, el tratamiento se realiza con consentimiento y bajo el RGPD y la LOPDGDD.
      </p>
      <p className="text-xs text-muted-foreground">
        Esta información es orientativa; los protocolos concretos son en parte autonómicos. Para
        tu comunidad, consulta la consejería de educación correspondiente.
      </p>
    </LegalLayout>
  );
}
