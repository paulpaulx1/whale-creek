"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Lightbox from "../../components/LightBox";
import Filter from "../../components/Filter";
import styles from "./Gallery.module.css";
import Link from "next/link";

export default function GalleryClient({ projects, page = 1, totalPages = 1 }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const gridRefs = useRef([]);

  const categories = [
    { id: "all", label: "All" },
    { id: "millwork", label: "Millwork" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "cabinetry", label: "Cabinetry" },
    { id: "renovation", label: "Renovation" },
  ];

  useEffect(() => {
    const base = Array.isArray(projects) ? projects : [];
    setFilteredProjects(
      activeFilter === "all"
        ? base
        : base.filter((p) => p.category === activeFilter),
    );
  }, [activeFilter, projects]);

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

  const openLightbox = (cover, project, index = 0) => {
    if (!cover) return;
    setLightboxImage({
      ...cover,
      // make Lightbox use urlLightbox
      url: cover.urlLightbox || cover.url,
      projectTitle: project.title,
      fullProject: project,
    });
    setModalImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setModalImageIndex(0);
  };

  return (
    <main className={styles.main}>
      <Filter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        minimal
      />

      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => {
              const cover = project.cover;
              const src = cover?.urlGrid || cover?.url;

              return (
                <article
                  ref={(el) => (gridRefs.current[index] = el)}
                  className={styles.projectCard}
                  onClick={() => openLightbox(cover, project, 0)}
                  key={project._id}
                >
                  <div className={styles.projectImage}>
                    {src && (
                      <Image
                        src={src}
                        alt={cover?.alt || project.title}
                        fill
                        className={styles.projectImg}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                    )}
                  </div>

                  <div className={styles.projectInfo}>
                    <h3>{project.title}</h3>
                    {project.location && <span>{project.location}</span>}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          <nav className={styles.pagination} aria-label="Gallery pages">
            <Link
              className={styles.pageBtn}
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
              className={styles.pageBtn}
              href={`/project-gallery?page=${Math.min(totalPages, page + 1)}`}
              aria-disabled={page >= totalPages}
              tabIndex={page >= totalPages ? -1 : 0}
            >
              Next →
            </Link>
          </nav>
        </div>
      </section>

      {lightboxImage && (
        <Lightbox
          lightboxImage={lightboxImage}
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          closeLightbox={closeLightbox}
        />
      )}
    </main>
  );
}
