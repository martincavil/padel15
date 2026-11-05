import { Suspense } from "react";
import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { AgendaSection } from "@/components/homepage/AgendaSection";
import { GoogleReviews } from "@/components/shared/GoogleReviews";
import { CTANewsletter } from "@/components/shared/CTANewsletter";
import { NewsletterArchive } from "@/components/shared/NewsletterArchive";
import { EventRequestForm } from "@/components/evenements/EventRequestForm";
import { CarteCanvaWidget } from "@/components/restaurant/CarteCanvaWidget";
import Contact from "@/components/Contact";
import { Title, Text } from "@/components/prismic/RichText";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Contained, type SliceContext } from "../shared";

type Props = SliceComponentProps<Content.WidgetSlice, SliceContext>;

/**
 * Modules gérés par le code (réservation, avis, newsletter…). Le titre et le
 * texte saisis dans Prismic remplacent ceux du module quand ils sont remplis.
 */
export default function Widget(props: Props) {
  const { slice, context } = props;
  const p = slice.primary;
  const badge = p.badge || undefined;
  const title = (className: string) => (isFilled.richText(p.title) ? <Title field={p.title} className={className} /> : undefined);
  const anchor = p.anchor || undefined;

  switch (p.widget) {
    case "Prochains tournois (Playtomic)":
      return (
        <div id={anchor}>
          <Suspense fallback={<div className="py-16 bg-gray-50" aria-hidden />}>
            <AgendaSection badge={badge} title={title("font-buzz")} />
          </Suspense>
        </div>
      );
    case "Avis Google":
      return <div id={anchor}><GoogleReviews /></div>;
    case "Inscription newsletter":
      return <div id={anchor}><CTANewsletter /></div>;
    case "Archives des newsletters":
      return <div id={anchor}><NewsletterArchive badge={badge} title={title("font-buzz")} /></div>;
    case "Contact et plan d'accès":
      return (
        <div id={anchor} className="pt-8">
          <Contact settings={context.settings} title={title("font-bold text-brand")} />
        </div>
      );
    case "Formulaire de demande d'événement":
      return (
        <Contained {...props} id={anchor}>
          <EventRequestForm />
        </Contained>
      );
    case "Carte du restaurant (Canva)":
      return (
        <Contained {...props} id={anchor}>
          <AnimatedSection>
            <CarteCanvaWidget
              menu={context.settings.menu}
              badge={badge}
              title={title("font-buzz mb-1")}
              intro={<Text field={p.intro} paragraphClassName="text-gray-500 text-sm mb-6" />}
            />
          </AnimatedSection>
        </Contained>
      );
    default:
      return null;
  }
}
