import { useState } from "react";
import { Camera, MapPin, BellRing, ShieldCheck } from "lucide-react";
import {
  capturePhoto,
  enablePushNotifications,
  getCurrentPosition,
  haptic,
  isNativePlatform,
} from "@/lib/native";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

/**
 * Herramientas del dispositivo. Usan plugins de Capacitor en iOS/Android y
 * respaldos web en el navegador. Nada se sube a ningún servidor desde aquí.
 */
export function DeviceToolkit() {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [pushMsg, setPushMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function onCapture() {
    setBusy("camera");
    void haptic("light");
    try {
      const data = await capturePhoto();
      if (data) {
        setPhoto(data);
        void haptic("success");
      }
    } finally {
      setBusy(null);
    }
  }

  async function onLocate() {
    setBusy("geo");
    void haptic("light");
    const pos = await getCurrentPosition();
    setPlace(
      pos
        ? `${pos.latitude.toFixed(3)}, ${pos.longitude.toFixed(3)} (±${Math.round(pos.accuracy)} m)`
        : "No se ha podido obtener la ubicación o el permiso está denegado.",
    );
    void haptic(pos ? "success" : "warning");
    setBusy(null);
  }

  async function onPush() {
    setBusy("push");
    void haptic("light");
    const res = await enablePushNotifications();
    setPushMsg(
      res.granted ? "Dispositivo registrado para avisos de seguimiento." : (res.reason ?? ""),
    );
    void haptic(res.granted ? "success" : "warning");
    setBusy(null);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-sm font-semibold text-foreground">Herramientas del dispositivo</h2>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Disponibles en la app móvil (iOS y Android) y con alternativa en el navegador. La captura
        de pruebas y la ubicación se quedan en tu dispositivo: tú decides si las aportas después
        por el canal seguro.
      </p>

      <button
        onClick={() => {
          void haptic("medium");
          setOpen(true);
        }}
        className="mt-4 w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
      >
        Abrir herramientas
      </button>

      <p className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="size-3.5 shrink-0" />
        {isNativePlatform()
          ? "Ejecutándose como app nativa: cámara, ubicación y avisos disponibles."
          : "Ejecutándose en navegador: se usan las alternativas web equivalentes."}
      </p>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-base">Herramientas del dispositivo</DrawerTitle>
            <DrawerDescription className="text-xs">
              Nada se envía automáticamente. Guarda las pruebas con fecha, URL y nombre de usuario.
            </DrawerDescription>
          </DrawerHeader>

          <div className="touch-scroll max-h-[60svh] space-y-3 overflow-y-auto px-4 pb-4">
            <ToolRow
              icon={Camera}
              title="Capturar prueba"
              hint={photo ? "Imagen capturada y guardada en el dispositivo." : "Cámara o galería"}
              loading={busy === "camera"}
              onClick={onCapture}
            />
            {photo && (
              <img
                src={photo}
                alt="Prueba capturada"
                className="max-h-48 w-full rounded-xl object-contain"
              />
            )}
            <ToolRow
              icon={MapPin}
              title="Ubicación aproximada"
              hint={place ?? "Útil para localizar la comisaría o el recurso más cercano"}
              loading={busy === "geo"}
              onClick={onLocate}
            />
            <ToolRow
              icon={BellRing}
              title="Activar avisos"
              hint={pushMsg ?? "Notificaciones de seguimiento del caso"}
              loading={busy === "push"}
              onClick={onPush}
            />
          </div>

          <div className="px-4 pb-4 pb-safe">
            <DrawerClose asChild>
              <button className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm font-medium text-foreground transition-transform active:scale-95">
                Cerrar
              </button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function ToolRow({
  icon: Icon,
  title,
  hint,
  loading,
  onClick,
}: {
  icon: typeof Camera;
  title: string;
  hint: string;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-transform active:scale-[0.98] active:bg-accent disabled:opacity-60"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">{title}</span>
        <span className="block text-xs leading-relaxed text-muted-foreground">
          {loading ? "Procesando…" : hint}
        </span>
      </span>
    </button>
  );
}
