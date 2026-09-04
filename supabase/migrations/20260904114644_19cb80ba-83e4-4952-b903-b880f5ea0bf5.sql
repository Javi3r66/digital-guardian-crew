CREATE TABLE public.b2b_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('auditoria','charla','videollamada')),
  centro text NOT NULL,
  contacto text NOT NULL,
  cargo text,
  telefono text,
  email text NOT NULL,
  num_alumnos text,
  publico text,
  mensaje text,
  riesgo integer,
  respuestas jsonb,
  consentimiento boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.b2b_leads TO anon;
GRANT INSERT, SELECT ON public.b2b_leads TO authenticated;
GRANT ALL ON public.b2b_leads TO service_role;

ALTER TABLE public.b2b_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede enviar una solicitud" ON public.b2b_leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (consentimiento = true);
