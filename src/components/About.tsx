import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="about"
      className="flex min-h-dvh flex-col justify-center border-t border-[var(--line)]"
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl">
          <Image
            src="/images/seinab-portrait-full.jpg"
            alt="Seinab Dabbous"
            fill
            sizes="(min-width: 640px) 400px, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
            {dict.about.eyebrow}
          </p>
          <h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{dict.about.headline}</h2>
          <div className="mt-6 space-y-4 text-[var(--muted)]">
            {dict.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
