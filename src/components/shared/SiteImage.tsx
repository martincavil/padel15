"use client";

import Image, { type ImageProps } from "next/image";
import { loaderFor } from "@/lib/imgix-loader";

/**
 * next/image qui choisit lui-même son chargeur (Prismic ou Vercel) : utilisable
 * depuis un composant serveur, qui ne peut pas transmettre de fonction.
 */
export function SiteImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  return <Image {...props} loader={loaderFor(src)} alt={props.alt} />;
}
