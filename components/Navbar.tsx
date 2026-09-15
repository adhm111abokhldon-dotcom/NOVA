"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/config";

export function Navbar() {
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight * 0.8 : 200;
      setScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";

    // استبدال بادئة اللغة في الـ Pathname المباشر بأسهل طريقة
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPath);
  };

  const links = [
    { href: "#story", label: tNav("story") },
    { href: "#notes", label: tNav("notes") },
    { href: "#gallery", label: tNav("gallery") },
    { href: "#reviews", label: tNav("reviews") },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ${
        scrolled
          ? "border-ink/5 bg-bg/85 backdrop-blur-md"
          : "border-bg/10 bg-transparent"
      }`}
    >
      <nav className="container-content flex h-20 items-center justify-between">
        <span
          className={`text-lg font-semibold tracking-tight transition-colors duration-500 ${
            scrolled ? "text-ink" : "text-bg"
          }`}
        >
          {siteConfig.brandName}
        </span>

        <ul
          className={`hidden items-center gap-9 text-sm transition-colors duration-500 md:flex ${
            scrolled ? "text-ink/70" : "text-bg/75"
          }`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`transition-colors duration-300 ${
                  scrolled ? "hover:text-ink" : "hover:text-bg"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className={`text-sm font-medium transition-colors duration-300 hover:text-accent ${
              scrolled ? "text-ink/60" : "text-bg/70"
            }`}
            aria-label="Toggle language"
          >
            {locale === "ar" ? "EN" : "عربي"}
          </button>
          <a
            href="#cta"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 sm:inline-block ${
              scrolled
                ? "bg-ink text-bg hover:bg-accent-dark"
                : "bg-bg text-ink hover:bg-accent"
            }`}
          >
            {tNav("cta")}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
