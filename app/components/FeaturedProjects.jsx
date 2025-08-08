'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import Lightbox from './LightBox';
import styles from './FeaturedProjects.module.css';

export default function FeaturedProjects({ projects, maxProjects = 2 }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [projectImageIndices, setProjectImageIndices] = useState({});
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [galleryCollapsed, setGalleryCollapsed] = useState(false);
  const [currentPair, setCurrentPair] = useState(0);

  // Get projects - prioritize featured, but ensure we have at most 2 to show
  let availableProjects = projects?.filter(p => p.featured) || [];
  
  // If we don't have enough featured projects, supplement with regular projects
  if (availableProjects.length < maxProjects && projects?.length > 0) {
    const nonFeatured = projects.filter(p => !p.featured);
    availableProjects = [...availableProjects, ...nonFeatured];
  }
  
  // Limit to exactly maxProjects (2) for the clean layout
  availableProjects = availableProjects.slice(0, maxProjects);
  
  // Split projects into pairs for cycling (though with limit of 2, this will just be one pair)
  const projectPairs = [];
  for (let i = 0; i < availableProjects.length; i += maxProjects) {
    projectPairs.push(availableProjects.slice(i, i + maxProjects));
  }

  const currentProjects = projectPairs[currentPair] || [];
  const hasMultiplePairs = projectPairs.length > 1;

  // Auto-cycle through pairs if there are multiple
  useEffect(() => {
    if (hasMultiplePairs) {
      const interval = setInterval(() => {
        setCurrentPair(prev => (prev + 1) % projectPairs.length);
      }, 8000); // Change every 8 seconds
      
      return () => clearInterval(interval);
    }
  }, [hasMultiplePairs, projectPairs.length]);

  const handleToggleGallery = () => {
    setGalleryCollapsed((prev) => !prev);
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

  const handlePrevPair = () => {
    setCurrentPair(prev => prev === 0 ? projectPairs.length - 1 : prev - 1);
  };

  const handleNextPair = () => {
    setCurrentPair(prev => (prev + 1) % projectPairs.length);
  };

  if (!currentProjects.length) {
    return null;
  }

  return (
    <>
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <a href="/project-gallery" className={styles.viewAllLink}>
              View All Featured Projects
            </a>
          </div>
          
          <div className={styles.featuredContainer}>
            <div className={styles.featuredGrid}>
              {currentProjects.map((project, index) => (
                <Link 
                  href="/project-gallery" 
                  key={`${project._id}-${currentPair}`}
                  className={`${styles.featuredCard} ${index === 0 ? styles.leftCard : styles.rightCard}`}
                >
                  <div className={styles.featuredImage}>
                    <ImageCarousel
                      project={project}
                      imageIndex={getCurrentImageIndex(project._id, 'featured')}
                      onPrevImage={handlePrevImage}
                      onNextImage={handleNextImage}
                      onSetImageIndex={handleSetImageIndex}
                      onImageClick={() => {}} // Disable lightbox since we're linking to gallery
                      context='featured'
                      imageWidth={800}
                      imageHeight={600}
                      showCounter={false}
                      showIndicators={false}
                    />
                  </div>
                  <div className={styles.projectOverlay}>
                    <div className={styles.projectInfo}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectCategory}>{project.category}</p>
                      <span className={styles.moreDetails}>MORE DETAILS →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {hasMultiplePairs && (
              <div className={styles.navigation}>
                <button 
                  onClick={handlePrevPair} 
                  className={styles.navButton}
                  aria-label="Previous projects"
                >
                  ←
                </button>
                <div className={styles.indicators}>
                  {projectPairs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPair(index)}
                      className={`${styles.indicator} ${index === currentPair ? styles.active : ''}`}
                      aria-label={`Go to projects ${index + 1}-${Math.min((index + 1) * maxProjects, availableProjects.length)}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={handleNextPair} 
                  className={styles.navButton}
                  aria-label="Next projects"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Divider Line */}
      <div className={styles.sectionDivider}></div>
      
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
    </>
  );
}