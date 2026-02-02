"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Link from "next/link";
import styles from "./HeroCarousel.module.css";

const AUTO_ADVANCE_MS = 10000;

export default function HeroCarousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(slides.length > 0);
  const [contentReady, setContentReady] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const [zoomingSlide, setZoomingSlide] = useState(null);
  const [fadeInSlide, setFadeInSlide] = useState(null);

  // ✅ restartable timer so manual nav gets a full interval
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

  // Trigger content animation faster - only 200ms delay
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [ready]);

  // ✅ Auto-advance using restartable timeout (not interval)
  // Any slide change (manual or auto) resets the countdown
  useEffect(() => {
    restartAutoTimer();
    return clearAutoTimer;
    // We only need length, not the whole slides array reference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, slides.length, isAutoAdvancing]);

  // Trigger zoom and fade after slide transition completes
  useEffect(() => {
    // Reset on slide change
    setZoomingSlide(null);
    setFadeInSlide(null);

    // Fade in immediately
    const fadeTimer = setTimeout(() => {
      setFadeInSlide(current);
    }, 100);

    // Then apply zoom after fade starts
    const zoomTimer = setTimeout(() => {
      setZoomingSlide(current);
    }, 200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(zoomTimer);
    };
  }, [current]);

  // If slides array shrinks, keep current in range
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
      // If turning off, stop timer immediately
      if (!nextValue) clearAutoTimer();
      // If turning on, timer will be scheduled by the effect
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
            {/* Background media */}
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
              <div
                className={`${styles.imageBackground} ${
                  i === fadeInSlide ? styles.fadeIn : ""
                } ${i === zoomingSlide ? styles.zoom : ""}`}
                style={{ backgroundImage: `url(${s.imageUrl})` }}
              />
            )}

            {/* Gradient overlay */}
            <div
              className={`${styles.overlay} ${
                isVideo ? styles.videoOverlay : ""
              }`}
            />

            {/* Text content */}
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

      {/* Controls */}
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

      {/* Play/Pause */}
      <button
        onClick={toggleAutoAdvance}
        className={styles.playPause}
        aria-label={isAutoAdvancing ? "Pause carousel" : "Play carousel"}
      >
        {isAutoAdvancing ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Bottom-left project card */}
      {slides[current]?.featuredProject && (
        <Link
          href={`/project-gallery/${slides[current].featuredProject.slug}`}
          className={`${styles.projectCard} ${
            contentReady ? styles.projectCardVisible : ""
          }`}
        >
          <h3
            className={`${styles.projectTitle} ${
              contentReady ? styles.projectTitleVisible : ""
            }`}
          >
            Featured Project
          </h3>
          <p
            className={`${styles.projectName} ${
              contentReady ? styles.projectNameVisible : ""
            }`}
          >
            {slides[current].featuredProject.title}
          </p>
          {slides[current].featuredProject.location && (
            <p
              className={`${styles.projectLocation} ${
                contentReady ? styles.projectLocationVisible : ""
              }`}
            >
              {slides[current].featuredProject.location}
            </p>
          )}
          <span
            className={`${styles.projectLink} ${
              contentReady ? styles.projectLinkVisible : ""
            }`}
          >
            View Project →
          </span>
        </Link>
      )}
    </div>
  );
}
