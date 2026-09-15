"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-10 text-bg/50 mb-15">
      <div className="container-content flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <span>{siteConfig.brandName}</span>
        <span>
          © {year} {t("footer.brand")} — {t("footer.rights")}
        </span>
      </div>
    </footer>
  );
}
