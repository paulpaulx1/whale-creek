'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity';
import styles from './Gallery.module.css';
import  { ArrowFatLinesLeftIcon, ArrowFatLinesRightIcon } from '@phosphor-icons/react'

const ImageCarousel = React.memo(
  ({
    project,
    imageIndex,
    onPrevImage,
    onNextImage,
    onSetImageIndex,
    onImageClick,
    context = 'default', // Add context prop
    imageWidth = 600,
    imageHeight = 400,
    showCounter = false,
    showIndicators = true,
    className = '',
  }) => {
    const currentImage = project.images?.[imageIndex];
    const hasMultipleImages = project.images && project.images.length > 1;

    // Updated event handlers to include context
    const handlePrevClick = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onPrevImage(project._id, project.images.length, context);
      },
      [project._id, project.images.length, onPrevImage, context]
    );

    const handleNextClick = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onNextImage(project._id, project.images.length, context);
      },
      [project._id, project.images.length, onNextImage, context]
    );

    const handleIndicatorClick = useCallback(
      (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        onSetImageIndex(project._id, index, context);
      },
      [project._id, onSetImageIndex, context]
    );

    if (!currentImage?.asset?.asset) {
      return (
        <div className={`${styles.placeholderImage} ${className}`}>
          <i
            className='ph ph-image'
            style={{ fontSize: '3rem', color: '#999', opacity: 0.5 }}
          ></i>
          <p>No image available</p>
        </div>
      );
    }

    return (
      <div className={`${styles.carouselWrapper} ${className}`}>
        <Image
          src={urlFor(currentImage.asset.asset)
            .width(imageWidth)
            .height(imageHeight)
            .url()}
          alt={currentImage.alt || project.title}
          fill
          style={{ objectFit: 'cover' }}
          onClick={() => onImageClick(currentImage, project)}
          className={styles.clickableImage}
        />

        {/* Navigation Controls */}
        {hasMultipleImages && (
          <>
            <button
              className={`${styles.carouselControl} ${styles.carouselPrev}`}
              onClick={handlePrevClick}
              aria-label='Previous image'
              type='button'
            >
              <ArrowFatLinesLeftIcon size={28} />
            </button>
            <button
              className={`${styles.carouselControl} ${styles.carouselNext}`}
              onClick={handleNextClick}
              aria-label='Next image'
              type='button'
            >
              <ArrowFatLinesRightIcon size={28} />
            </button>

            {/* Image Indicators */}
            {showIndicators && (
              <div className={styles.carouselIndicators}>
                {project.images.map((_, index) => (
                  <button
                    key={`${project._id}-${context}-indicator-${index}`}
                    className={`${styles.carouselIndicator} ${
                      index === imageIndex ? styles.active : ''
                    }`}
                    onClick={(e) => handleIndicatorClick(e, index)}
                    aria-label={`Go to image ${index + 1}`}
                    type='button'
                  />
                ))}
              </div>
            )}

            {/* Image Counter */}
            {showCounter && (
              <div className={styles.imageCounter}>
                {imageIndex + 1} / {project.images.length}
              </div>
            )}

            {/* Image Count Badge (for project cards) */}
            {!showCounter && (
              <div className={styles.imageCount}>
                <i className='ph ph-images'></i>
                <span>{project.images.length}</span>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';


export default function GalleryClient({ projects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [projectImageIndices, setProjectImageIndices] = useState({});
  const [modalImageIndex, setModalImageIndex] = useState(0);

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

  const handleModalPrevImage = () => {
    if (lightboxImage?.fullProject?.images) {
      setModalImageIndex((prev) =>
        prev > 0 ? prev - 1 : lightboxImage.fullProject.images.length - 1
      );
    }
  };

  const handleModalNextImage = () => {
    if (lightboxImage?.fullProject?.images) {
      setModalImageIndex((prev) =>
        prev < lightboxImage.fullProject.images.length - 1 ? prev + 1 : 0
      );
    }
  };

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
              <a
                href='/indianapolis-woodworker-contact'
                className={styles.btnPrimary}
              >
                Get Free Estimate
              </a>
              <a
                href='/indianapolis-general-contractor'
                className={styles.btnSecondary}
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal*/}
      {lightboxImage && lightboxImage.fullProject && (
        <div className={styles.projectModal} onClick={closeLightbox}>
          <div
            className={styles.projectModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className={styles.projectModalClose}
              onClick={closeLightbox}
            >
              <i className='ph ph-x'></i>
            </button>

            <div className={styles.projectModalBody}>
              {/* Left Side - Image Carousel */}
              <div className={styles.projectModalImages}>
                {lightboxImage.fullProject.images &&
                  lightboxImage.fullProject.images.length > 0 && (
                    <>
                      <div className={styles.modalImageContainer}>
                        <Image
                          src={urlFor(
                            lightboxImage.fullProject.images[modalImageIndex]
                              .asset.asset
                          )
                            .width(800)
                            .height(600)
                            .url()}
                          alt={
                            lightboxImage.fullProject.images[modalImageIndex]
                              .alt || lightboxImage.fullProject.title
                          }
                          fill
                          style={{ objectFit: 'contain' }}
                          priority
                        />

                        {/* Image Navigation */}
                        {lightboxImage.fullProject.images.length > 1 && (
                          <>
                            <button
                              className={`${styles.modalCarouselControl} ${styles.modalCarouselPrev}`}
                              onClick={handleModalPrevImage}
                              aria-label='Previous image'
                            >
                              <i className='ph ph-caret-left'></i>
                            </button>
                            <button
                              className={`${styles.modalCarouselControl} ${styles.modalCarouselNext}`}
                              onClick={handleModalNextImage}
                              aria-label='Next image'
                            >
                              <i className='ph ph-caret-right'></i>
                            </button>
                          </>
                        )}
                      </div>

                      {/* Image Caption */}
                      {lightboxImage.fullProject.images[modalImageIndex]
                        .caption && (
                        <div className={styles.modalImageCaption}>
                          {
                            lightboxImage.fullProject.images[modalImageIndex]
                              .caption
                          }
                        </div>
                      )}

                      {/* Image Thumbnails */}
                      {lightboxImage.fullProject.images.length > 1 && (
                        <div className={styles.modalThumbnails}>
                          {lightboxImage.fullProject.images.map(
                            (image, index) => (
                              <button
                                key={index}
                                className={`${styles.modalThumbnail} ${
                                  index === modalImageIndex ? styles.active : ''
                                }`}
                                onClick={() => setModalImageIndex(index)}
                              >
                                <Image
                                  src={urlFor(image.asset.asset)
                                    .width(100)
                                    .height(75)
                                    .url()}
                                  alt={
                                    image.alt ||
                                    `${lightboxImage.fullProject.title} - Image ${index + 1}`
                                  }
                                  fill
                                  style={{ objectFit: 'cover' }}
                                />
                              </button>
                            )
                          )}
                        </div>
                      )}

                      {/* Image Counter */}
                      {lightboxImage.fullProject.images.length > 1 && (
                        <div className={styles.modalImageCounter}>
                          {modalImageIndex + 1} of{' '}
                          {lightboxImage.fullProject.images.length}
                        </div>
                      )}
                    </>
                  )}
              </div>

              {/* Right Side - Project Details */}
              <div className={styles.projectModalDetails}>
                <div className={styles.projectModalHeader}>
                  <h1 className={styles.projectModalTitle}>
                    {lightboxImage.fullProject.title}
                  </h1>
                  {lightboxImage.fullProject.category && (
                    <span className={styles.projectModalCategory}>
                      {lightboxImage.fullProject.category}
                    </span>
                  )}
                </div>

                {/* Project Description */}
                <div className={styles.projectModalDescription}>
                  <p>{lightboxImage.fullProject.description}</p>
                  {lightboxImage.fullProject.longDescription && (
                    <p className={styles.longDescription}>
                      {lightboxImage.fullProject.longDescription}
                    </p>
                  )}
                </div>

                {/* Project Meta Information */}
                <div className={styles.projectModalMeta}>
                  {lightboxImage.fullProject.location && (
                    <div className={styles.metaItem}>
                      <i className='ph ph-map-pin'></i>
                      <span>
                        <strong>Location:</strong>{' '}
                        {lightboxImage.fullProject.location}
                      </span>
                    </div>
                  )}

                  {lightboxImage.fullProject.completedDate && (
                    <div className={styles.metaItem}>
                      <i className='ph ph-calendar'></i>
                      <span>
                        <strong>Completed:</strong>{' '}
                        {new Date(
                          lightboxImage.fullProject.completedDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {lightboxImage.fullProject.client && (
                    <div className={styles.metaItem}>
                      <i className='ph ph-user'></i>
                      <span>
                        <strong>Client:</strong>{' '}
                        {lightboxImage.fullProject.client}
                      </span>
                    </div>
                  )}

                  {lightboxImage.fullProject.projectValue && (
                    <div className={styles.metaItem}>
                      <i className='ph ph-currency-dollar'></i>
                      <span>
                        <strong>Project Value:</strong> $
                        {lightboxImage.fullProject.projectValue.replace(
                          '-',
                          ' - $'
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {lightboxImage.fullProject.tags &&
                  lightboxImage.fullProject.tags.length > 0 && (
                    <div className={styles.projectModalSection}>
                      <h3>Project Tags</h3>
                      <div className={styles.modalTags}>
                        {lightboxImage.fullProject.tags.map((tag, index) => (
                          <span key={index} className={styles.modalTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Materials */}
                {lightboxImage.fullProject.materials &&
                  lightboxImage.fullProject.materials.length > 0 && (
                    <div className={styles.projectModalSection}>
                      <h3>Materials Used</h3>
                      <div className={styles.modalMaterials}>
                        {lightboxImage.fullProject.materials.map(
                          (material, index) => (
                            <span key={index} className={styles.modalMaterial}>
                              {material}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Client Testimonial */}
                {lightboxImage.fullProject.testimonial &&
                  lightboxImage.fullProject.testimonial.quote && (
                    <div className={styles.projectModalSection}>
                      <h3>Client Testimonial</h3>
                      <div className={styles.modalTestimonial}>
                        <blockquote className={styles.testimonialQuote}>
                          {lightboxImage.fullProject.testimonial.quote}
                        </blockquote>
                        <div className={styles.testimonialAuthor}>
                          <strong>
                            {lightboxImage.fullProject.testimonial.author}
                          </strong>
                          {lightboxImage.fullProject.testimonial
                            .authorTitle && (
                            <span className={styles.testimonialTitle}>
                              {
                                lightboxImage.fullProject.testimonial
                                  .authorTitle
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
