"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQSection() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // جلب المصفوفة مباشرة من ملف الـ JSON
  const faqItems = t.raw("faq.items") as FAQItem[];

  return (
    <section id="faq" className="bg-bg-soft py-28 md:py-36">
      <div className="container-content grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
        <div>
          <p className="mb-4 text-sm text-accent-dark">{t("faq.eyebrow")}</p>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">
            {t("faq.title")}
          </h2>
        </div>

        <div className="border-t border-ink/10">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-ink/10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl text-ink md:text-2xl">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 text-2xl text-accent-dark"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-base leading-relaxed text-ink/60">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
