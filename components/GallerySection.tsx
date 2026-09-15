"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import productImage1 from "@/assets/Images/2.png";
import productImage2 from "@/assets/Images/3.png";
import productImage3 from "@/assets/Images/4.png";
import productImage4 from "@/assets/Images/5.png";
import productImage5 from "@/assets/Images/6.png";
import productImage6 from "@/assets/Images/7.png";

const images = [
  productImage1,
  productImage2,
  productImage3,
  productImage4,
  productImage5,
  productImage6,
];

export function GallerySection() {
  const t = useTranslations("gallery");
  const captions = t.raw("captions") as string[];

  return (
    <section id="gallery" className="bg-bg-soft py-28 md:py-36">
      <div className="container-content">
        <div className="mb-16 max-w-lg">
          <p className="mb-4 text-sm text-accent-dark">{t("eyebrow")}</p>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image, i) => (
            <figure
              key={i}
              className="group relative flex min-h-65 flex-col justify-end overflow-hidden rounded-2xl border border-dashed border-ink/15 bg-bg-deep p-5 transition-transform duration-500 ease-premium hover:scale-[1.015]"
            >
              <div className="absolute inset-0">
                <Image
                  src={image}
                  alt={`NOVA Product View `}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />
              </div>

              {captions[i] && (
                <figcaption className="relative z-10 translate-y-2 text-sm text-bg-soft md:opacity-0 transition-all duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {captions[i]}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
