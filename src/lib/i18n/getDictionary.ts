import type { Dictionary } from "./dictionary";
import type { Locale } from "./locales";
import de from "./dictionaries/de";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = { de, en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
