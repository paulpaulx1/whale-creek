"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Filter from "../../components/Filter";
import styles from "./Gallery.module.css";

export default function FilterClient({ projects }) {
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

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
  };

  // Filter projects
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Entrance animation
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
      { threshold: 0.2 }
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
        onFilterChange={handleFilterChange}
      />

      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => {
              const image = project.images?.[0]?.asset?.asset?.url;

              return (
                <Link
                  href={`/project-gallery/${project.slug?.current || project._id}`}
                  key={project._id}
                  className={styles.projectCard}
                  ref={(el) => (gridRefs.current[index] = el)}
                >
                  <article>
                    <div className={styles.projectImage}>
                      {image && (
                        <Image
                          src={image}
                          alt={project.images?.[0]?.alt || project.title}
                          fill
                          className={styles.projectImg}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
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
        </div>
      </section>
    </>
  );
}
