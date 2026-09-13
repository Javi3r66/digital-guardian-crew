import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const payloadSchema = z.object({
  kind: z.string().max(30),
  centro: z.string().max(120),
  contacto: z.string().max(120),
  cargo: z.string().max(60).optional(),
  telefono: z.string().max(20).optional(),
  email: z.string().email().max(160),
  num_alumnos: z.string().max(20).optional(),
  publico: z.string().max(60).optional(),
  mensaje: z.string().max(1000).optional(),
  riesgo: z.number().int().min(0).max(100).optional(),
});

export const notifyLeadFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => payloadSchema.parse(data))
  .handler(async ({ data }) => {
    const { notifyLead } = await import("./notify.server");
    return notifyLead(data);
  });
