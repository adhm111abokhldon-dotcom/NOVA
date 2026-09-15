"use client";

import { useTranslations } from "next-intl";

interface TestimonialItem {
  name: string;
  quote: string;
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  const items = t.raw("items") as TestimonialItem[];

  return (
    <section id="reviews" className="bg-bg py-28 md:py-36">
      <div className="container-content">
        <div className="mb-16 max-w-lg">
          <p className="mb-4 text-sm text-accent-dark">{t("eyebrow")}</p>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="grid gap-10 divide-y divide-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0 rtl:md:divide-x-reverse">
          {items.map((item, index) => (
            <div
              key={index}
              className="pt-10 first:pt-0 md:px-8 md:pt-0 md:first:ps-0"
            >
              <p className="text-lg leading-relaxed text-ink/75">
                {item.quote}
              </p>
              <p className="mt-5 text-sm text-ink/45">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
