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
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ SAFE CLASS JOINER (filters out undefined)
  const cx = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className={styles.container}>
      <div ref={sectionRef} className={styles.aboutContent}>
        {/* ✅ IMAGE */}
        <div
          className={cx(
            styles.imageSection,
            hasAnimated ? styles.aboutVisible : styles.aboutHiddenLeft
          )}
        >
          <AboutImage />
        </div>

        {/* ✅ TEXT (STAGGERED) */}
        <div
          className={cx(
            styles.content,
            hasAnimated
              ? styles.aboutVisibleDelayed
              : styles.aboutHiddenRight
          )}
        >
          <h1 className={styles.title}>About Whale Creek</h1>

          <div className={styles.contentBlock}>
            <p>
              Whale Creek is a custom general contractor and woodworking shop
              based in the Indianapolis area. We specialize in residential
              renovations, custom cabinetry, and detailed finish work that
              demands precision, patience, and experience.
            </p>

            <p>
              For over 15 years, we’ve built our reputation on clean execution,
              honest communication, and results that hold up years after the
              final walkthrough. We don’t cut corners, we don’t rush work, and
              we don’t disappear after the job is done.
            </p>

            <p>
              Every project is treated as a long-term investment — in the home,
              in the craft, and in the relationship with the client.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.sectionDivider}></div>
      <Reviews />
    </div>
  );
};

export default AboutContent;
