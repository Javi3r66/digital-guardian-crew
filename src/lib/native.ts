/**
 * Capa de acceso a capacidades nativas (Capacitor) con respaldo web.
 *
 * Utiliza eval('import(...)') para evitar que el analizador estático de Vite/Rollup
 * intente resolver los módulos nativos de Capacitor durante la fase de compilación en Vercel.
 */

export type NativePlatform = "ios" | "android" | "web";

// Función auxiliar para importar de forma 100% dinámica e invisible para Vite/Rollup
function dynamicImport<T = unknown>(moduleName: string): Promise<T> {
  return (0, eval)(`import("${moduleName}")`);
}

export function isBrowser() {
  return typeof window !== "undefined";
}

/** Sincrónico y seguro en SSR: Capacitor inyecta este global en apps nativas. */
export function isNativePlatform() {
  if (!isBrowser()) return false;
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } })
    .Capacitor;
  return Boolean(cap?.isNativePlatform?.());
}

export function getPlatform(): NativePlatform {
  if (!isBrowser()) return "web";
  const cap = (window as unknown as { Capacitor?: { getPlatform?: () => string } }).Capacitor;
  const p = cap?.getPlatform?.() ?? "web";
  return p === "ios" || p === "android" ? p : "web";
}

/* ------------------------------------------------------------------ */
/* Haptics                                                            */
/* ------------------------------------------------------------------ */

type HapticStrength = "light" | "medium" | "heavy" | "success" | "warning" | "error";

export async function haptic(strength: HapticStrength = "light") {
  if (!isBrowser()) return;
  try {
    if (isNativePlatform()) {
      const { Haptics, ImpactStyle, NotificationType } = await dynamicImport<typeof import("@capacitor/haptics")>("@capacitor/haptics");
      if (strength === "success" || strength === "warning" || strength === "error") {
        const type =
          strength === "success"
            ? NotificationType.Success
            : strength === "warning"
              ? NotificationType.Warning
              : NotificationType.Error;
        await Haptics.notification({ type });
        return;
      }
      const style =
        strength === "heavy"
          ? ImpactStyle.Heavy
          : strength === "medium"
            ? ImpactStyle.Medium
            : ImpactStyle.Light;
      await Haptics.impact({ style });
      return;
    }
    // Respaldo web: Vibration API cuando el navegador la soporta.
    const ms = strength === "heavy" || strength === "error" ? 30 : strength === "medium" ? 18 : 10;
    navigator.vibrate?.(ms);
  } catch {
    /* el haptic nunca debe romper la interacción */
  }
}

/* ------------------------------------------------------------------ */
/* Preferencias / almacenamiento local                                */
/* ------------------------------------------------------------------ */

export const storage = {
  async get(key: string): Promise<string | null> {
    if (!isBrowser()) return null;
    try {
      if (isNativePlatform()) {
        const { Preferences } = await dynamicImport<typeof import("@capacitor/preferences")>("@capacitor/preferences");
        const { value } = await Preferences.get({ key });
        return value ?? null;
      }
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async set(key: string, value: string): Promise<void> {
    if (!isBrowser()) return;
    try {
      if (isNativePlatform()) {
        const { Preferences } = await dynamicImport<typeof import("@capacitor/preferences")>("@capacitor/preferences");
        await Preferences.set({ key, value });
        return;
      }
      window.localStorage.setItem(key, value);
    } catch {
      /* almacenamiento no disponible (modo privado) */
    }
  },
  async remove(key: string): Promise<void> {
    if (!isBrowser()) return;
    try {
      if (isNativePlatform()) {
        const { Preferences } = await dynamicImport<typeof import("@capacitor/preferences")>("@capacitor/preferences");
        await Preferences.remove({ key });
        return;
      }
      window.localStorage.removeItem(key);
    } catch {
      /* noop */
    }
  },
};

/* ------------------------------------------------------------------ */
/* Cámara                                                             */
/* ------------------------------------------------------------------ */

export async function capturePhoto(): Promise<string | null> {
  if (!isBrowser()) return null;
  if (isNativePlatform()) {
    const { Camera, CameraResultType, CameraSource } = await dynamicImport<typeof import("@capacitor/camera")>("@capacitor/camera");
    const photo = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      allowEditing: false,
    });
    return photo.dataUrl ?? null;
  }
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
/* Geolocalización                                                    */
/* ------------------------------------------------------------------ */

export type Coords = { latitude: number; longitude: number; accuracy: number };

export async function getCurrentPosition(): Promise<Coords | null> {
  if (!isBrowser()) return null;
  try {
    if (isNativePlatform()) {
      const { Geolocation } = await dynamicImport<typeof import("@capacitor/geolocation")>("@capacitor/geolocation");
      const perm = await Geolocation.requestPermissions();
      if (perm.location === "denied") return null;
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: false });
      return {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      };
    }
    if (!navigator.geolocation) return null;
    return await new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          }),
        () => resolve(null),
        { enableHighAccuracy: false, timeout: 10000 },
      );
    });
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Notificaciones push                                                */
/* ------------------------------------------------------------------ */

export type PushResult = { granted: boolean; reason?: string };

export async function enablePushNotifications(): Promise<PushResult> {
  if (!isNativePlatform()) {
    return { granted: false, reason: "Las notificaciones push solo están disponibles en la app móvil." };
  }
  try {
    const { PushNotifications } = await dynamicImport<typeof import("@capacitor/push-notifications")>("@capacitor/push-notifications");
    let status = await PushNotifications.checkPermissions();
    if (status.receive === "prompt" || status.receive === "prompt-with-rationale") {
      status = await PushNotifications.requestPermissions();
    }
    if (status.receive !== "granted") {
      return { granted: false, reason: "Permiso denegado en los ajustes del dispositivo." };
    }
    await PushNotifications.register();
    return { granted: true };
  } catch {
    return { granted: false, reason: "No se ha podido registrar el dispositivo." };
  }
}

/* ------------------------------------------------------------------ */
/* Arranque nativo (barra de estado y teclado)                        */
/* ------------------------------------------------------------------ */

export async function initNativeShell() {
  if (!isNativePlatform()) return;
  try {
    const { StatusBar, Style } = await dynamicImport<typeof import("@capacitor/status-bar")>("@capacitor/status-bar");
    await StatusBar.setStyle({ style: Style.Light });
    if (getPlatform() === "android") {
      await StatusBar.setOverlaysWebView({ overlay: true });
    }
  } catch {
    /* noop */
  }
  try {
    const { Keyboard, KeyboardResize } = await dynamicImport<typeof import("@capacitor/keyboard")>("@capacitor/keyboard");
    await Keyboard.setResizeMode({ mode: KeyboardResize.Native });
  } catch {
    /* noop */
  }
}
