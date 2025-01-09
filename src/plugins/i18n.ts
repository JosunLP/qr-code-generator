// src/plugins/i18n.ts
import { createI18n } from "vue-i18n";

// Deine Sprachdateien importieren
import de from "../locales/de.json";
import en from "../locales/en.json";

// i18n-Instanz erstellen
export const i18n = createI18n({
  legacy: false, // im Vue 3-Kontext oft "false"
  locale: "en", // Standard-Sprache
  fallbackLocale: "en",
  messages: {
    en,
    de,
  },
});
