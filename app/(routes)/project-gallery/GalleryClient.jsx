'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ImageCarousel from '../../components/ImageCarousel';
import Lightbox from '../../components/LightBox';
import styles from './Gallery.module.css';
import Filter from '../../components/Filter';

export default function GalleryClient({ projects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [projectImageIndices, setProjectImageIndices] = useState({});
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [galleryCollapsed, setGalleryCollapsed] = useState(false)

  const handleToggleGallery = () => {
    setGalleryCollapsed((prev) => !prev)
  }

  const categories = [
    { id: 'all', label: 'All Projects', icon: 'squares-four' },
    { id: 'millwork', label: 'Custom Millwork', icon: 'hammer' },
    { id: 'residential', label: 'Residential', icon: 'house' },
    { id: 'commercial', label: 'Commercial', icon: 'buildings' },
    { id: 'cabinetry', label: 'Cabinetry', icon: 'toolbox' },
    { id: 'renovation', label: 'Renovation', icon: 'wrench' },
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter)
      );
    }
  }, [activeFilter, projects]);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
  };

  const openLightbox = (image, project, imageIndex = 0) => {
    setLightboxImage({
      ...image,
      projectTitle: project.title,
      fullProject: project,
    });
    setModalImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setModalImageIndex(0);
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

  // Helper function to create unique keys per context
  const getProjectKey = useCallback((projectId, context = 'default') => {
    return `${projectId}-${context}`;
  }, []);

  // Updated handlers with context support
  const handlePrevImage = useCallback(
    (projectId, imageCount, context = 'default') => {
      const projectKey = getProjectKey(projectId, context);
      setProjectImageIndices((prev) => {
        const currentIndex = prev[projectKey] || 0;
        const newIndex = currentIndex > 0 ? currentIndex - 1 : imageCount - 1;

        return {
          ...prev,
          [projectKey]: newIndex,
        };
      });
    },
    [getProjectKey]
  );

  const handleNextImage = useCallback(
    (projectId, imageCount, context = 'default') => {
      const projectKey = getProjectKey(projectId, context);
      setProjectImageIndices((prev) => {
        const currentIndex = prev[projectKey] || 0;
        const newIndex = currentIndex < imageCount - 1 ? currentIndex + 1 : 0;

        return {
          ...prev,
          [projectKey]: newIndex,
        };
      });
    },
    [getProjectKey]
  );

  const handleSetImageIndex = useCallback(
    (projectId, index, context = 'default') => {
      const projectKey = getProjectKey(projectId, context);
      setProjectImageIndices((prev) => ({
        ...prev,
        [projectKey]: index,
      }));
    },
    [getProjectKey]
  );

  const getCurrentImageIndex = useCallback(
    (projectId, context = 'default') => {
      const projectKey = getProjectKey(projectId, context);
      return projectImageIndices[projectKey] || 0;
    },
    [projectImageIndices, getProjectKey]
  );

  return (
    <main className={styles.main}>
      {/* Filter Section */}
      <Filter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      {/* Featured Projects */}
      {filteredProjects.filter((p) => p.featured).length > 0 && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <div className={styles.featuredGrid}>
              {filteredProjects
                .filter((p) => p.featured)
                .slice(0, 3)
                .map((project) => (
                  <div
                    key={project._id}
                    className={styles.featuredCard}
                    onClick={() => {
                      const currentImageIndex = getCurrentImageIndex(
                        project._id,
                        'featured'
                      );
                      const currentImage = project.images?.[currentImageIndex];
                      if (currentImage?.asset?.asset) {
                        openLightbox(currentImage, project, currentImageIndex);
                      }
                    }}
                  >
                    <div className={styles.featuredImage}>
                      <ImageCarousel
                        project={project}
                        imageIndex={getCurrentImageIndex(
                          project._id,
                          'featured'
                        )}
                        onPrevImage={handlePrevImage}
                        onNextImage={handleNextImage}
                        onSetImageIndex={handleSetImageIndex}
                        onImageClick={openLightbox}
                        context='featured' // Add context
                        imageWidth={800}
                        imageHeight={600}
                        showCounter={true}
                        showIndicators={true}
                      />
                      <div className={styles.featuredOverlay}>
                        <div className={styles.featuredInfo}>
                          <h3>{project.title}</h3>
                          <p>{project.location}</p>
                          <span className={styles.category}>
                            {project.category}
                          </span>
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
                <i
                  className='ph ph-folder-open'
                  style={{ fontSize: '4rem', color: '#999', opacity: 0.5 }}
                ></i>
              </div>
              <h3>No projects found</h3>
              <p>
                {activeFilter === 'all'
                  ? "We haven't added any projects yet. Check back soon!"
                  : `No projects found in the ${activeFilter} category.`}
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
                <div
                  key={project._id}
                  className={styles.projectCard}
                  onClick={() => {
                    const currentImageIndex = getCurrentImageIndex(
                      project._id,
                      'grid'
                    );
                    const currentImage = project.images?.[currentImageIndex];
                    if (currentImage?.asset?.asset) {
                      openLightbox(currentImage, project, currentImageIndex);
                    }
                  }}
                >
                  <div className={styles.projectImage}>
                    <ImageCarousel
                      project={project}
                      imageIndex={getCurrentImageIndex(project._id, 'grid')}
                      onPrevImage={handlePrevImage}
                      onNextImage={handleNextImage}
                      onSetImageIndex={handleSetImageIndex}
                      onImageClick={openLightbox}
                      context='grid' // Add context
                      imageWidth={600}
                      imageHeight={400}
                      showCounter={false}
                      showIndicators={false}
                      className={styles.projectImageCarousel}
                    />
                  </div>
                  <div className={styles.projectInfo}>
                    <div className={styles.projectHeader}>
                      <h3>{project.title}</h3>
                      <span className={styles.projectCategory}>
                        {project.category}
                      </span>
                    </div>
                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>
                    <div className={styles.projectMeta}>
                      {project.location && (
                        <span className={styles.location}>
                          <i className='ph ph-map-pin'></i>
                          {project.location}
                        </span>
                      )}
                      {project.completedDate && (
                        <span className={styles.date}>
                          <i className='ph ph-calendar'></i>
                          {new Date(project.completedDate).getFullYear()}
                        </span>
                      )}
                    </div>
                    {project.tags && project.tags.length > 0 && (
                      <div className={styles.tags}>
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className={styles.tag}>
                            {tag}
                          </span>
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
      {lightboxImage && (
        <Lightbox
          lightboxImage={lightboxImage}
          modalImageIndex={modalImageIndex}
          closeLightbox={closeLightbox}
          setModalImageIndex={setModalImageIndex}
          galleryCollapsed={galleryCollapsed}
          onToggleGallery={handleToggleGallery}
        />
      )}
    </main>
  );
}
