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
      <div ref={sectionRef} className={styles.aboutContent}>
        {/* Image */}
        <div
          className={cx(
            styles.imageSection,
            hasAnimated ? styles.aboutVisible : styles.aboutHiddenLeft
          )}
        >
          <AboutImage />
        </div>

        {/* Text */}
        <div
          className={cx(
            styles.content,
            hasAnimated ? styles.aboutVisibleDelayed : styles.aboutHiddenRight
          )}
        >
          <h1 className={styles.title}>About Whale Creek</h1>

          <div className={styles.contentBlock}>
            <p>
              Whale Creek Co. is your go-to Indianapolis general contractor for
              home renovations that blend expert craftsmanship with thoughtful
              design. From kitchen renovations to custom millwork and complete
              remodels, we excel in bringing your vision to life.
            </p>

            <p>
              We're a full-service workshop based in Garfield Park, where we
              offer construction expertise, woodworking, and custom fabrication
              under one roof. From initial sketches to final installation, our
              team of skilled craftsmen delivers exceptional millwork, custom
              furniture, and construction projects including sunrooms, decks,
              cabinetry, and home renovations.
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
