/**
 * Capa de acceso e integración Web / Nativa.
 * Configuración estable para despliegue continuo en Vercel.
 */

export type NativePlatform = "ios" | "android" | "web";

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isNativePlatform(): boolean {
  if (!isBrowser()) return false;
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  return Boolean(cap?.isNativePlatform?.());
}

export function getPlatform(): NativePlatform {
  if (!isBrowser()) return "web";
  const cap = (window as unknown as { Capacitor?: { getPlatform?: () => string } }).Capacitor;
  const p = cap?.getPlatform?.() ?? "web";
  return p === "ios" || p === "android" ? p : "web";
}

/* ------------------------------------------------------------------ */
/* Vibración / Haptics (Respaldo Web Nativo)                          */
/* ------------------------------------------------------------------ */

type HapticStrength = "light" | "medium" | "heavy" | "success" | "warning" | "error";

export async function haptic(strength: HapticStrength = "light"): Promise<void> {
  if (!isBrowser()) return;
  try {
    const ms = strength === "heavy" || strength === "error" ? 30 : strength === "medium" ? 18 : 10;
    if ("vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  } catch {
    /* Mantiene la estabilidad de la interacción */
  }
}

/* ------------------------------------------------------------------ */
/* Almacenamiento Local (LocalStorage / Web Standard)                 */
/* ------------------------------------------------------------------ */

export const storage = {
  async get(key: string): Promise<string | null> {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async set(key: string, value: string): Promise<void> {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* Mantiene la estabilidad si el modo privado está activo */
    }
  },
  async remove(key: string): Promise<void> {
    if (!isBrowser()) return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* noop */
    }
  },
};

/* ------------------------------------------------------------------ */
/* Captura de Fotos / Cámara (API Web Estándar)                       */
/* ------------------------------------------------------------------ */

export async function capturePhoto(): Promise<string | null> {
  if (!isBrowser()) return null;
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    };
    input.click();
  });
}

/* ------------------------------------------------------------------ */
/* Geolocalización (Geolocation API Navegador)                        */
/* ------------------------------------------------------------------ */

export type Coords = { latitude: number; longitude: number; accuracy: number };

export async function getCurrentPosition(): Promise<Coords | null> {
  if (!isBrowser() || !navigator.geolocation) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  });
}

/* ------------------------------------------------------------------ */
/* Notificaciones Push                                                */
/* ------------------------------------------------------------------ */

export type PushResult = { granted: boolean; reason?: string };

export async function enablePushNotifications(): Promise<PushResult> {
  return { granted: false, reason: "Entorno Web activo." };
}

/* ------------------------------------------------------------------ */
/* Inicialización de Entorno                                          */
/* ------------------------------------------------------------------ */

export async function initNativeShell(): Promise<void> {
  /* Entorno web listo */
}
