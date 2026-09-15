"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLocale } from "next-intl";

export function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    dir === "rtl"
      ? ["inset(0 0% 0 100%)", "inset(0 0% 0 0%)"]
      : ["inset(0 100% 0 0%)", "inset(0 0% 0 0%)"],
  );

  return (
    <div className={`relative ${className}`}>
      <p aria-hidden className="text-ink/18">
        {text}
      </p>

      <motion.p
        ref={ref}
        style={{ clipPath }}
        className="absolute inset-0 text-ink"
      >
        {text}
      </motion.p>
    </div>
  );
}
