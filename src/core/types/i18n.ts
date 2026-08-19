export type AppLocale = "en" | "ar";

export interface PageProps<T = Record<string, string>> {
  params: Promise<T & { locale: AppLocale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
