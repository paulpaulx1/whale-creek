import { memo, useCallback } from 'react';
import styles from './ImageCarousel.module.css';
import Image from 'next/image';
import {
  CaretLeftIcon,
  CaretRightIcon,
} from '@phosphor-icons/react';
import { urlFor } from '../lib/sanity';

const ImageCarousel = memo(
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
              <CaretLeftIcon size={28} />
            </button>
            <button
              className={`${styles.carouselControl} ${styles.carouselNext}`}
              onClick={handleNextClick}
              aria-label='Next image'
              type='button'
            >
              <CaretRightIcon size={28} />
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
          </>
        )}
      </div>
    );
  }
);

ImageCarousel.displayName = 'ImageCarousel';

export default ImageCarousel;
