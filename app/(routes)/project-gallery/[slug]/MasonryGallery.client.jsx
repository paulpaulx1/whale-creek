// MasonryGallery.client.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./ProjectPage.module.css";

export default function MasonryGallery({ images = [], title = "" }) {
  const safeImages = useMemo(() => images.filter((img) => img?.url), [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [preloadedIndex, setPreloadedIndex] = useState(null);

  // Preload lightbox image on hover
  const handleMouseEnter = (idx) => {
    if (preloadedIndex === idx) return;
    const img = new window.Image();
    img.src = safeImages[idx]?.urlLightbox || safeImages[idx]?.url;
    setPreloadedIndex(idx);
  };

  // Preload adjacent images when lightbox opens or active index changes
  useEffect(() => {
    if (!open) return;

    const preloadAdjacent = () => {
      const nextIdx = (activeIndex + 1) % safeImages.length;
      const prevIdx = (activeIndex - 1 + safeImages.length) % safeImages.length;

      // Preload next
      const nextImg = new window.Image();
      nextImg.src =
        safeImages[nextIdx]?.urlLightbox || safeImages[nextIdx]?.url;

      // Preload prev
      const prevImg = new window.Image();
      prevImg.src =
        safeImages[prevIdx]?.urlLightbox || safeImages[prevIdx]?.url;
    };

    preloadAdjacent();
  }, [open, activeIndex, safeImages]);

  useEffect(() => {
    console.log(
      "Image URLs with cache busting:",
      safeImages.slice(0, 2).map((img) => img.urlGrid),
    );
  }, [safeImages]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % safeImages.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, safeImages.length]);

  if (!safeImages.length) return null;

  const active = safeImages[activeIndex];

  return (
    <>
      <div className={styles.masonry}>
        {safeImages.map((img, idx) => {
          const w = img?.dimensions?.width ?? 1600;
          const h = img?.dimensions?.height ?? 1200;

          return (
            <button
              key={img._key || img.url}
              type="button"
              className={styles.masonryItem}
              onClick={() => {
                setActiveIndex(idx);
                setOpen(true);
              }}
              onMouseEnter={() => handleMouseEnter(idx)}
              aria-label={`View ${img.alt || `photo ${idx + 1}`}`}
            >
              <div className={styles.masonryImageWrap}>
                <Image
                  src={img.urlGrid || img.url}
                  alt={img.alt || `${title} photo ${idx + 1}`}
                  width={w}
                  height={h}
                  className={styles.masonryImage}
                  unoptimized
                />
              </div>

              {img.caption && (
                <span className={styles.masonryCaption}>{img.caption}</span>
              )}
            </button>
          );
        })}
      </div>

      {open && (
        <div className={styles.lightbox} role="dialog" aria-modal="true">
          <button
            type="button"
            className={styles.lightboxBackdrop}
            onClick={() => setOpen(false)}
            aria-label="Close"
          />

          <div className={styles.lightboxPanel}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setOpen(false)}
              aria-label="Close viewer"
            >
              ✕
            </button>

            <div className={styles.lightboxMedia}>
              <Image
                src={active.urlLightbox || active.url}
                alt={active.alt || title}
                fill
                className={styles.lightboxImg}
                sizes="(max-width: 768px) 100vw, 85vw"
                priority
                unoptimized
              />
            </div>

            {active?.caption && (
              <p className={styles.lightboxCaption}>{active.caption}</p>
            )}

            {safeImages.length > 1 && (
              <div className={styles.lightboxNav}>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (i) => (i - 1 + safeImages.length) % safeImages.length,
                    )
                  }
                  className={styles.lightboxNavBtn}
                  aria-label="Previous image"
                >
                  ← Prev
                </button>

                <div className={styles.lightboxCount}>
                  {activeIndex + 1} / {safeImages.length}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((i) => (i + 1) % safeImages.length)
                  }
                  className={styles.lightboxNavBtn}
                  aria-label="Next image"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
