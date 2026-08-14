import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "es.redvioletaciberprevencion.app",
  appName: "Red Violeta",
  webDir: "dist/client",
  ios: {
    contentInset: "always",
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    Keyboard: {
      resize: "native",
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
