// app/project-gallery/FilterClient.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Filter from "../../components/Filter";
import styles from "./Gallery.module.css";

export default function FilterClient({
  projects = [],
  page = 1,
  totalPages = 1,
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const gridRefs = useRef([]);

  const categories = [
    { id: "all", label: "All" },
    { id: "millwork", label: "Millwork" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "cabinetry", label: "Cabinetry" },
    { id: "renovation", label: "Renovation" },
  ];

  const filteredProjects = useMemo(() => {
    const base = Array.isArray(projects) ? projects : [];
    return activeFilter === "all"
      ? base
      : base.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  // ✅ Keep refs aligned with the currently rendered list
  useEffect(() => {
    gridRefs.current = gridRefs.current.slice(0, filteredProjects.length);
  }, [filteredProjects.length]);

  // ✅ Entrance animation (safe)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    gridRefs.current.forEach((el) => {
      if (el) {
        el.classList.remove(styles.visible);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <>
      <Filter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => {
              // ✅ Prefer higher-fidelity grid URL if your paginated query adds it
              const asset = project.images?.[0]?.asset?.asset;

              // If you updated the paginated GROQ to add urlGrid inside asset->, it'll be here:
              const image = asset?.urlGrid || asset?.url;

              // ✅ Use actual slug string when your paginated query returns "slug": slug.current
              const slug =
                typeof project.slug === "string"
                  ? project.slug
                  : project.slug?.current;

              // ✅ Prevent broken links
              const href = slug
                ? `/project-gallery/${slug}`
                : `/project-gallery/${project._id}`;

              // ✅ Preserve aspect ratio so images don’t look “fucked up”
              // When using `fill`, your wrapper MUST define an aspect-ratio or fixed height.
              // We’ll set it inline as a fallback (CSS can override).
              const w = asset?.metadata?.dimensions?.width;
              const h = asset?.metadata?.dimensions?.height;
              const ratio = w && h ? `${w} / ${h}` : "4 / 3";

              return (
                <Link
                  href={href}
                  key={project._id}
                  className={styles.projectCard}
                  ref={(el) => (gridRefs.current[index] = el)}
                >
                  <article>
                    <div
                      className={styles.projectImage}
                      style={{ aspectRatio: ratio }}
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt={project.images?.[0]?.alt || project.title}
                          fill
                          className={styles.projectImg}
                          // ✅ Make sure the browser chooses sane display sizes
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          // ✅ Use Sanity CDN transforms directly
                          unoptimized
                          // ✅ Helps prevent weird stretching/letterboxing
                          // (your CSS should include object-fit: cover)
                        />
                      ) : (
                        <div className={styles.projectImgFallback} />
                      )}
                    </div>

                    <div className={styles.projectInfo}>
                      <h3>{project.title}</h3>
                      {project.location && <span>{project.location}</span>}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* ✅ Simple pagination (only for "all" — otherwise it’s weird UX) */}
          {activeFilter === "all" && totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Gallery pages">
              <Link
                className={`${styles.pageBtn} ${page <= 1 ? styles.disabled : ""}`}
                href={`/project-gallery?page=${Math.max(1, page - 1)}`}
                aria-disabled={page <= 1}
                tabIndex={page <= 1 ? -1 : 0}
              >
                ← Prev
              </Link>

              <div className={styles.pageMeta}>
                Page {page} / {totalPages}
              </div>

              <Link
                className={`${styles.pageBtn} ${
                  page >= totalPages ? styles.disabled : ""
                }`}
                href={`/project-gallery?page=${Math.min(totalPages, page + 1)}`}
                aria-disabled={page >= totalPages}
                tabIndex={page >= totalPages ? -1 : 0}
              >
                Next →
              </Link>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
