import { useCallback, useEffect, useRef, useState } from "react";
import { storage } from "@/lib/native";

/**
 * Estado local persistente (Capacitor Preferences en nativo, localStorage en web).
 * La lectura ocurre tras la hidratación para no romper el SSR.
 */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const initialRef = useRef(initial);

  useEffect(() => {
    let cancelled = false;
    void storage.get(key).then((raw) => {
      if (cancelled) return;
      if (raw != null) {
        try {
          setValue(JSON.parse(raw) as T);
        } catch {
          /* valor corrupto: se ignora */
        }
      }
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    void storage.set(key, JSON.stringify(value));
  }, [key, value, hydrated]);

  const reset = useCallback(() => {
    setValue(initialRef.current);
    void storage.remove(key);
  }, [key]);

  return [value, setValue, { hydrated, reset }] as const;
}
