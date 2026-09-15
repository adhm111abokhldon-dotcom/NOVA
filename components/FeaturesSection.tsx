"use client";

import { useTranslations } from "next-intl";

interface FeatureItem {
  title: string;
  body: string;
}

export function FeaturesSection() {
  const t = useTranslations("features");

 
  const items = t.raw("items") as FeatureItem[];

  return (
    <section id="notes" className="bg-bg py-28 md:py-36">
      <div className="container-content">
        <div className="mb-16 max-w-lg">
          <p className="mb-4 text-sm text-accent-dark">{t("eyebrow")}</p>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="border-t border-ink/10">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border-b border-ink/10 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
            >
              <h3 className="w-full shrink-0 font-display text-2xl text-ink sm:w-64">
                {item.title}
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-ink/60">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
