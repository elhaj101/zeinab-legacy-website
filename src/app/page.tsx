import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";

// Backstop only — middleware.ts already redirects "/" to the default
// locale before this would ever render.
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
