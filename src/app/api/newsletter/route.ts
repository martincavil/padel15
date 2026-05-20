import { NextRequest, NextResponse } from "next/server";

// Mailchimp API — docs: https://mailchimp.com/developer/marketing/api/list-members/
// Variables à ajouter dans .env.local ET Vercel :
//   MAILCHIMP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us14
//   MAILCHIMP_AUDIENCE_ID=a1b2c3d4e5

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    // Fallback gracieux si Mailchimp pas encore configuré
    console.warn("Mailchimp non configuré — MAILCHIMP_API_KEY ou MAILCHIMP_AUDIENCE_ID manquant.");
    return NextResponse.json({ success: true, fallback: true });
  }

  // Le "server prefix" est la partie après le tiret dans la clé API (ex: "us14")
  const serverPrefix = apiKey.split("-").pop();

  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        tags: ["site-web"],
      }),
    }
  );

  const data = await response.json();

  // 200 = nouveau subscriber, 400 + "Member Exists" = déjà inscrit (on le traite comme succès)
  if (response.ok) {
    return NextResponse.json({ success: true });
  }

  if (data.title === "Member Exists") {
    return NextResponse.json({ success: true, alreadySubscribed: true });
  }

  console.error("Mailchimp error:", data);
  return NextResponse.json(
    { error: "Une erreur est survenue. Réessayez dans quelques instants." },
    { status: 500 }
  );
}
