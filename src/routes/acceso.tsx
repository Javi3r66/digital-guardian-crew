import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  UserRoundCog,
  LayoutGrid,
  ArrowLeft,
  ArrowRight,
  EyeOff,
  Sparkles,
  QrCode,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentChat } from "@/components/AgentChat";
import { AGENTS, EMERGENCY_RESOURCES, type AgentId } from "@/lib/agents";
import { AI_CHAT_BADGE } from "@/lib/legal";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/native";
import { supabase } from "@/integrations/supabase/client";
export const Route = createFileRoute("/acceso")({
  head: () => ({
    meta: [
      { title: "Acceso anónimo del alumnado | Red Violeta" },
      {
        name: "description",
        content:
          "Entrada anónima y segura para alumnado: valida el código de tu centro, crea un alias y habla con los cuatro agentes de IA contra el ciberacoso.",
      },
      { property: "og:title", content: "Acceso anónimo del alumnado | Red Violeta" },
      {
        property: "og:description",
        content:
          "Cinco pasos para entrar sin dar tu nombre y recibir orientación inmediata frente al ciberacoso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccesoAnonimo,
});

const AVATARS = ["🦊", "🐼", "🦉", "🐬", "🦄", "🐢", "🦁", "🐧"];
const ADJETIVOS = ["Silencioso", "Valiente", "Sereno", "Curioso", "Firme", "Luminoso"];
const NOMBRES = ["Halcón", "Roble", "Río", "Faro", "Nube", "Puente"];

function aliasAleatorio() {
  const a = ADJETIVOS[Math.floor(Math.random() * ADJETIVOS.length)];
  const n = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  return `${n} ${a}`;
}

function AccesoAnonimo() {
  const [step, setStep] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [errorCodigo, setErrorCodigo] = useState<string | null>(null);
  const [alias, setAlias] = useState(() => aliasAleatorio());
  const [avatar, setAvatar] = useState(AVATARS[0]!);
  const [agente, setAgente] = useState<AgentId | null>(null);

    const [validandoCodigo, setValidandoCodigo] = useState(false);

  async function validarCodigo(): Promise<boolean> {
    const texto = codigo.trim();
    if (!texto) {
      setErrorCodigo("Introduce el código de tu centro.");
      return false;
    }
    setValidandoCodigo(true);
    const { data, error } = await supabase
      .from("centros")
      .select("codigo")
      .eq("codigo", texto)
      .eq("activo", true)
      .maybeSingle();
    setValidandoCodigo(false);

    if (error) {
      setErrorCodigo("No se ha podido comprobar el código. Inténtalo de nuevo.");
      return false;
    }
    if (!data) {
      setErrorCodigo("Ese código no corresponde a ningún centro activo.");
      return false;
    }
    return true;
  }

  function go(next: number) {
    void haptic("light");
    setStep(next);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:pt-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Acceso anónimo
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Entra sin decir quién eres
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Cinco pasos. No pedimos tu nombre, ni tu correo, ni tu teléfono. Nada de lo que
        escribas en el chat se guarda.
      </p>

      <div className="mt-6 flex gap-1.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= step ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
        {step === 0 && (
          <div className="space-y-5">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="size-6" />
            </span>
            <h2 className="text-xl font-semibold">1. Bienvenida segura</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <EyeOff className="mt-0.5 size-4 shrink-0 text-primary" /> Eres anónimo:
                no registramos identidad, IP asociada ni historial de conversación.
              </li>
              <li className="flex gap-2">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" /> Te atienden
                cuatro agentes de IA: técnico, psicológico, social y legal.
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /> Si hay
                peligro real, llama al 112 o al 091. Esto no es un servicio de emergencias.
              </li>
            </ul>
            <Button className="w-full sm:w-auto" onClick={() => go(1)}>
              Empezar <ArrowRight className="size-4" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <KeyRound className="size-6" />
            </span>
            <h2 className="text-xl font-semibold">2. Código de tu centro</h2>
            <p className="text-sm text-muted-foreground">
              Introduce el código que te ha dado tu centro o escanea el QR del cartel del
              aula. El código identifica al centro, nunca a ti.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value);
                  setErrorCodigo(null);
                }}
                placeholder="Ej.: RV-2A9F41"
                autoCapitalize="characters"
                className="h-11"
              />
                           <Button
                className="h-11"
                disabled={validandoCodigo}
                onClick={async () => {
                  const ok = await validarCodigo();
                  if (ok) go(2);
                }}
              >
                {validandoCodigo ? "Comprobando..." : "Validar"}
              </Button> 
            </div>
            {errorCodigo && <p className="text-sm text-destructive">{errorCodigo}</p>}
            <div className="flex items-start gap-2 rounded-xl bg-muted/60 px-4 py-3 text-xs text-muted-foreground">
              <QrCode className="mt-0.5 size-4 shrink-0" />
              <span>
                ¿No tienes código? Puedes continuar igualmente como invitado; algunas
                funciones del centro no estarán disponibles.
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => go(0)}>
                <ArrowLeft className="size-4" /> Atrás
              </Button>
              <Button variant="outline" onClick={() => go(2)}>
                Continuar como invitado
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserRoundCog className="size-6" />
            </span>
            <h2 className="text-xl font-semibold">3. Tu alias y tu avatar</h2>
            <p className="text-sm text-muted-foreground">
              Elige un nombre inventado. No uses tu nombre real ni el de tu instituto.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                maxLength={24}
                className="h-11"
                placeholder="Tu alias"
              />
              <Button variant="outline" className="h-11" onClick={() => setAlias(aliasAleatorio())}>
                Generar otro
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    void haptic("light");
                    setAvatar(a);
                  }}
                  aria-label={`Elegir avatar ${a}`}
                  className={cn(
                    "flex size-12 items-center justify-center rounded-xl border border-border text-2xl transition-transform active:scale-95",
                    avatar === a && "border-primary bg-primary/10",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => go(1)}>
                <ArrowLeft className="size-4" /> Atrás
              </Button>
              <Button onClick={() => go(3)} disabled={!alias.trim()}>
                Continuar <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LayoutGrid className="size-6" />
            </span>
            <div>
              <h2 className="text-xl font-semibold">4. Tu gabinete</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Hola, {avatar} <strong className="text-foreground">{alias}</strong>. Elige con
                quién quieres hablar. Puedes cambiar de agente cuando quieras.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {AGENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    void haptic("medium");
                    setAgente(a.id);
                    setStep(4);
                  }}
                  className="rounded-2xl border border-border p-4 text-left transition-transform active:scale-[0.98] active:border-primary"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <a.icon className="size-5" />
                  </span>
                  <p className="mt-3 text-sm font-semibold">
                    {a.name} · {a.pillar}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.summary}</p>
                </button>
              ))}
            </div>
            <Button variant="ghost" onClick={() => go(2)}>
              <ArrowLeft className="size-4" /> Atrás
            </Button>
          </div>
        )}

        {step === 4 && agente && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                {avatar} <strong className="text-foreground">{alias}</strong> · sesión anónima
              </p>
              <Button variant="ghost" size="sm" onClick={() => go(3)}>
                <ArrowLeft className="size-4" /> Cambiar de agente
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {AGENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    void haptic("light");
                    setAgente(a.id);
                  }}
                  className={cn(
                    "rounded-full border border-border px-3 py-2 text-xs transition-transform active:scale-95",
                    agente === a.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {a.name}
                </button>
              ))}
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-border bg-muted/50 px-4 py-3 text-[11px] text-muted-foreground">
              <Bot className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>🤖 {AI_CHAT_BADGE}</span>
            </div>

            <AgentChat agentId={agente} />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Si estás en peligro, pide ayuda ya:</p>
        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
          {EMERGENCY_RESOURCES.map((r) => (
            <li key={r.value}>
              {r.label}: <strong className="text-foreground">{r.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
