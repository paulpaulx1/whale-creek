'use client';

import { useState, useEffect, useMemo } from 'react';
import styles from './Reviews.module.css';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@phosphor-icons/react';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPerView, setReviewsPerView] = useState(1);

  // Real reviews from David's Google Business
  const reviews = [
    {
      id: 1,
      author: 'Kelly Daisley',
      rating: 5,
      timeAgo: '5 months ago',
      text: "Dave's work is impeccable, from big projects to small. I hired him for a number of jobs... from a small side porch and awning replacement to installing window covers to a special cutout and paint job on my front door... and all were completed professionally and beyond expectations. Snag him early because his calendar is filling up, and it's no wonder!",
    },
    {
      id: 2,
      author: 'Angela Riggers',
      rating: 5,
      timeAgo: '2 weeks ago',
      text: 'I found Whale Creek through a Google search. They had good ratings. Dave always showed up when he said he would. The workers did a wonderful job and were very clean and courteous. We love our new deck! I would use them time and time again!',
    },
    {
      id: 3,
      author: 'Amanda Riley',
      rating: 5,
      timeAgo: '6 months ago',
      text: 'Highly recommend! David brought my vision to life. We had a weird alcove in our basement that now is a beautiful built-in banquette. He did several renderings to ensure we got it right.',
    },
    {
      id: 4,
      author: 'Eleanor Kamm',
      rating: 5,
      timeAgo: '11 months ago',
      text: 'David was an absolute pleasure to work with. We had a vision for what we wanted and he worked with us to get a stunning final project. He is a meticulous craftsman and all along the way suggested improvements ensuring that he created the best possible result.',
    },
    {
      id: 5,
      author: 'George Wright',
      rating: 5,
      timeAgo: '2 months ago',
      text: "Couldn't be happier with this company. The most professional from start to finish. Showed up on time, cleaned up nightly, finished on schedule and the project turned out way better than I could have ever thought.",
    },
    {
      id: 6,
      author: 'Josh Stark',
      rating: 5,
      timeAgo: 'a year ago',
      text: 'Whale Creek Co. has been producing high quality wood products for my company for a couple years now. They are equipped with CNC machine router, state of the art woodworking equipment, and a creative staff they can bring about any project to life. Highly Recommended!!',
    },
    {
      id: 7,
      author: 'Angie Calvert',
      rating: 5,
      timeAgo: 'a year ago',
      text: 'David at Whale Creek Co. made my kitchen project less stressful, and more affordable! I came to him with the idea of using old barn wood for my kitchen flooring without knowing any details other than having the wood supply. He made it happen beautifully!',
    },
  ];

  // Handle responsive reviews per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newReviewsPerView = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
      setReviewsPerView(newReviewsPerView);

      // Reset to beginning when changing view mode
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        className={`${styles.star} ${i < rating ? styles.filled : ''}`}
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

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsHeader}>
        <div className={styles.sectionTitle}>What Our Clients Say</div>
        <div className={styles.overallRating}>
          <div className={styles.ratingNumber}>5.0</div>
          <div className={styles.starsContainer}>{renderStars(5)}</div>
          <div className={styles.reviewCount}>Based on 13+ reviews</div>
        </div>
      </div>

      <div className={styles.reviewsCarousel}>
        {/* Left Arrow */}
        <button
          className={`${styles.navArrow} ${styles.navArrowLeft}`}
          onClick={handlePrevious}
          aria-label='Previous reviews'
        >
          <ArrowCircleLeftIcon size={40}/>
        </button>

        {/* Reviews Grid */}
        <div className={styles.reviewsGrid}>
          {getVisibleReviews().map((review) => (
            <div key={review.id} className={styles.reviewCard}>
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
          aria-label='Next reviews'
        >
          <ArrowCircleRightIcon size={40}/>
        </button>
      </div>

      {/* Dots indicator */}
      {getDotPositions().length > 1 && (
        <div className={styles.dotsContainer}>
          {getDotPositions().map((position, index) => (
            <button
              key={position}
              className={`${styles.dot} ${index === getCurrentDotIndex() ? styles.active : ''}`}
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
