"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./ProjectPage.module.css";

export default function MasonryGallery({ images = [], title = "" }) {
  const safeImages = useMemo(() => images.filter((img) => img?.url), [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

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
          return (
            <button
              key={img._key || img.url}
              type="button"
              className={styles.masonryItem}
              onClick={() => {
                setActiveIndex(idx);
                setOpen(true);
              }}
              aria-label={`View ${img.alt || `photo ${idx + 1}`}`}
            >
              <div className={styles.masonryImageWrap}>
                <Image
                  src={img.urlOptimized} // Use smaller version for grid
                  alt={img.alt || `${title} photo ${idx + 1}`}
                  width={800}
                  height={800}
                  className={styles.masonryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              {img.caption && (
                <span className={styles.masonryCaption}>{img.caption}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
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
                src={active.urlLightbox} // Use larger but still optimized version
                alt={active.alt || title}
                fill
                className={styles.lightboxImg}
                sizes="100vw"
                priority
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
