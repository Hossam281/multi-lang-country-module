import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

function loadLocaleMessages() {
  const locales = [{ en:en }, { ar:ar }];
  const messages = {};

  locales.forEach((locale) => {
    const key = Object.keys(locale);
    messages[key] = locale[key];
  });
  return messages;
}

export default createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: loadLocaleMessages(), 
})