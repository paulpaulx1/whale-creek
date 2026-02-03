"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects({ projects = [], maxProjects = 2 }) {
  const [currentPair, setCurrentPair] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // ✅ FEATURED FILTER MATCHES YOUR DATA
  const projectPairs = useMemo(() => {
    let available = projects.filter((p) => p.featured === true);

    if (available.length < maxProjects) {
      const nonFeatured = projects.filter((p) => !p.featured);
      available = [...available, ...nonFeatured];
    }

    available = available.slice(0, maxProjects);

    const pairs = [];
    for (let i = 0; i < available.length; i += maxProjects) {
      pairs.push(available.slice(i, i + maxProjects));
    }

    return pairs;
  }, [projects, maxProjects]);

  const currentProjects = projectPairs[currentPair] || [];
  const hasMultiplePairs = projectPairs.length > 1;

  // ✅ SLIDER ROTATION — ALWAYS CALLED
  useEffect(() => {
    if (!hasMultiplePairs) return;

    const interval = setInterval(() => {
      setCurrentPair((prev) => (prev + 1) % projectPairs.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [hasMultiplePairs, projectPairs.length]);

  // ✅ ENTRANCE ANIMATION — ALWAYS CALLED
  useEffect(() => {
    const section = document.querySelector(`.${styles.featuredSection}`);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ✅ ✅ ✅ SAFE TO EARLY-RETURN *AFTER* ALL HOOKS
  if (!currentProjects.length) return null;

  return (
    <>
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2
              className={`${styles.sectionTitle} ${hasAnimated ? styles.titleVisible : ""}`}
            >
              Featured Projects
            </h2>
            <Link
              href="/project-gallery"
              className={`${styles.viewAllLink} ${hasAnimated ? styles.linkVisible : ""}`}
            >
              View All Featured Projects
            </Link>
          </div>

          <div className={styles.featuredContainer}>
            <div className={styles.featuredGrid}>
              {currentProjects.map((project, index) => {
                const image = project.images?.[0];
                const imageUrl = image?.asset?.asset?.url;

                if (!imageUrl) {
                  console.warn("Missing image for:", project.title);
                  return null;
                }

                return (
                  <Link
                    key={project._id}
                    href="/project-gallery"
                    className={`
                      ${styles.featuredCard}
                      ${index === 0 ? styles.leftCard : styles.rightCard}
                      ${hasAnimated ? styles.cardVisible : styles.cardHidden}
                      ${hasAnimated && index === 1 ? styles.cardDelay : ""}
                    `}
                  >
                    <div className={styles.featuredImage}>
                      <Image
                        src={imageUrl}
                        alt={image.alt || project.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        className={styles.featuredImg}
                        priority={index === 0}
                      />
                    </div>

                    <div className={styles.projectOverlay}>
                      <div className={styles.projectInfo}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>

                        {project.location && (
                          <p className={styles.projectCategory}>
                            {project.location}
                          </p>
                        )}

                        <span className={styles.moreDetails}>
                          View Project →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {hasMultiplePairs && (
              <div className={styles.navigation}>
                <button
                  onClick={() =>
                    setCurrentPair((p) =>
                      p === 0 ? projectPairs.length - 1 : p - 1,
                    )
                  }
                  className={styles.navButton}
                >
                  ←
                </button>

                <button
                  onClick={() =>
                    setCurrentPair((p) => (p + 1) % projectPairs.length)
                  }
                  className={styles.navButton}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}></div>
    </>
  );
}
