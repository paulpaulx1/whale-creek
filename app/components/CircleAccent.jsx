'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CircleAccent.module.css';

const CircleAccent = ({ colors, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCircleClick = (e) => {
    e.currentTarget.style.transform = 'scale(2) translateY(-20px) rotate(720deg)';
    setTimeout(() => {
      e.currentTarget.style.transform = 'scale(1) translateY(0) rotate(0deg)';
    }, 600);
  };

  return (
    <div 
      ref={circleRef}
      className={`${styles.circleContainer} ${className} ${isVisible ? styles.visible : ''}`}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className={styles.circle}
          style={{ 
            backgroundColor: color,
            animationDelay: `${1.6 + index * 0.1}s`
          }}
          onClick={handleCircleClick}
        />
      ))}
    </div>
  );
};

export default CircleAccent;