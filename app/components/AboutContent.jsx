"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutSection.module.css";
import AboutImage from "./AboutImage";

const AboutContent = ({ data }) => {
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
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cx = (...classes) => classes.filter(Boolean).join(" ");
  const { kicker, headline, bodyParagraphs, helpCard } = data;

  return (
    <div className={styles.container} id="about">
      <header
        className={cx(
          styles.sectionHeader,
          hasAnimated
            ? styles.sectionHeaderVisible
            : styles.sectionHeaderHidden,
        )}
      >
        <p className={styles.sectionKicker}>{kicker}</p>
      </header>

      <div ref={sectionRef} className={styles.aboutContent}>
        <div
          className={cx(
            styles.imageSection,
            hasAnimated ? styles.aboutVisible : styles.aboutHiddenLeft,
          )}
        >
          <h2 className={styles.imageHeadline}>{headline}</h2>
          <AboutImage />
        </div>

        <div
          className={cx(
            styles.content,
            hasAnimated ? styles.aboutVisibleDelayed : styles.aboutHiddenRight,
          )}
        >
          <div className={styles.contentBlock}>
            {bodyParagraphs?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className={styles.helpCard}>
            <h3 className={styles.helpTitle}>{helpCard?.title}</h3>
            <ul className={styles.helpList}>
              {helpCard?.items?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className={styles.helpActions}>
              <a className={styles.primaryCta} href={helpCard?.primaryCtaHref}>
                {helpCard?.primaryCtaText}
              </a>
              <a
                className={styles.secondaryCta}
                href={helpCard?.secondaryCtaHref}
              >
                {helpCard?.secondaryCtaText}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionDivider} />
    </div>
  );
};

export default AboutContent;
