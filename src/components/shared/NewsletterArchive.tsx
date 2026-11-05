import { ExternalLink, Newspaper } from "lucide-react";
import type { ReactNode } from "react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getCampaigns, formatCampaignDate } from "@/lib/mailchimp";

/** Dernières newsletters Mailchimp (archives publiques). */
export async function NewsletterArchive({
  badge = "Actualités",
  title = <h2 className="font-buzz">Nos newsletters</h2>,
}: { badge?: ReactNode; title?: ReactNode }) {
  const campaigns = await getCampaigns();
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-10">
            <div>
              {badge && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20 mb-3">
                  {badge}
                </span>
              )}
              {title}
            </div>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((c, i) => (
            <AnimatedSection key={c.id} delay={i * 0.08}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col h-full hover:border-brand hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <Newspaper className="w-5 h-5 text-brand" />
                </div>
                <h3 className="font-semibold leading-snug mb-2 flex-1">{c.settings.subject_line}</h3>
                <p className="text-gray-400 text-xs mb-4">{formatCampaignDate(c.send_time)}</p>
                {c.archive_url && c.archive_url !== "#" ? (
                  <a
                    href={c.archive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand text-sm font-medium hover:underline"
                  >
                    Lire <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-gray-300 text-sm">À venir</span>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
