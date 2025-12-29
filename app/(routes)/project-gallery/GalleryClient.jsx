"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Lightbox from "../../components/LightBox";
import Filter from "../../components/Filter";
import styles from "./Gallery.module.css";
import CTASection from "../../components/CTASection";

export default function GalleryClient({ projects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // ✅ Refs for entrance animation
  const gridRefs = useRef([]);

  // ✅ CLEAN CATEGORY DEFINITIONS (icons handled in Filter.jsx)
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

    if (activeFilter === "all") {
      setFilteredProjects(base);
    } else {
      const next = base.filter((project) => project.category === activeFilter);
      setFilteredProjects(next);
    }
  }, [activeFilter, projects]);

  /* ✅ FILTER RE-TRIGGER ANIMATION SAFELY */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target); // ✅ prevent flicker
          }
        });
      },
      { threshold: 0.2 }
    );

    gridRefs.current.forEach((el) => {
      if (el) {
        el.classList.remove(styles.visible); // ✅ reset before observe
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
  };

  const openLightbox = (image, project, index = 0) => {
    setLightboxImage({
      ...image,
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
      {/* ✅ FILTER */}
      <Filter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        minimal
      />

      {/* ✅ GALLERY GRID */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => {
              const image = project.images?.[0]?.asset?.asset?.url;

              return (
                <article
                  ref={(el) => (gridRefs.current[index] = el)}
                  className={styles.projectCard}
                  onClick={() => openLightbox(project.images?.[0], project, 0)}
                  key={project._id}
                >
                  <div className={styles.projectImage}>
                    {image && (
                      <Image
                        src={image}
                        alt={project.title}
                        fill
                        className={styles.projectImg}
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
        </div>
      </section>

      {/* ✅ LIGHTBOX */}
      {lightboxImage && (
        <Lightbox
          lightboxImage={lightboxImage}
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          closeLightbox={closeLightbox}
        />
      )}
      <CTASection />
    </main>
  );
}
