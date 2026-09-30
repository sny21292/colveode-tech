"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import { sendEnquiry, type ContactState } from "./actions";
import { site } from "@/content/site";

const initial: ContactState = { status: "idle" };

const field =
  "w-full rounded-xl border border-ink/10 bg-fog px-4 py-3.5 text-copy text-graphite placeholder:text-mute/70 transition-[border-color,box-shadow] duration-300 focus:border-ink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/15";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const v = state.values;

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-fog p-10"
        role="status"
      >
        <h2 className="text-title">Message sent.</h2>
        <p className="mt-3 max-w-[40ch] text-copy text-mute">
          Thanks for getting in touch. We read every enquiry and reply within one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" defaultValue={v?.name} error={state.errors?.name} autoComplete="name" required placeholder="Your name" />
        <Field label="Email" name="email" type="email" defaultValue={v?.email} error={state.errors?.email} autoComplete="email" required placeholder="you@company.com" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company (optional)" name="company" defaultValue={v?.company} autoComplete="organization" placeholder="Your company" />
        <label className="grid gap-2">
          <span className="text-fine font-medium text-graphite">Budget (optional)</span>
          <select name="budget" defaultValue={v?.budget ?? ""} className={`${field} appearance-none`}>
            <option value="">Select budget range</option>
            <option>Under $5k</option>
            <option>$5k to $15k</option>
            <option>$15k to $50k</option>
            <option>$50k+</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2">
        <span className="text-fine font-medium text-graphite">
          What are you working on? <span className="text-brand-pink">*</span>
        </span>
        <textarea
          name="message"
          rows={5}
          required
          defaultValue={v?.message}
          aria-invalid={!!state.errors?.message}
          className={`${field} resize-y`}
          placeholder="A few sentences about the project, the timeline and what success looks like."
        />
        <FieldError error={state.errors?.message} />
      </label>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-[15px] font-medium text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] transition-transform duration-300 ease-apple hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
          <ArrowRight className="size-4" />
        </button>
        <p className="inline-flex items-center gap-2 text-fine text-mute">
          <Lock className="size-3.5" />
          Or email us directly at{" "}
          <a className="underline-offset-2 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>

      <AnimatePresence>
        {state.status === "error" && state.message && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-2xl bg-brand-pink/8 px-5 py-4 text-fine text-graphite"
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2">
      <span className="text-fine font-medium text-graphite">
        {label}
        {rest.required && <span className="text-brand-pink"> *</span>}
      </span>
      <input name={name} type={type} aria-invalid={!!error} className={field} {...rest} />
      <FieldError error={error} />
    </label>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <span role="alert" className="text-fine text-brand-pink">
      {error}
    </span>
  );
}
