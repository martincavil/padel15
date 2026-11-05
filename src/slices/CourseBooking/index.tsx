import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Title, Text } from "@/components/prismic/RichText";
import { linkHref } from "@/lib/prismic-links";
import type { SliceContext } from "../shared";
import { CourseTabs } from "./CourseTabs";

type Props = SliceComponentProps<Content.CourseBookingSlice, SliceContext>;

/** Réservation de cours : onglets particulier / collectif et formulaire Tally. */
export default function CourseBooking({ slice }: Props) {
  const p = slice.primary;
  return (
    <section id={p.anchor || "cours"} className="scroll-mt-16 py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {p.badge && (
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-brand/10 text-brand border border-brand/20 mb-4">{p.badge}</span>
          )}
          <Title field={p.title} className="font-bold text-gray-900 mb-4" />
          <Text field={p.intro} paragraphClassName="text-gray-500 max-w-xl mx-auto text-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-1 w-full">
            <CourseTabs
              courses={p.courses.map((c) => ({
                label: c.label ?? "",
                emoji: c.emoji ?? "",
                description: (
                  <Text field={c.description} paragraphClassName="text-gray-600 text-base leading-relaxed mb-6" />
                ),
                includes: (
                  <Text
                    field={c.includes}
                    listClassName="space-y-3"
                    itemClassName="flex items-center gap-3 text-gray-700"
                    checkClassName="w-3.5 h-3.5 text-brand flex-shrink-0"
                    checkBadgeClassName="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0"
                  />
                ),
              }))}
            />
            {p.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {p.stats.map((stat, i) => (
                  <div key={i} className="text-center bg-white border border-gray-200 rounded-xl py-4 px-2">
                    <div className="text-brand font-bold text-xl">{stat.value}</div>
                    <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <h3 className="font-semibold mb-1">{p.form_title}</h3>
              <p className="text-gray-500 text-sm">{p.form_text}</p>
            </div>
            <div className="px-6 pt-2 pb-4">
              <iframe
                src={linkHref(p.tally_url)}
                width="100%"
                height="500"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                title="Réservation cours de padel"
                style={{ minHeight: 480, display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
