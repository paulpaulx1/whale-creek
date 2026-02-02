'use client';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Link from 'next/link';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(slides.length > 0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const [zoomingSlide, setZoomingSlide] = useState(null);

  useEffect(() => {
    if (!slides.length || ready) return;
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, [slides, ready]);

  useEffect(() => {
    if (!slides.length || !isAutoAdvancing) return;
    const id = setInterval(
      () => setCurrent((i) => (i + 1) % slides.length),
      10000,
    );
    return () => clearInterval(id);
  }, [slides, isAutoAdvancing]);

  // Trigger zoom after slide transition completes
  useEffect(() => {
    // Reset zoom immediately when slide changes
    setZoomingSlide(null);
    
    // Then apply zoom after a small delay
    const timer = setTimeout(() => {
      setZoomingSlide(current);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [current]);

  if (!slides.length) return null;

  const next = () => setCurrent((i) => (i + 1) % slides.length);
  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);
  const toggleAutoAdvance = () => setIsAutoAdvancing(!isAutoAdvancing);

  return (
    <div className={`${styles.carousel} ${ready ? styles.ready : ''}`}>
      {slides.map((s, i) => {
        const active = i === current;
        const isVideo = s.mediaType === 'video';

        return (
          <div
            key={s._id}
            className={`${styles.slide} ${active ? styles.active : ''}`}
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
                  preload='auto'
                  poster={s.posterImageUrl}
                  className={styles.video}
                  style={{
                    opacity: active ? 1 : 0,
                  }}
                >
                  <source src={s.videoUrl} type='video/mp4' />
                </video>
              </div>
            ) : (
              <div
                className={`${styles.imageBackground} ${i === zoomingSlide ? styles.zoom : ''}`}
                style={{ backgroundImage: `url(${s.imageUrl})` }}
              />
            )}

            {/* Gradient overlay */}
            <div className={`${styles.overlay} ${isVideo ? styles.videoOverlay : ''}`} />

            {/* Text content */}
            <div className={styles.content}>
              <div className={styles.contentInner}>
                <h1 className={`${styles.title} ${active ? styles.visible : ''}`}>
                  {s.title}
                </h1>

                {s.services?.length > 0 && (
                  <div className={`${styles.services} ${active ? styles.visible : ''}`}>
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
                  <p className={`${styles.description} ${active ? styles.visible : ''}`}>
                    {s.description}
                  </p>
                )}

                <div className={`${styles.ctas} ${active ? styles.visible : ''}`}>
                  <Link href='/project-gallery' className={styles.ctaPrimary}>
                    View Our Work
                  </Link>
                  <Link href='/indianapolis-woodworker-contact' className={styles.ctaSecondary}>
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
        aria-label='Previous slide'
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className={`${styles.navButton} ${styles.navRight}`}
        aria-label='Next slide'
      >
        <ChevronRight size={24} />
      </button>

      {/* Play/Pause */}
      <button
        onClick={toggleAutoAdvance}
        className={styles.playPause}
        aria-label={isAutoAdvancing ? 'Pause carousel' : 'Play carousel'}
      >
        {isAutoAdvancing ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Bottom-left project card */}
      {slides[current]?.featuredProject && (
        <Link 
          href={`/project-gallery/${slides[current].featuredProject.slug}`}
          className={styles.projectCard}
        >
          <h3 className={styles.projectTitle}>Featured Project</h3>
          <p className={styles.projectName}>{slides[current].featuredProject.title}</p>
          {slides[current].featuredProject.location && (
            <p className={styles.projectLocation}>{slides[current].featuredProject.location}</p>
          )}
          <span className={styles.projectLink}>View Project →</span>
        </Link>
      )}
    </div>
  );
}