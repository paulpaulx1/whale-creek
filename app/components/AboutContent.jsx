"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutSection.module.css";
import Reviews from "./Reviews";
import AboutImage from "./AboutImage";

const AboutContent = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cx = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className={styles.container}>
      {/* ✅ Section-level header (centered, above everything) */}
      <header className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>About Whale Creek</p>
      </header>

      <div ref={sectionRef} className={styles.aboutContent}>
        {/* LEFT: Image + headline underneath */}
        <div
          className={cx(
            styles.imageSection,
            hasAnimated ? styles.aboutVisible : styles.aboutHiddenLeft
          )}
        >
          <h2 className={styles.imageHeadline}>
            Indianapolis craftsmanship, thoughtful design, and build quality you
            can feel.
          </h2>
          <AboutImage />
        </div>

        {/* RIGHT: copy + help card (no big headline here) */}
        <div
          className={cx(
            styles.content,
            hasAnimated ? styles.aboutVisibleDelayed : styles.aboutHiddenRight
          )}
        >
          <div className={styles.contentBlock}>
            <p>
              Whale Creek Co. is your go-to Indianapolis general contractor for
              home renovations that blend expert craftsmanship with thoughtful
              design. From kitchen renovations to custom millwork and complete
              remodels, we excel in bringing your vision to life.
            </p>

            <p>
              We&apos;re a full-service workshop based in Garfield Park, where
              we offer construction expertise, woodworking, and custom
              fabrication under one roof. From initial sketches to final
              installation, our team of skilled craftsmen delivers exceptional
              millwork, custom furniture, and construction projects including
              sunrooms, decks, cabinetry, and home renovations.
            </p>
          </div>

          <div className={styles.helpCard}>
            <h3 className={styles.helpTitle}>What we build</h3>
            <ul className={styles.helpList}>
              <li>Kitchen renovations and full remodels</li>
              <li>Custom millwork, cabinetry, and built-ins</li>
              <li>Decks, sunrooms, and outdoor structures</li>
              <li>Custom furniture and fabrication</li>
            </ul>

            <div className={styles.helpActions}>
              <a className={styles.primaryCta} href="#contact">
                Start a Project
              </a>
              <a className={styles.secondaryCta} href="/projects">
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionDivider} />
      <Reviews />
    </div>
  );
};

export default AboutContent;
