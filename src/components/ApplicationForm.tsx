"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { CONTACT } from "@/config/contact";
import { IS_STATIC_EXPORT } from "@/config/deployment";

type Status = "idle" | "submitting" | "error";

export default function ApplicationForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.apply.form;

  if (IS_STATIC_EXPORT) {
    return (
      <div className="mt-10 rounded-lg border border-[var(--line)] px-6 py-8 text-center">
        <p>{f.previewNotice}</p>
        <a href={`mailto:${CONTACT.email}`} className="mt-2 inline-block font-medium underline">
          {CONTACT.email}
        </a>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, ...payload }),
      });
      if (!res.ok) throw new Error("submission_failed");
      // A full page load, not router.push — see LanguageSwitcher.tsx's
      // comment for why: a client-side soft navigation between locale-
      // sensitive routes was observed to occasionally render an internally
      // inconsistent page here too.
      window.location.href = `/${locale}/apply/thank-you`;
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={f.name} name="name" required />
        <Field label={f.email} name="email" type="email" required />
        <Field label={f.phone} name="phone" type="tel" />
        <SelectField
          label={f.contactPreference}
          name="contactPreference"
          options={[
            ["email", f.contactPreferenceOptions.email],
            ["phone", f.contactPreferenceOptions.phone],
            ["whatsapp", f.contactPreferenceOptions.whatsapp],
          ]}
        />
      </div>

      <Field label={f.businessType} name="businessType" required />
      <Field label={f.currentOffer} name="currentOffer" />
      <TextAreaField label={f.mainChallenge} name="mainChallenge" required />
      <TextAreaField label={f.goals} name="goals" />

      <SelectField
        label={f.investmentReadiness}
        name="investmentReadiness"
        options={[
          ["ready", f.investmentReadinessOptions.ready],
          ["exploring", f.investmentReadinessOptions.exploring],
          ["notYet", f.investmentReadinessOptions.notYet],
        ]}
      />

      {status === "error" && <p className="text-sm text-red-600">{f.error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? f.submitting : f.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {required ? " *" : ""}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-base font-normal"
      />
    </label>
  );
}

function TextAreaField({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {required ? " *" : ""}
      <textarea
        name={name}
        required={required}
        rows={4}
        className="mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-base font-normal"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: [string, string][];
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select
        name={name}
        className="mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-base font-normal"
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
