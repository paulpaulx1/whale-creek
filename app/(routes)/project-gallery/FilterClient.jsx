// app/project-gallery/FilterClient.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Filter from "../../components/Filter";
import styles from "./Gallery.module.css";

const PAGE_SIZE = 9;

export default function FilterClient({ projects = [] }) {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get("filter") ?? "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const gridRefs = useRef([]);
  const galleryRef = useRef(null);
  const userPageChangeRef = useRef(false);

  useEffect(() => {
    setActiveFilter(searchParams.get("filter") ?? "all");
  }, [searchParams]);

  const categories = [
    { id: "all", label: "All" },
    { id: "millwork", label: "Millwork" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "renovation", label: "Renovation" },
  ];

  const filteredProjects = useMemo(() => {
    const base = Array.isArray(projects) ? projects : [];
    const byCategory =
      activeFilter === "all"
        ? base
        : base.filter((p) => p.category === activeFilter);

    if (!searchQuery.trim()) return byCategory;

    const q = searchQuery.toLowerCase();
    return byCategory.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q),
    );
  }, [activeFilter, searchQuery, projects]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PAGE_SIZE),
  );

  const visibleProjects = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    gridRefs.current = gridRefs.current.slice(0, visibleProjects.length);
  }, [visibleProjects.length]);

  useEffect(() => {
    if (!userPageChangeRef.current) return;
    userPageChangeRef.current = false;
    const top =
      galleryRef.current?.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top, behavior: "smooth" });
  }, [currentPage]);

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
  }, [visibleProjects]);

  const useRowLayout = visibleProjects.length <= 3;

  const goToPreviousPage = () => {
    userPageChangeRef.current = true;
    setCurrentPage((page) => Math.max(1, page - 1));
  };
  const goToNextPage = () => {
    userPageChangeRef.current = true;
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  return (
    <>
      <div className={styles.searchWrapper}>
        <input
          type="search"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <Filter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {totalPages > 1 && (
        <div className={styles.pageIndicator}>
          {currentPage} / {totalPages}
        </div>
      )}

      <section className={styles.gallerySection} ref={galleryRef}>
        <div className={styles.container}>
          <div
            className={
              useRowLayout ? styles.projectsGridRow : styles.projectsGrid
            }
          >
            {visibleProjects.map((project, index) => {
              const asset = project.images?.[0]?.asset?.asset;
              const image = asset?.urlGrid || asset?.url;

              const slug =
                typeof project.slug === "string"
                  ? project.slug
                  : project.slug?.current;

              const href = slug
                ? `/project-gallery/${slug}`
                : `/project-gallery/${project._id}`;

              const width = asset?.metadata?.dimensions?.width;
              const height = asset?.metadata?.dimensions?.height;
              const ratio = width && height ? `${width} / ${height}` : "4 / 3";

              return (
                <Link
                  href={href}
                  key={project._id}
                  className={styles.projectCard}
                  ref={(el) => {
                    gridRefs.current[index] = el;
                  }}
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
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
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

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Gallery pages">
              <button
                type="button"
                className={`${styles.pageBtn} ${currentPage <= 1 ? styles.disabled : ""}`}
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
              >
                ← Prev
              </button>

              <div className={styles.pageMeta}>
                Page {currentPage} / {totalPages}
              </div>

              <button
                type="button"
                className={`${styles.pageBtn} ${currentPage >= totalPages ? styles.disabled : ""}`}
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
