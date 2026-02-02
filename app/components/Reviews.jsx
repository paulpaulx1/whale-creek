"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./Reviews.module.css";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@phosphor-icons/react";

const Reviews = ({ reviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPerView, setReviewsPerView] = useState(1);

  // Handle responsive reviews per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newReviewsPerView = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
      setReviewsPerView(newReviewsPerView);
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoize maxIndex to prevent dependency array issues
  const maxIndex = useMemo(() => {
    return Math.floor((reviews.length - 1) / reviewsPerView) * reviewsPerView;
  }, [reviews.length, reviewsPerView]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - reviewsPerView;
      return newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + reviewsPerView;
      return newIndex > maxIndex ? 0 : newIndex;
    });
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`${styles.star} ${i < rating ? styles.filled : ""}`}
      >
        ★
      </span>
    ));
  };

  const getVisibleReviews = () => {
    return reviews.slice(currentIndex, currentIndex + reviewsPerView);
  };

  // Generate dot indicators for each valid starting position
  const getDotPositions = () => {
    const positions = [];
    for (let i = 0; i <= maxIndex; i += reviewsPerView) {
      positions.push(i);
    }
    return positions;
  };

  const getCurrentDotIndex = () => {
    return getDotPositions().indexOf(currentIndex);
  };

  // If no reviews, show placeholder
  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.reviewsContainer}>
        <div className={styles.reviewsHeader}>
          <div className={styles.sectionTitle}>What Our Clients Say</div>
        </div>
        <p className={styles.noReviews}>No reviews available yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsHeader}>
        <div className={styles.sectionTitle}>What Our Clients Say</div>
        <div className={styles.overallRating}>
          <div className={styles.ratingNumber}>5.0</div>
          <div className={styles.starsContainer}>{renderStars(5)}</div>
          <div className={styles.reviewCount}>
            Based on {reviews.length}+ reviews
          </div>
        </div>
      </div>

      <div className={styles.reviewsCarousel}>
        {/* Left Arrow */}
        <button
          className={`${styles.navArrow} ${styles.navArrowLeft}`}
          onClick={handlePrevious}
          aria-label="Previous reviews"
        >
          <ArrowCircleLeftIcon size={40} />
        </button>

        {/* Reviews Grid */}
        <div className={styles.reviewsGrid}>
          {getVisibleReviews().map((review) => (
            <div key={review._id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.authorAvatar}>
                  {review.author.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{review.author}</div>
                  <div className={styles.reviewMeta}>
                    <div className={styles.stars}>
                      {renderStars(review.rating)}
                    </div>
                    <span className={styles.timeAgo}>{review.timeAgo}</span>
                  </div>
                </div>
              </div>
              <div className={styles.reviewText}>{review.text}</div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`${styles.navArrow} ${styles.navArrowRight}`}
          onClick={handleNext}
          aria-label="Next reviews"
        >
          <ArrowCircleRightIcon size={40} />
        </button>
      </div>

      {/* Dots indicator */}
      {getDotPositions().length > 1 && (
        <div className={styles.dotsContainer}>
          {getDotPositions().map((position, index) => (
            <button
              key={position}
              className={`${styles.dot} ${index === getCurrentDotIndex() ? styles.active : ""}`}
              onClick={() => handleDotClick(position)}
              aria-label={`Go to review set ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
