export const LOCALES = {
  EN: "en",
  AR: "ar",
  CKB: "ckb",
} as const;

export type AppLocaleType = (typeof LOCALES)[keyof typeof LOCALES];

export const DEFAULT_LOCALE = LOCALES.AR;

export const RTL_LOCALES: readonly string[] = [LOCALES.AR, LOCALES.CKB];

export const isRTL = (locale: string): boolean => {
  return RTL_LOCALES.includes(locale);
};
