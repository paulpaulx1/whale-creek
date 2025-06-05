'use client';

import { useState, useEffect } from 'react';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  // Real reviews from David's Google Business
  const reviews = [
    {
      id: 1,
      author: "Kelly Daisley",
      rating: 5,
      timeAgo: "5 months ago",
      text: "Dave's work is impeccable, from big projects to small. I hired him for a number of jobs... from a small side porch and awning replacement to installing window covers to a special cutout and paint job on my front door... and all were completed professionally and beyond expectations. Snag him early because his calendar is filling up, and it's no wonder!"
    },
    {
      id: 2,
      author: "Angela Riggers",
      rating: 5,
      timeAgo: "2 weeks ago",
      text: "I found Whale Creek through a Google search. They had good ratings. Dave always showed up when he said he would. The workers did a wonderful job and were very clean and courteous. We love our new deck! I would use them time and time again!"
    },
    {
      id: 3,
      author: "Amanda Riley",
      rating: 5,
      timeAgo: "6 months ago",
      text: "Highly recommend! David brought my vision to life. We had a weird alcove in our basement that now is a beautiful built-in banquette. He did several renderings to ensure we got it right."
    },
    {
      id: 4,
      author: "Eleanor Kamm",
      rating: 5,
      timeAgo: "11 months ago",
      text: "David was an absolute pleasure to work with. We had a vision for what we wanted and he worked with us to get a stunning final project. He is a meticulous craftsman and all along the way suggested improvements ensuring that he created the best possible result."
    },
    {
      id: 5,
      author: "George Wright",
      rating: 5,
      timeAgo: "2 months ago",
      text: "Couldn't be happier with this company. The most professional from start to finish. Showed up on time, cleaned up nightly, finished on schedule and the project turned out way better than I could have ever thought."
    },
    {
      id: 6,
      author: "Josh Stark",
      rating: 5,
      timeAgo: "a year ago",
      text: "Whale Creek Co. has been producing high quality wood products for my company for a couple years now. They are equipped with CNC machine router, state of the art woodworking equipment, and a creative staff they can bring about any project to life. Highly Recommended!!"
    },
    {
      id: 7,
      author: "Angie Calvert",
      rating: 5,
      timeAgo: "a year ago",
      text: "David at Whale Creek Co. made my kitchen project less stressful, and more affordable! I came to him with the idea of using old barn wood for my kitchen flooring without knowing any details other than having the wood supply. He made it happen beautifully!"
    }
  ];

  // Auto-cycle through reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleDotClick = (index) => {
    setCurrentReview(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`${styles.star} ${i < rating ? styles.filled : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsHeader}>
        <h3 className={styles.sectionTitle}>What Our Clients Say</h3>
        <div className={styles.overallRating}>
          <div className={styles.ratingNumber}>5.0</div>
          <div className={styles.starsContainer}>
            {renderStars(5)}
          </div>
          <div className={styles.reviewCount}>Based on 13+ reviews</div>
        </div>
      </div>

      <div className={styles.reviewCard}>
        <div className={styles.reviewHeader}>
          <div className={styles.authorAvatar}>
            {reviews[currentReview].author.charAt(0)}
          </div>
          <div className={styles.authorInfo}>
            <div className={styles.authorName}>{reviews[currentReview].author}</div>
            <div className={styles.reviewMeta}>
              <div className={styles.stars}>
                {renderStars(reviews[currentReview].rating)}
              </div>
              <span className={styles.timeAgo}>{reviews[currentReview].timeAgo}</span>
            </div>
          </div>
        </div>
        <div className={styles.reviewText}>
          {reviews[currentReview].text}
        </div>
      </div>

      {/* Dots indicator */}
      <div className={styles.dotsContainer}>
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentReview ? styles.active : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;