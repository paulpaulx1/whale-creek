"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HeroCarousel.module.css";

const AUTO_ADVANCE_MS = 10000;

export default function HeroCarousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(slides.length > 0);
  const [contentReady, setContentReady] = useState(false);
  const [projectCardReady, setProjectCardReady] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const [zoomingSlide, setZoomingSlide] = useState(null);
  const [fadeInSlide, setFadeInSlide] = useState(null);

  const autoTimerRef = useRef(null);

  const clearAutoTimer = () => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  };

  const restartAutoTimer = () => {
    clearAutoTimer();

    if (!slides.length || !isAutoAdvancing) return;

    autoTimerRef.current = setTimeout(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    if (!slides.length || ready) return;
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, [slides, ready]);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    setProjectCardReady(false);
    const timer = setTimeout(() => {
      setProjectCardReady(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    restartAutoTimer();
    return clearAutoTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, slides.length, isAutoAdvancing]);

  useEffect(() => {
    setZoomingSlide(null);
    setFadeInSlide(null);

    const fadeTimer = setTimeout(() => {
      setFadeInSlide(current);
    }, 100);

    const zoomTimer = setTimeout(() => {
      setZoomingSlide(current);
    }, 200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(zoomTimer);
    };
  }, [current]);

  useEffect(() => {
    if (!slides.length) return;
    setCurrent((c) => Math.min(c, slides.length - 1));
  }, [slides.length, slides]);

  if (!slides.length) return null;

  const next = () => {
    setCurrent((i) => (i + 1) % slides.length);
    restartAutoTimer();
  };

  const prev = () => {
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
    restartAutoTimer();
  };

  const toggleAutoAdvance = () => {
    setIsAutoAdvancing((v) => {
      const nextValue = !v;
      if (!nextValue) clearAutoTimer();
      return nextValue;
    });
  };

  return (
    <div className={`${styles.carousel} ${ready ? styles.ready : ""}`}>
      {slides.map((s, i) => {
        const active = i === current;
        const isVideo = s.mediaType === "video";
        const shouldAnimate = active && contentReady;

        return (
          <div
            key={s._id}
            className={`${styles.slide} ${active ? styles.active : ""}`}
          >
            {isVideo ? (
              <div className={styles.videoContainer}>
                <video
                  key={s.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={s.posterImageUrl}
                  className={styles.video}
                  style={{
                    opacity: active ? 1 : 0,
                  }}
                >
                  <source src={s.videoUrl} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className={styles.imageWrapper}>
                <Image
                  src={s.imageUrl}
                  alt={s.title || ""}
                  fill
                  priority={i === 0} // Only first slide gets priority
                  quality={85}
                  className={`${styles.imageBackground} ${
                    i === fadeInSlide ? styles.fadeIn : ""
                  } ${i === zoomingSlide ? styles.zoom : ""}`}
                  sizes="100vw"
                />
              </div>
            )}

            <div
              className={`${styles.overlay} ${
                isVideo ? styles.videoOverlay : ""
              }`}
            />

            <div className={styles.content}>
              <div className={styles.contentInner}>
                <h1
                  className={`${styles.title} ${
                    shouldAnimate ? styles.visible : ""
                  }`}
                >
                  {s.title}
                </h1>

                {s.services?.length > 0 && (
                  <div
                    className={`${styles.services} ${
                      shouldAnimate ? styles.visible : ""
                    }`}
                  >
                    {s.services.map((service, idx) => (
                      <React.Fragment key={service}>
                        <span className={styles.service}>{service}</span>
                        {idx < s.services.length - 1 && (
                          <span className={styles.divider}>|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {s.description && (
                  <p
                    className={`${styles.description} ${
                      shouldAnimate ? styles.visible : ""
                    }`}
                  >
                    {s.description}
                  </p>
                )}

                <div
                  className={`${styles.ctas} ${
                    shouldAnimate ? styles.visible : ""
                  }`}
                >
                  <Link href="/project-gallery" className={styles.ctaPrimary}>
                    View Our Work
                  </Link>
                  <Link
                    href="/indianapolis-woodworker-contact"
                    className={styles.ctaSecondary}
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={prev}
        className={`${styles.navButton} ${styles.navLeft}`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className={`${styles.navButton} ${styles.navRight}`}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <button
        onClick={toggleAutoAdvance}
        className={styles.playPause}
        aria-label={isAutoAdvancing ? "Pause carousel" : "Play carousel"}
      >
        {isAutoAdvancing ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {slides[current]?.featuredProject && (
        <Link
          href={`/project-gallery/${slides[current].featuredProject.slug}`}
          className={`${styles.projectCard} ${
            projectCardReady ? styles.projectCardVisible : ""
          }`}
        >
          <h3
            className={`${styles.projectTitle} ${
              projectCardReady ? styles.projectTitleVisible : ""
            }`}
          >
            Featured Project
          </h3>
          <p
            className={`${styles.projectName} ${
              projectCardReady ? styles.projectNameVisible : ""
            }`}
          >
            {slides[current].featuredProject.title}
          </p>
          {slides[current].featuredProject.location && (
            <p
              className={`${styles.projectLocation} ${
                projectCardReady ? styles.projectLocationVisible : ""
              }`}
            >
              {slides[current].featuredProject.location}
            </p>
          )}
          <span
            className={`${styles.projectLink} ${
              projectCardReady ? styles.projectLinkVisible : ""
            }`}
          >
            View Project →
          </span>
        </Link>
      )}
    </div>
  );
}