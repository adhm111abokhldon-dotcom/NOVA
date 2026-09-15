"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ScrollRevealText } from "./ScrollRevealText";
import { use } from "react";

export function StorySection() {
  const  t = useTranslations();

  return (
    <section id="story" className="bg-bg py-28 md:py-40">
      <div className="container-content grid gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
        <div>
          <p className="mb-4 text-sm text-accent-dark">{t("story.eyebrow")}</p>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">
            {t("story.title")}
          </h2>
        </div>

        <div className="flex flex-col gap-14">
          <ScrollRevealText
            text={t("story.body")}
            className="max-w-2xl font-display text-3xl leading-[1.35] md:text-4xl"
          />

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-s-2 border-accent ps-6 text-lg italic leading-relaxed text-ink/60"
          >
            {t("story.quote")}
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
