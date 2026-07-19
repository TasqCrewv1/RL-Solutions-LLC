import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EstimateSubmission {
  id: string;
  calculator_type: string;
  project_title: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  property_location: string;
  timeline: string;
  budget_range: string;
  notes: string;
  selections: Record<string, unknown>;
  pricing_breakdown: {
    low: number;
    high: number;
    components: { label: string; amount: number }[];
  } | null;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const BUSINESS_EMAIL = "hello@rlsolutions.com";
const FROM_EMAIL = "RL Solutions <hello@rlsolutions.com>";

function fmtMoney(n: number): string {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatEstimateEmail(s: EstimateSubmission): string {
  const breakdown = s.pricing_breakdown;
  const priceRange = breakdown && breakdown.low > 0
    ? `${fmtMoney(breakdown.low)} – ${fmtMoney(breakdown.high)}`
    : "Custom quote (on-site evaluation required)";

  const components = breakdown && breakdown.components.length > 0
    ? breakdown.components.map((c) => `  • ${c.label}: ${fmtMoney(c.amount)}`).join("\n")
    : "";

  const selections = Object.entries(s.selections)
    .map(([k, v]) => `  • ${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
    .join("\n");

  return `NEW ESTIMATE REQUEST — RL Solutions

Project: ${s.project_title}
Calculator: ${s.calculator_type}

CUSTOMER
  Name: ${s.customer_name}
  Email: ${s.customer_email}
  Phone: ${s.customer_phone}
  Location: ${s.property_location || "Not provided"}
  Timeline: ${s.timeline || "Not specified"}
  Budget: ${s.budget_range || "Not specified"}

PROJECT SELECTIONS
${selections || "  (none)"}

ESTIMATED PRICE RANGE: ${priceRange}
${components ? `\nBREAKDOWN\n${components}` : ""}

CUSTOMER NOTES
${s.notes || "None"}

---
This estimate is an approximation. A firm quote follows an on-site evaluation.
Reply directly to this email or call the customer to schedule a site visit.`.trim();
}

function formatContactEmail(m: ContactMessage): string {
  return `NEW CONTACT MESSAGE — RL Solutions

Name: ${m.name}
Email: ${m.email}
Phone: ${m.phone || "Not provided"}
Subject: ${m.subject || "General inquiry"}

MESSAGE
${m.message}

---
Reply directly to this email or call the customer.`.trim();
}

function formatCustomerEstimateConfirmation(s: EstimateSubmission): string {
  const breakdown = s.pricing_breakdown;
  const priceRange = breakdown && breakdown.low > 0
    ? `${fmtMoney(breakdown.low)} – ${fmtMoney(breakdown.high)}`
    : "Custom quote (determined after on-site evaluation)";
  const firstName = s.customer_name.split(" ")[0];
  return `Hi ${firstName},

Thanks for requesting an estimate from RL Solutions! Here's a summary of your request:

PROJECT: ${s.project_title}
ESTIMATED RANGE: ${priceRange}

WHAT HAPPENS NEXT
1. We review your request and compare it to similar projects we've completed.
2. Jeremiah will call you at ${s.customer_phone} within 1–2 business days.
3. We schedule a free on-site visit to give you a firm, itemized quote.

This estimate is a ballpark based on typical project costs. The final quote may vary based on site conditions, material choices, and scope.

Questions? Call us at 302-402-3070 or reply to this email.

— RL Solutions
Wilmington, Delaware
Licensed & Insured — DE & PA`.trim();
}

function formatCustomerContactConfirmation(m: ContactMessage): string {
  const firstName = m.name.split(" ")[0];
  return `Hi ${firstName},

Thanks for reaching out to RL Solutions! We've received your message:

"${m.message}"

We'll get back to you within 1–2 business days. If you need to reach us sooner, call 302-402-3070.

— RL Solutions
Wilmington, Delaware`.trim();
}

async function queueEmailNotification(
  to: string,
  replyTo: string,
  subject: string,
  text: string,
  resendError?: string,
): Promise<void> {
  // Fallback: store notification in the database so pending mail is not lost
  // when Resend is unset or the domain/API rejects the send.
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { error } = await supabase.from("email_notifications").insert({
    recipient: to,
    reply_to: replyTo,
    subject,
    body: text,
    status: "pending",
    error_message: resendError ?? null,
  });
  if (error) throw new Error(`Failed to store notification: ${error.message}`);
}

async function sendEmail(to: string, replyTo: string, subject: string, text: string): Promise<void> {
  const resendKey = Deno.env.get("RESEND_API_KEY");

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        reply_to: replyTo,
        subject,
        text,
      }),
    });
    if (res.ok) return;

    const body = await res.text();
    console.error(`Resend API error ${res.status}: ${body} — queueing email_notifications fallback`);
    await queueEmailNotification(to, replyTo, subject, text, `Resend ${res.status}: ${body}`);
    return;
  }

  await queueEmailNotification(to, replyTo, subject, text);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { type, recordId } = await req.json();

    if (type === "estimate" && recordId) {
      const { data, error } = await supabase
        .from("estimate_submissions")
        .select("*")
        .eq("id", recordId)
        .maybeSingle();

      if (error || !data) {
        return new Response(JSON.stringify({ error: "Submission not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const sub = data as EstimateSubmission;
      await sendEmail(
        BUSINESS_EMAIL,
        sub.customer_email,
        `New Estimate: ${sub.project_title} — ${sub.customer_name}`,
        formatEstimateEmail(sub),
      );

      try {
        await sendEmail(
          sub.customer_email,
          BUSINESS_EMAIL,
          `Your RL Solutions estimate for ${sub.project_title}`,
          formatCustomerEstimateConfirmation(sub),
        );
      } catch (e) {
        console.error("Customer confirmation email failed:", e);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type === "contact" && recordId) {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .eq("id", recordId)
        .maybeSingle();

      if (error || !data) {
        return new Response(JSON.stringify({ error: "Message not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const msg = data as ContactMessage;
      await sendEmail(
        BUSINESS_EMAIL,
        msg.email,
        `New Message: ${msg.subject || "General inquiry"} — ${msg.name}`,
        formatContactEmail(msg),
      );

      try {
        await sendEmail(
          msg.email,
          BUSINESS_EMAIL,
          `Thanks for contacting RL Solutions`,
          formatCustomerContactConfirmation(msg),
        );
      } catch (e) {
        console.error("Customer confirmation email failed:", e);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
