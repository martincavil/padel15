import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getPosts } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityPost } from "@/sanity/client";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blog Padel — Conseils, Actualités & Guide du Débutant",
  description:
    "Conseils techniques, actualités padel et guides pour progresser. Tout ce que vous devez savoir sur le padel par le club Padel 15 Paris.",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post }: { post: SanityPost }) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white rounded-2xl border border-gray-200 hover:border-brand hover:shadow-md transition-all overflow-hidden"
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {post.mainImage?.asset ? (
          <Image
            src={urlFor(post.mainImage).width(600).height(340).url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand/5">
            <span className="font-buzz text-5xl text-brand/20">P15</span>
          </div>
        )}
      </div>
      <div className="p-6">
        {post.categories && post.categories.length > 0 && (
          <span className="text-xs font-semibold text-brand uppercase tracking-wider mb-2 block">
            {post.categories[0].title}
          </span>
        )}
        <h2 className="font-semibold text-lg leading-snug mb-2 group-hover:text-brand transition-colors">
          {post.title}
        </h2>
        {post.publishedAt && (
          <p className="text-gray-400 text-sm">{formatDate(post.publishedAt)}</p>
        )}
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        title="Blog Padel 15"
        subtitle="Conseils techniques, actualités et guides pour progresser au padel"
        badge="Le mag"
        imageSrc="/terrain-ext-jour.webp"
        imageAlt="Terrains Padel 15"
        height="md"
      />

      <div className="container mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <AnimatedSection>
            <p className="text-center text-gray-400 py-16">
              Les articles arrivent bientôt…
            </p>
          </AnimatedSection>
        ) : (
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </>
  );
}
