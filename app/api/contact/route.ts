import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form submission", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Placeholder for CRM / email integration.
    console.info("[contact-lead]", parsed.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 }
    );
  }
}
