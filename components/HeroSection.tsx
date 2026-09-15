"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import heroImage from "@/assets/images/1.png";
import { siteConfig } from "@/lib/config";

const AmbientCanvas = dynamic(() => import("./AmbientCanvas"), {
  ssr: false,
  loading: () => null,
});

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const tHero = useTranslations("hero");
  const tWa = useTranslations("whatsapp");

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink pt-20 text-bg"
    >
      <div className="absolute inset-0 opacity-70">
        <AmbientCanvas />
      </div>

      <div className="container-content relative z-10 grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease }}
            className="mb-4 max-md:mt-4 text-sm text-accent"
          >
            {tHero("eyebrow")}
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease }}
            className="font-display text-[15vw] leading-[0.98] tracking-tightest text-bg sm:text-6xl md:text-7xl"
          >
            {tHero("headline")}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-bg/60"
          >
            {tHero("subheadline")}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                tWa("message"),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink shadow-[0_10px_30px_rgba(198,161,91,0.3)] transition-transform duration-300 hover:scale-[1.03]"
            >
              {tHero("ctaPrimary")}
            </a>
            <a
              href="#notes"
              className="text-sm font-medium text-bg/70 underline decoration-bg/25 underline-offset-4 transition-colors duration-300 hover:text-bg"
            >
              {tHero("ctaSecondary")}
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.6, ease }}
            className="mt-14 flex items-baseline gap-2 text-bg/45"
          >
            <span className="text-xs uppercase tracking-wide">
              {tHero("priceLabel")}
            </span>
            <span className="text-lg font-medium text-bg">
              {tHero("price")}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="relative flex aspect-4/5 items-center justify-center overflow-hidden rounded-3xl border border-bg/15 bg-bg/5 backdrop-blur-sm"
        >
          <Image
            src={heroImage}
            alt="NOVA Parfum"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center text-xs uppercase tracking-wide text-bg/40"
      >
        {tHero("scrollHint")}
      </motion.div>
    </section>
  );
}
