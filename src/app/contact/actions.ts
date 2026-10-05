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

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Branded HTML email for a new enquiry, in the Cloveode pink→orange theme. */
function buildEmailHtml(v: ContactValues, submittedAt: string) {
  const e = escapeHtml;
  const field = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:14px 0;border-bottom:1px solid #ededf0;color:#6e6e73;font-size:13px;font-weight:600;width:130px;vertical-align:top;">${label}</td>
           <td style="padding:14px 0;border-bottom:1px solid #ededf0;color:#1d1d1f;font-size:15px;vertical-align:top;">${value}</td>
         </tr>`
      : "";
  const messageHtml = e(v.message).replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(20,4,12,0.08);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr>
          <td style="background-color:#ff0f6a;background-image:linear-gradient(120deg,#ff0f6a 0%,#ff7a4c 100%);padding:30px 34px;">
            <div style="color:rgba(255,255,255,0.82);font-size:12px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;">Cloveode Technologies</div>
            <div style="color:#ffffff;font-size:23px;font-weight:700;margin-top:7px;letter-spacing:-0.3px;">New project enquiry</div>
          </td>
        </tr>
        <tr>
          <td style="padding:30px 34px 6px;">
            <p style="margin:0 0 22px;color:#1d1d1f;font-size:16px;line-height:1.5;">You have a new enquiry from <strong>${e(v.name)}</strong>${v.company ? ` at <strong>${e(v.company)}</strong>` : ""}.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${field("Name", e(v.name))}
              ${field("Email", `<a href="mailto:${e(v.email)}" style="color:#ff0f6a;text-decoration:none;">${e(v.email)}</a>`)}
              ${field("Company", e(v.company))}
              ${field("Budget", e(v.budget))}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 34px 6px;">
            <div style="color:#6e6e73;font-size:13px;font-weight:600;margin-bottom:10px;">Message</div>
            <div style="background:#f5f5f7;border-radius:12px;padding:18px 20px;color:#1d1d1f;font-size:15px;line-height:1.6;">${messageHtml}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 34px 6px;">
            <a href="mailto:${e(v.email)}" style="display:inline-block;background-color:#ff0f6a;background-image:linear-gradient(120deg,#ff0f6a,#ff7a4c);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 26px;border-radius:999px;">Reply to ${e(v.name)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 34px;border-top:1px solid #ededf0;margin-top:14px;">
            <div style="color:#a1a1a6;font-size:12px;">Submitted ${e(submittedAt)} &middot; <a href="https://cloveode.com" style="color:#a1a1a6;text-decoration:underline;">cloveode.com</a></div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
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
    const submittedAt = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` at ${company}` : ""}`,
      html: buildEmailHtml(values, submittedAt),
      // Plain-text fallback for clients that don't render HTML.
      text: [
        `New enquiry from ${name}`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        company && `Company: ${company}`,
        budget && `Budget: ${budget}`,
        "",
        message,
        "",
        `Submitted ${submittedAt}`,
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
