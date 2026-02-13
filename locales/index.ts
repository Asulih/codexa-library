import fr from "./fr";
import en from "./en";

export const resources = {
  fr,
  en,
} as const;

export type AppLanguage = keyof typeof resources;
export const supportedLanguages = Object.keys(resources) as AppLanguage[];

// (optionnel) liste des namespaces depuis une langue “référence”
export const namespaces = Object.keys(en) as (keyof typeof en)[];
