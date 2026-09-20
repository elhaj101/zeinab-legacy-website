import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { CONTACT } from "@/config/contact";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = "2026"; // TODO: once real launch/hosting exists, derive this rather than hardcode

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-alt)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Image
            src="/images/legacy-logo.png"
            alt="LEGACY"
            width={225}
            height={315}
            className="h-8 w-auto"
          />
          <p className="mt-2 max-w-xs text-[var(--muted)]">{dict.footer.tagline}</p>
        </div>

        <div>
          <p className="font-semibold">{dict.footer.contactHeading}</p>
          <ul className="mt-2 space-y-1 text-[var(--muted)]">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--fg)]">
                {CONTACT.email}
              </a>
            </li>
            {CONTACT.whatsapp && <li>{CONTACT.whatsapp}</li>}
            {CONTACT.instagram && <li>{CONTACT.instagram}</li>}
          </ul>
        </div>

        <div>
          <ul className="space-y-1 text-[var(--muted)]">
            <li>
              <Link href={`${base}/impressum`} className="hover:text-[var(--fg)]">
                {dict.legal.impressumTitle}
              </Link>
            </li>
            <li>
              <Link href={`${base}/datenschutz`} className="hover:text-[var(--fg)]">
                {dict.legal.datenschutzTitle}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="px-4 pb-6 text-xs text-[var(--muted)] sm:px-6">
        © {year} Seinab Dabbous — {dict.footer.rights}
      </p>
    </footer>
  );
}
