import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const FLAVORS = new Set(["sea-salt", "smoked-chipotle", "rosemary-garlic", "all"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: unknown; flavor?: unknown; zip?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "That request didn't come through. Try again." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const flavor = String(body.flavor ?? "all");
  const zip = String(body.zip ?? "").trim().slice(0, 10) || null;

  if (!EMAIL.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "That email doesn't look right. Check it and try again." }, { status: 400 });
  }
  if (!FLAVORS.has(flavor)) {
    return NextResponse.json({ ok: false, error: "Pick a flavor and try again." }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "The list isn't open yet. Check back soon." }, { status: 503 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("waitlist").upsert({ email, flavor, zip }, { onConflict: "email" });
  if (error) {
    return NextResponse.json({ ok: false, error: "We couldn't save that just now. Try again in a minute." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
