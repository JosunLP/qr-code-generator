// src/plugins/i18n.ts
import { createI18n } from "vue-i18n";

// Sprachdateien importieren
import ar from "../locales/ar.json";
import cs from "../locales/cs.json";
import da from "../locales/da.json";
import de from "../locales/de.json";
import el from "../locales/el.json";
import en from "../locales/en.json";
import es from "../locales/es.json";
import fi from "../locales/fi.json";
import fr from "../locales/fr.json";
import hi from "../locales/hi.json";
import hu from "../locales/hu.json";
import id from "../locales/id.json";
import it from "../locales/it.json";
import ja from "../locales/ja.json";
import ko from "../locales/ko.json";
import nl from "../locales/nl.json";
import no from "../locales/no.json";
import pl from "../locales/pl.json";
import pt from "../locales/pt.json";
import ro from "../locales/ro.json";
import ru from "../locales/ru.json";
import sv from "../locales/sv.json";
import th from "../locales/th.json";
import tr from "../locales/tr.json";
import uk from "../locales/uk.json";
import vi from "../locales/vi.json";
import zh from "../locales/zh.json";

// Unterstützte Sprachen
const supportedLocales = [
  "en",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "nl",
  "pl",
  "ru",
  "sv",
  "zh",
  "ja",
  "ko",
  "tr",
  "ar",
  "hi",
  "cs",
  "el",
  "hu",
  "ro",
  "uk",
  "vi",
  "th",
  "id",
  "da",
  "no",
  "fi",
];

// Browser-Sprache ermitteln
function getBrowserLocale(): string {
  const navigatorLocale = navigator.language || navigator.languages?.[0];
  if (!navigatorLocale) {
    return "en";
  }
  // Nur den Sprachcode verwenden (z.B. 'de' aus 'de-DE')
  const locale = navigatorLocale.split("-")[0];
  // Prüfen ob die Sprache unterstützt wird
  return supportedLocales.includes(locale) ? locale : "en";
}

// i18n-Instanz erstellen
export const i18n = createI18n({
  legacy: false, // im Vue 3-Kontext oft "false"
  locale: getBrowserLocale(), // Browser-Sprache als Standard
  fallbackLocale: "en",
  messages: {
    en,
    de,
    fr,
    es,
    it,
    pt,
    nl,
    pl,
    ru,
    sv,
    zh,
    ja,
    ko,
    tr,
    ar,
    hi,
    cs,
    el,
    hu,
    ro,
    uk,
    vi,
    th,
    id,
    da,
    no,
    fi,
  },
});
