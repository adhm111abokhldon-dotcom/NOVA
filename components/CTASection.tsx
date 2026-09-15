"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";

const AmbientCanvas = dynamic(() => import("./AmbientCanvas"), {
  ssr: false,
  loading: () => null,
});

export function CTASection() {
  const t = useTranslations();

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-ink py-28 text-bg md:py-40"
    >
      <div aria-hidden className="absolute inset-0 opacity-60">
        <AmbientCanvas />
      </div>

      <div className="container-content relative z-10 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl"
        >
          {t("cta.title")}
        </motion.h2>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-bg/60">
          {t("cta.body")}
        </p>

        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
            t("whatsapp.message")
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 rounded-full bg-accent px-8 py-4 text-sm font-medium text-ink shadow-[0_10px_30px_rgba(198,161,91,0.3)] transition-transform duration-300 hover:scale-[1.03]"
        >
          {t("cta.button")}
        </a>
      </div>
    </section>
  );
}
