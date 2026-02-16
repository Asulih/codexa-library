import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { resources, supportedLanguages, namespaces } from "@/locales";

function getDeviceLanguage() {
  const locales = Localization.getLocales();
  const code = locales?.[0]?.languageCode?.toLowerCase();
  return supportedLanguages.includes(code as any) ? (code as any) : "en";
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'fr',//getDeviceLanguage(), // TODO set to getDeviceLanguage()
    fallbackLng: "en",
    defaultNS: "common",
    ns: namespaces as unknown as string[],
    interpolation: { escapeValue: false },
  });
}

export default i18n;
