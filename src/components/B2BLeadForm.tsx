import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitLead, leadSchema, type LeadInput } from "@/lib/leads";
import { B2B_CONSENT } from "@/lib/legal";
import { haptic } from "@/lib/native";

const CARGOS = ["Director", "Jefe de Estudios", "Orientador", "Presidente AMPA", "Otro"];
const ALUMNOS = ["<300", "300-700", "700-1200", ">1200"];

type Props = {
  kind: LeadInput["kind"];
  riesgo?: number;
  respuestas?: Record<string, number>;
  submitLabel?: string;
  compact?: boolean;
  publicoOptions?: string[];
  onDone?: () => void;
};

export function B2BLeadForm({
  kind,
  riesgo,
  respuestas,
  submitLabel = "Enviar solicitud",
  compact = false,
  publicoOptions,
  onDone,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({
    centro: "",
    contacto: "",
    cargo: CARGOS[0]!,
    telefono: "",
    email: "",
    num_alumnos: ALUMNOS[0]!,
    publico: publicoOptions?.[0] ?? "",
    fecha: "",
    mensaje: "",
  });

  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  function set(k: string, v: string) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload = {
      kind,
      centro: values["centro"],
      contacto: values["contacto"],
      cargo: values["cargo"],
      telefono: values["telefono"],
      email: values["email"],
      num_alumnos: compact ? undefined : values["num_alumnos"],
      publico: values["publico"] || undefined,
      mensaje: values["mensaje"] || undefined,
      fecha: values["fecha"] || undefined,
      riesgo,

      respuestas,
      consentimiento: consent,
    };
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los datos del formulario");
      return;
    }
    setState("sending");
    try {
      await submitLead(parsed.data);
      void haptic("medium");
      setState("done");
      onDone?.();
    } catch {
      setState("idle");
      setError("No hemos podido enviar la solicitud. Inténtalo de nuevo en unos minutos.");
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm text-foreground">
          Solicitud registrada. Te escribimos a <strong>{values["email"]}</strong> en menos de 24 horas
          con el informe y una propuesta de fecha para la reunión de diagnóstico.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`${kind}-centro`}>Nombre del centro</Label>
          <Input
            id={`${kind}-centro`}
            value={values["centro"]}
            onChange={(e) => set("centro", e.target.value)}
            maxLength={120}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${kind}-contacto`}>Nombre del contacto</Label>
          <Input
            id={`${kind}-contacto`}
            value={values["contacto"]}
            onChange={(e) => set("contacto", e.target.value)}
            maxLength={120}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${kind}-cargo`}>Cargo</Label>
          <select
            id={`${kind}-cargo`}
            value={values["cargo"]}
            onChange={(e) => set("cargo", e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {CARGOS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${kind}-tel`}>Teléfono directo</Label>
          <Input
            id={`${kind}-tel`}
            type="tel"
            value={values["telefono"]}
            onChange={(e) => set("telefono", e.target.value)}
            maxLength={20}
            required
          />
        </div>
        {!compact && (
          <div className="space-y-1.5">
            <Label htmlFor={`${kind}-alumnos`}>Número de alumnos</Label>
            <select
              id={`${kind}-alumnos`}
              value={values["num_alumnos"]}
              onChange={(e) => set("num_alumnos", e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {ALUMNOS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
        )}
        {publicoOptions && (
          <div className="space-y-1.5">
            <Label htmlFor={`${kind}-publico`}>Destinatarios de la formación</Label>
            <select
              id={`${kind}-publico`}
              value={values["publico"]}
              onChange={(e) => set("publico", e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {publicoOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        )}
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor={`${kind}-email`}>Correo institucional</Label>
          <Input
            id={`${kind}-email`}
            type="email"
            placeholder="direccion@tucentro.es"
            value={values["email"]}
            onChange={(e) => set("email", e.target.value)}
            maxLength={160}
            required
          />
        </div>
        {(compact || publicoOptions) && (
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor={`${kind}-msg`}>Fechas preferentes o comentarios</Label>
            <Textarea
              id={`${kind}-msg`}
              value={values["mensaje"]}
              onChange={(e) => set("mensaje", e.target.value)}
              maxLength={1000}
              rows={3}
            />
          </div>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
        <Checkbox
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          aria-label="Aceptar cláusula de tratamiento de datos"
          className="mt-0.5"
        />
        <span className="text-[11px] leading-relaxed text-muted-foreground">{B2B_CONSENT}</span>
      </label>

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}

      <Button type="submit" disabled={state === "sending"} className="w-full sm:w-auto">
        {state === "sending" && <Loader2 className="size-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
