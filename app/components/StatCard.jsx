'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ number, label, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayNumber, setDisplayNumber] = useState('0');
  const statRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumber();
        }
      },
      { threshold: 0.5 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateNumber = () => {
    const isPercentage = number.includes('%');
    const hasPlus = number.includes('+');
    const hasSlash = number.includes('/');
    
    if (hasSlash) {
      setDisplayNumber(number);
      return;
    }

    const cleanNumber = parseInt(number.replace(/[^\d]/g, ''));
    let current = 0;
    const increment = cleanNumber / 50;
    
    const counter = setInterval(() => {
      current += increment;
      if (current >= cleanNumber) {
        current = cleanNumber;
        clearInterval(counter);
      }
      
      let displayValue = Math.floor(current).toString();
      if (isPercentage) displayValue += '%';
      if (hasPlus) displayValue += '+';
      
      setDisplayNumber(displayValue);
    }, 50);
  };

  return (
    <div ref={statRef} className={styles.statCard}>
      <span className={styles.statNumber}>
        {displayNumber}
      </span>
      <span className={styles.statLabel}>
        {label}
      </span>
    </div>
  );
};

export default StatCard;