import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { getPostBySlug, getPostSlugs } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    openGraph: post.mainImage?.asset
      ? { images: [{ url: urlFor(post.mainImage).width(1200).url() }] }
      : undefined,
  };
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-24 pb-16">
      {/* Header image */}
      {post.mainImage?.asset && (
        <div className="relative h-72 md:h-96 w-full mb-10">
          <Image
            src={urlFor(post.mainImage).width(1400).height(600).url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Tous les articles
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.categories?.map((cat) => (
              <span
                key={cat.title}
                className="text-xs font-semibold text-brand uppercase tracking-wider bg-brand/10 px-2.5 py-1 rounded-full"
              >
                {cat.title}
              </span>
            ))}
            {post.publishedAt && (
              <span className="text-sm text-gray-400">{formatDate(post.publishedAt)}</span>
            )}
            {post.author?.name && (
              <span className="text-sm text-gray-400">par {post.author.name}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-buzz text-4xl md:text-5xl mb-8 leading-tight">{post.title}</h1>

          {/* Body */}
          {post.body && post.body.length > 0 ? (
            <PortableTextRenderer content={post.body} />
          ) : (
            <p className="text-gray-400 italic">Contenu à venir…</p>
          )}
        </AnimatedSection>
      </div>
    </article>
  );
}
