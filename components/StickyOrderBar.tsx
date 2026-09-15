"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";

export function StickyOrderBar() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight : window.innerHeight;
      setVisible(window.scrollY > threshold * 0.9);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    t("whatsapp.message")
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-bg/95 backdrop-blur-md"
        >
          <div className="container-content flex items-center justify-between gap-4 py-3.5">
            <div className="min-w-0">
              <p className="truncate font-display text-lg text-ink">
                {t("hero.headline")}
              </p>
              <p className="text-xs text-ink/50">
                {t("hero.priceLabel")} {t("hero.price")}
              </p>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent-dark"
            >
              {t("hero.ctaPrimary")}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
