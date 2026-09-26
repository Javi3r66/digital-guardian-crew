import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const leadSchema = z.object({
  kind: z.enum(["auditoria", "charla"]),
  centro: z.string().trim().min(2, "Indica el nombre del centro").max(120),
  contacto: z.string().trim().min(2, "Indica el nombre de contacto").max(120),
  cargo: z.string().trim().max(60).optional(),
  telefono: z
    .string()
    .trim()
    .min(7, "Indica un teléfono válido")
    .max(20)
    .regex(/^[0-9+\s().-]+$/, "El teléfono solo admite números")
    .optional(),
  email: z.string().trim().email("Correo no válido").max(160),
  num_alumnos: z.string().trim().max(20).optional(),
  publico: z.string().trim().max(60).optional(),
  mensaje: z.string().trim().max(1000).optional(),
  riesgo: z.number().int().min(0).max(100).optional(),

  respuestas: z.record(z.string(), z.number()).optional(),
  consentimiento: z.literal(true, { message: "Debes aceptar la cláusula de tratamiento de datos" }),
});

export type LeadInput = z.infer<typeof leadSchema>;

export async function submitLead(input: LeadInput) {
  const data = leadSchema.parse(input);
  const { error } = await supabase.from("b2b_leads").insert({
    kind: data.kind,
    centro: data.centro,
    contacto: data.contacto,
    cargo: data.cargo ?? null,
    telefono: data.telefono ?? null,
    email: data.email,
    num_alumnos: data.num_alumnos ?? null,
    publico: data.publico ?? null,
    mensaje: data.mensaje ?? null,
    riesgo: data.riesgo ?? null,
    respuestas: data.respuestas ?? null,
    consentimiento: data.consentimiento,
  });
  if (error) throw new Error(error.message);

  // Aviso por correo. No bloquea el envío del formulario.
  try {
    await fetch("/api/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: data.kind,
        centro: data.centro,
        contacto: data.contacto,
        cargo: data.cargo,
        telefono: data.telefono,
        email: data.email,
        num_alumnos: data.num_alumnos,
        publico: data.publico,
        mensaje: data.mensaje,
        riesgo: data.riesgo,
      }),
    });
  } catch (e) {
    console.error("[submitLead] notificación fallida", e);
  }
}
