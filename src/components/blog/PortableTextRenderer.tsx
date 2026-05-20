'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string } }) => (
      <div className="my-8 rounded-2xl overflow-hidden relative aspect-video">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt ?? ''}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="font-buzz text-4xl mt-10 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="font-buzz text-3xl mt-8 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="font-buzz text-2xl mt-6 mb-2">{children}</h3>,
    normal: ({ children }) => <p className="text-gray-700 leading-relaxed mb-5">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand pl-5 italic text-gray-500 my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-brand hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-5 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-5 text-gray-700">{children}</ol>,
  },
}

export function PortableTextRenderer({ content }: { content: unknown[] }) {
  return <PortableText value={content as Parameters<typeof PortableText>[0]['value']} components={components} />
}
