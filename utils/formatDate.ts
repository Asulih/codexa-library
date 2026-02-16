// utils/formatDate.ts
export type DateFormatPreset = "short" | "medium" | "long";

const presetOptions: Record<DateFormatPreset, Intl.DateTimeFormatOptions> = {
  short: { year: "numeric", month: "2-digit", day: "2-digit" },
  medium: { year: "numeric", month: "short", day: "2-digit" },
  long: { year: "numeric", month: "long", day: "2-digit" },
};

type FormatDateArgs = {
  locale?: string;              // ex: i18n.language, "fr-FR"
  preset?: DateFormatPreset;    // "medium" par défaut
  options?: Intl.DateTimeFormatOptions; // override si besoin
};

export function formatDate(
  input: string | number | Date,
  { locale, preset = "medium", options }: FormatDateArgs = {}
): string {
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "";

  const fmtOptions = options ?? presetOptions[preset];

  try {
    return new Intl.DateTimeFormat(locale ?? undefined, fmtOptions).format(d);
  } catch {
    return d.toLocaleDateString();
  }
}
