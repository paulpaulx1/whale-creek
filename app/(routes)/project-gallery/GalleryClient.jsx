'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity';
import styles from './Gallery.module.css';

export default function GalleryClient({ projects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All Projects', icon: 'squares-four' },
    { id: 'millwork', label: 'Custom Millwork', icon: 'hammer' },
    { id: 'residential', label: 'Residential', icon: 'house' },
    { id: 'commercial', label: 'Commercial', icon: 'buildings' },
    { id: 'cabinetry', label: 'Cabinetry', icon: 'toolbox' },
    { id: 'renovation', label: 'Renovation', icon: 'wrench' }
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.category === activeFilter
      ));
    }
  }, [activeFilter, projects]);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
  };

  const openLightbox = (image, project) => {
    setLightboxImage({ ...image, projectTitle: project.title });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (lightboxImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage]);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterGrid}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.filterBtn} ${
                  activeFilter === category.id ? styles.active : ''
                }`}
                onClick={() => handleFilterChange(category.id)}
              >
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {filteredProjects.filter(p => p.featured).length > 0 && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <div className={styles.featuredGrid}>
              {filteredProjects.filter(p => p.featured).slice(0, 3).map((project) => (
                <div key={project._id} className={styles.featuredCard}>
                  <div className={styles.featuredImage}>
                    {project.images && project.images[0] && project.images[0].asset?.asset ? (
                      <Image
                        src={urlFor(project.images[0].asset.asset).width(800).height(600).url()}
                        alt={project.images[0].alt || project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        onClick={() => openLightbox(project.images[0], project)}
                        className={styles.clickableImage}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <i className="ph ph-image" style={{ fontSize: '4rem', color: '#999', opacity: 0.5 }}></i>
                        <p>Featured Project</p>
                      </div>
                    )}
                    <div className={styles.featuredOverlay}>
                      <div className={styles.featuredInfo}>
                        <h3>{project.title}</h3>
                        <p>{project.location}</p>
                        <span className={styles.category}>{project.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>All Projects</h2>
          {filteredProjects.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <i className="ph ph-folder-open" style={{ fontSize: '4rem', color: '#999', opacity: 0.5 }}></i>
              </div>
              <h3>No projects found</h3>
              <p>
                {activeFilter === 'all' 
                  ? "We haven't added any projects yet. Check back soon!"
                  : `No projects found in the ${activeFilter} category.`
                }
              </p>
              {activeFilter !== 'all' && (
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={styles.btnSecondary}
                >
                  View All Projects
                </button>
              )}
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project) => (
                <div key={project._id} className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    {project.images && project.images[0] && project.images[0].asset?.asset ? (
                      <Image
                        src={urlFor(project.images[0].asset.asset).width(600).height(400).url()}
                        alt={project.images[0].alt || project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        onClick={() => openLightbox(project.images[0], project)}
                        className={styles.clickableImage}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <i className="ph ph-image" style={{ fontSize: '3rem', color: '#999', opacity: 0.5 }}></i>
                        <p>No image available</p>
                      </div>
                    )}
                    {project.images && project.images.length > 1 && (
                      <div className={styles.imageCount}>
                        <i className="ph ph-images"></i>
                        <span>{project.images.length}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.projectInfo}>
                    <div className={styles.projectHeader}>
                      <h3>{project.title}</h3>
                      <span className={styles.projectCategory}>{project.category}</span>
                    </div>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <div className={styles.projectMeta}>
                      {project.location && (
                        <span className={styles.location}>
                          <i className="ph ph-map-pin"></i>
                          {project.location}
                        </span>
                      )}
                      {project.completedDate && (
                        <span className={styles.date}>
                          <i className="ph ph-calendar"></i>
                          {new Date(project.completedDate).getFullYear()}
                        </span>
                      )}
                    </div>
                    {project.tags && project.tags.length > 0 && (
                      <div className={styles.tags}>
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Start Your Project?</h2>
            <p>
              Let&apos;s bring your vision to life with our award-winning 
              craftsmanship and design expertise.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/indianapolis-woodworker-contact" className={styles.btnPrimary}>
                Get Free Estimate
              </a>
              <a href="/indianapolis-general-contractor" className={styles.btnSecondary}>
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={closeLightbox}>
              <i className="ph ph-x"></i>
            </button>
            <div className={styles.lightboxImage}>
              <Image
                src={urlFor(lightboxImage.asset.asset).width(1200).height(900).url()}
                alt={lightboxImage.alt || lightboxImage.projectTitle}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className={styles.lightboxInfo}>
              <h3>{lightboxImage.projectTitle}</h3>
              {lightboxImage.caption && <p>{lightboxImage.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}