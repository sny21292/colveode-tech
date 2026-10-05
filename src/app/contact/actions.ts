"use server";

import { Resend } from "resend";
import { site } from "@/content/site";
import { saveContactSubmission } from "@/lib/db";

export type ContactValues = { name: string; email: string; company: string; budget: string; message: string };

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back so the form keeps what the visitor typed after a failed submit. */
  values?: ContactValues;
};

const MAX = { name: 120, email: 200, company: 160, message: 5000 } as const;

function clean(v: FormDataEntryValue | null, max: number) {
  return String(v ?? "").trim().slice(0, max);
}

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill every field.
  if (clean(formData.get("website"), 50)) return { status: "success" };

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email);
  const company = clean(formData.get("company"), MAX.company);
  const budget = clean(formData.get("budget"), 40);
  const message = clean(formData.get("message"), MAX.message);

  const values: ContactValues = { name, email, company, budget, message };
  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Add a valid email address.";
  if (message.length < 20) errors.message = "Tell us a little more, at least a sentence or two.";
  if (Object.keys(errors).length) return { status: "error", errors, values };

  // Persist to Supabase first (best-effort — never blocks the visitor).
  const saved = await saveContactSubmission(values);

  const apiKey = process.env.RESEND_API_KEY;
  // CONTACT_TO_EMAIL may be a single address or a comma-separated list — each
  // recipient gets the enquiry. Falls back to the site email.
  const to = (process.env.CONTACT_TO_EMAIL || site.email)
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL || `Cloveode Website <onboarding@resend.dev>`;

  if (!apiKey) {
    // No email configured: still a success if the enquiry landed in the database.
    if (saved) return { status: "success" };
    console.warn("[contact] RESEND_API_KEY and Supabase both missing; enquiry not captured", { name, email });
    return {
      status: "error",
      values,
      message: `Email isn’t set up on this deployment yet. Please write to ${site.email} directly.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` at ${company}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company && `Company: ${company}`,
        budget && `Budget: ${budget}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    if (error) throw error;
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed", err);
    // The enquiry is safe in the database even though the email didn't go out.
    if (saved) return { status: "success" };
    return {
      status: "error",
      values,
      message: `Something went wrong sending your message. Please email ${site.email} instead.`,
    };
  }
}
