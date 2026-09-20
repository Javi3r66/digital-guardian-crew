/**
 * Capa de acceso a capacidades nativas (Capacitor) con soporte seguro para SSR/Web.
 */

export type NativePlatform = "ios" | "android" | "web";

// Función de carga con evaluación indirecta para prevenir el análisis estático de Vite/Rollup
function loadModule<T = any>(name: string): Promise<T> {
  return new Function('n', 'return import(n)')(name);
}

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
/* Haptics                                                            */
/* ------------------------------------------------------------------ */

type HapticStrength = "light" | "medium" | "heavy" | "success" | "warning" | "error";

export async function haptic(strength: HapticStrength = "light"): Promise<void> {
  if (!isBrowser()) return;
  try {
    if (isNativePlatform()) {
      const { Haptics, ImpactStyle, NotificationType } = await loadModule("@capacitor/haptics");
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
    const ms = strength === "heavy" || strength === "error" ? 30 : strength === "medium" ? 18 : 10;
    if ("vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Preferencias / Almacenamiento                                       */
/* ------------------------------------------------------------------ */

export const storage = {
  async get(key: string): Promise<string | null> {
    if (!isBrowser()) return null;
    try {
      if (isNativePlatform()) {
        const { Preferences } = await loadModule("@capacitor/preferences");
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
        const { Preferences } = await loadModule("@capacitor/preferences");
        await Preferences.set({ key, value });
        return;
      }
      window.localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  async remove(key: string): Promise<void> {
    if (!isBrowser()) return;
    try {
      if (isNativePlatform()) {
        const { Preferences } = await loadModule("@capacitor/preferences");
        await Preferences.remove({ key });
        return;
      }
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

/* ------------------------------------------------------------------ */
/* Cámara                                                             */
/* ------------------------------------------------------------------ */

export async function capturePhoto(): Promise<string | null> {
  if (!isBrowser()) return null;
  if (isNativePlatform()) {
    const { Camera, CameraResultType, CameraSource } = await loadModule("@capacitor/camera");
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
      const { Geolocation } = await loadModule("@capacitor/geolocation");
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
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Notificaciones Push y Shell                                        */
/* ------------------------------------------------------------------ */

export type PushResult = { granted: boolean; reason?: string };

export async function enablePushNotifications(): Promise<PushResult> {
  if (!isNativePlatform()) {
    return { granted: false, reason: "Solo disponible en app nativa." };
  }
  try {
    const { PushNotifications } = await loadModule("@capacitor/push-notifications");
    let status = await PushNotifications.checkPermissions();
    if (status.receive === "prompt" || status.receive === "prompt-with-rationale") {
      status = await PushNotifications.requestPermissions();
    }
    if (status.receive !== "granted") {
      return { granted: false, reason: "Permiso denegado." };
    }
    await PushNotifications.register();
    return { granted: true };
  } catch {
    return { granted: false, reason: "Error al registrar dispositivo." };
  }
}

export async function initNativeShell(): Promise<void> {
  if (!isNativePlatform()) return;
  try {
    const { StatusBar, Style } = await loadModule("@capacitor/status-bar");
    await StatusBar.setStyle({ style: Style.Light });
    if (getPlatform() === "android") {
      await StatusBar.setOverlaysWebView({ overlay: true });
    }
  } catch {
    /* ignore */
  }
  try {
    const { Keyboard, KeyboardResize } = await loadModule("@capacitor/keyboard");
    await Keyboard.setResizeMode({ mode: KeyboardResize.Native });
  } catch {
    /* ignore */
  }
}
