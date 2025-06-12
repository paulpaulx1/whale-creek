import React from 'react';
import Image from 'next/image';
import { XIcon } from '@phosphor-icons/react';
import { urlFor } from '../lib/sanity'
import styles from './LightBox.module.css'; 

const Lightbox = ({
  lightboxImage,
  modalImageIndex,
  closeLightbox,
  setModalImageIndex,
}) => {
  if (!lightboxImage || !lightboxImage.fullProject) return null;

  return (
    <div className={styles.projectModal} onClick={closeLightbox}>
      <div
        className={styles.projectModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className={styles.projectModalClose} onClick={closeLightbox}>
          <XIcon size={32} />
        </button>

        <div className={styles.projectModalBody}>
          {/* Primary Section with Enhanced Content */}
          <div className={styles.projectModalPrimary}>
            <div className={styles.projectHeader}>
              <h1 className={styles.projectTitle}>
                {lightboxImage.fullProject.title}
              </h1>
              {lightboxImage.fullProject.category && (
                <span className={styles.projectCategory}>
                  {lightboxImage.fullProject.category}
                </span>
              )}
            </div>

            <div className={styles.projectDescription}>
              <p className={styles.shortDescription}>
                {lightboxImage.fullProject.description}
              </p>
            </div>

            {/* Key Meta Info in Primary Section */}
            <div className={styles.primaryMetaGrid}>
              {lightboxImage.fullProject.location && (
                <div className={styles.primaryMetaItem}>
                  <div className={styles.metaIcon}>
                    <i className='ph ph-map-pin'></i>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Location</span>
                    <span className={styles.metaValue}>
                      {lightboxImage.fullProject.location}
                    </span>
                  </div>
                </div>
              )}

              {lightboxImage.fullProject.completedDate && (
                <div className={styles.primaryMetaItem}>
                  <div className={styles.metaIcon}>
                    <i className='ph ph-calendar'></i>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Year</span>
                    <span className={styles.metaValue}>
                      {new Date(
                        lightboxImage.fullProject.completedDate
                      ).getFullYear()}
                    </span>
                  </div>
                </div>
              )}

              {lightboxImage.fullProject.client && (
                <div className={styles.primaryMetaItem}>
                  <div className={styles.metaIcon}>
                    <i className='ph ph-user'></i>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Client</span>
                    <span className={styles.metaValue}>
                      {lightboxImage.fullProject.client}
                    </span>
                  </div>
                </div>
              )}

              {lightboxImage.fullProject.projectValue && (
                <div className={styles.primaryMetaItem}>
                  <div className={styles.metaIcon}>
                    <i className='ph ph-currency-dollar'></i>
                  </div>
                  <div>
                    <span className={styles.metaLabel}>Value</span>
                    <span className={styles.metaValue}>
                      $
                      {lightboxImage.fullProject.projectValue.replace(
                        '-',
                        ' - $'
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Project Highlights */}
            {(lightboxImage.fullProject.tags?.length > 0 ||
              lightboxImage.fullProject.materials?.length > 0) && (
              <div className={styles.projectHighlights}>
                {lightboxImage.fullProject.tags &&
                  lightboxImage.fullProject.tags.length > 0 && (
                    <div className={styles.highlightSection}>
                      <h4>Key Features</h4>
                      <div className={styles.highlightTags}>
                        {lightboxImage.fullProject.tags
                          .slice(0, 3)
                          .map((tag, index) => (
                            <span key={index} className={styles.highlightTag}>
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                {lightboxImage.fullProject.materials &&
                  lightboxImage.fullProject.materials.length > 0 && (
                    <div className={styles.highlightSection}>
                      <h4>Primary Materials</h4>
                      <div className={styles.highlightMaterials}>
                        {lightboxImage.fullProject.materials
                          .slice(0, 2)
                          .map((material, index) => (
                            <span
                              key={index}
                              className={styles.highlightMaterial}
                            >
                              {material}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* HERO IMAGE SECTION */}
          <div className={styles.projectModalImage}>
            <div className={styles.heroImageContainer}>
              <Image
                src={urlFor(
                  lightboxImage.fullProject.images[modalImageIndex].asset.asset
                )
                  .width(700)
                  .height(500)
                  .url()}
                alt={
                  lightboxImage.fullProject.images[modalImageIndex].alt ||
                  lightboxImage.fullProject.title
                }
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            {/* Image Caption */}
            {lightboxImage.fullProject.images[modalImageIndex].caption && (
              <div className={styles.imageCaption}>
                {lightboxImage.fullProject.images[modalImageIndex].caption}
              </div>
            )}
          </div>

          {/* Secondary Section - Restructured Layout */}
          <div className={styles.projectModalSecondary}>
            {/* First Row: Detail Sections (50% each) */}
            <div className={styles.detailSectionsRow}>
              {/* Long Description */}
              {lightboxImage.fullProject.longDescription && (
                <div className={styles.detailSection}>
                  <h4>Project Details</h4>
                  <p className={styles.detailedDescription}>
                    {lightboxImage.fullProject.longDescription}
                  </p>
                </div>
              )}

              {/* Client Testimonial */}
              {lightboxImage.fullProject.testimonial &&
                lightboxImage.fullProject.testimonial.quote && (
                  <div className={styles.detailSection}>
                    <h4>Client Testimonial</h4>
                    <div className={styles.testimonial}>
                      <blockquote className={styles.quote}>
                        {lightboxImage.fullProject.testimonial.quote}
                      </blockquote>
                      <div className={styles.author}>
                        <strong>
                          {lightboxImage.fullProject.testimonial.author}
                        </strong>
                        {lightboxImage.fullProject.testimonial.authorTitle && (
                          <span className={styles.authorTitle}>
                            {lightboxImage.fullProject.testimonial.authorTitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {/* Second Row: Secondary Details Grid (Full Width) */}
            <div className={styles.secondaryDetailsGrid}>
              {/* Remaining Tags */}
              {lightboxImage.fullProject.tags &&
                lightboxImage.fullProject.tags.length > 3 && (
                  <div className={styles.detailSection}>
                    <h4>Additional Tags</h4>
                    <div className={styles.tagsList}>
                      {lightboxImage.fullProject.tags
                        .slice(3)
                        .map((tag, index) => (
                          <span key={index} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

              {/* Remaining Materials */}
              {lightboxImage.fullProject.materials &&
                lightboxImage.fullProject.materials.length > 2 && (
                  <div className={styles.detailSection}>
                    <h4>Additional Materials</h4>
                    <div className={styles.materialsList}>
                      {lightboxImage.fullProject.materials
                        .slice(2)
                        .map((material, index) => (
                          <span key={index} className={styles.material}>
                            {material}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Always Visible Image Gallery Section (30% of modal height) */}
        <div className={styles.imageGallerySection}>
          <div className={styles.galleryHeader}>
            <h3>Project Gallery</h3>
          </div>

          <div className={styles.imageGrid}>
            {lightboxImage.fullProject.images.map((image, index) => (
              <div
                key={index}
                className={`${styles.galleryThumbnail} ${index === modalImageIndex ? styles.active : ''}`}
                onClick={() => setModalImageIndex(index)}
              >
                <Image
                  src={urlFor(image.asset.asset).width(200).height(150).url()}
                  alt={
                    image.alt ||
                    `${lightboxImage.fullProject.title} - Image ${index + 1}`
                  }
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {image.caption && (
                  <div className={styles.thumbnailCaption}>{image.caption}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
