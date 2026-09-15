"use client";

import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations();

  const items = t.raw("marquee") as string[];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-bg-soft py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm text-ink/55"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
