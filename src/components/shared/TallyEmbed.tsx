"use client";

interface TallyEmbedProps {
  formId: string;
  height?: number;
  title?: string;
}

export function TallyEmbed({ formId, height = 500, title = "Formulaire" }: TallyEmbedProps) {
  return (
    <iframe
      src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1`}
      width="100%"
      height={height}
      frameBorder={0}
      title={title}
      style={{ minHeight: height, display: "block" }}
    />
  );
}
