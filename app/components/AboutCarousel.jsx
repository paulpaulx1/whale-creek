// components/AboutCarousel.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './AboutCarousel.module.css';

const AboutCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      src: "/images/DavidFinegan.jpg",
      alt: "David Finegan, Master Builder and Founder of Whale Creek Construction"
    },
    {
      src: "/images/Noblesville-Deck.JPG",
      alt: "Custom deck in Noblesville, Indiana"
    },
    {
      src: "/images/Patio_Indianapolis.jpg",
      alt: "Custom Patio in Indianapolis"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.imageContainer}>
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.src}
            alt={slide.alt}
            className={`${styles.image} ${index === currentSlide ? styles.active : ''}`}
            width={600}
            height={500}
            priority={index === 0}
          />
        ))}
      </div>
      
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutCarousel;