export interface MailchimpCampaign {
  id: string;
  settings: { subject_line: string; title: string };
  send_time: string;
  archive_url: string;
}

const PLACEHOLDER_CAMPAIGNS: MailchimpCampaign[] = [
  {
    id: "placeholder-1",
    settings: { subject_line: "Nouveaux tournois de juin — inscrivez-vous !", title: "Newsletter juin" },
    send_time: "2026-06-01T10:00:00Z",
    archive_url: "#",
  },
  {
    id: "placeholder-2",
    settings: { subject_line: "Padel 15 fête le printemps — offres & agenda", title: "Newsletter mai" },
    send_time: "2026-05-05T10:00:00Z",
    archive_url: "#",
  },
  {
    id: "placeholder-3",
    settings: { subject_line: "Ouverture de la terrasse guinguette", title: "Newsletter avril" },
    send_time: "2026-04-07T10:00:00Z",
    archive_url: "#",
  },
];

export async function getCampaigns(): Promise<MailchimpCampaign[]> {
  const apiKey = process.env.MAILCHIMP_API_KEY;

  if (!apiKey) {
    return PLACEHOLDER_CAMPAIGNS;
  }

  const serverPrefix = apiKey.split("-").pop();

  try {
    const res = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/campaigns?status=sent&count=6&sort_field=send_time&sort_dir=DESC`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return PLACEHOLDER_CAMPAIGNS;

    const data = await res.json();
    return (data.campaigns ?? []) as MailchimpCampaign[];
  } catch {
    return PLACEHOLDER_CAMPAIGNS;
  }
}

export function formatCampaignDate(isoDate: string): string {
  if (!isoDate || isoDate === "") return "";
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
